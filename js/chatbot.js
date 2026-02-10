/**
 * Lumia Assistant - AI-Powered Chatbot Widget
 * Uses Gemini AI for intelligent conversations
 * Lead capture, meeting scheduling, and client interaction
 */

(function () {
    // Configuration
    const API_ENDPOINT = '/.netlify/functions/chat'; // Netlify Functions
    const EMAILJS_PUBLIC_KEY = 't_jt2N1fPjoNlie9e';
    const EMAILJS_SERVICE_ID = 'service_bzwukue';
    const EMAILJS_TEMPLATE_ID = 'template_0r3ufzq';
    const RECIPIENT_EMAIL = 'hello@lumiadigital.site';

    // Time slots for meeting scheduling
    const TIME_SLOTS = [
        '9:00 AM', '10:00 AM', '11:00 AM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    // Conversation state
    let conversationHistory = [];
    let leadData = {
        name: '',
        email: '',
        company: '',
        service: '',
        meetingDate: '',
        meetingTime: ''
    };
    let isOpen = false;
    let isCollectingLead = false;
    let leadStep = null; // 'name', 'email', 'company', 'meeting_ask', 'meeting_date', 'meeting_time'

    // Initial greeting
    const INITIAL_GREETING = `Hey there! 👋 I'm Lumia, your AI assistant for Lumia Digital.

I can help you with:
• **Explore our services** - design, development, AI, and more
• **Get project estimates** - understand pricing and timelines
• **Schedule a consultation** - book a free 30-min call


What would you like to know?`;

    // Create chatbot HTML
    function createChatbotHTML() {
        const chatbotHTML = `
            <div id="lumia-chatbot" class="lumia-chatbot">
                <div class="lumia-chat-bubble" onclick="window.LumiaChat.toggle()">
                    <svg class="lumia-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <svg class="lumia-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <span class="lumia-badge">1</span>
                </div>
                <div class="lumia-chat-window">
                    <div class="lumia-chat-header">
                        <div class="lumia-header-info">
                            <div class="lumia-avatar">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                            </div>
                            <div class="lumia-header-text">
                                <span class="lumia-name">Lumia Assistant</span>
                                <span class="lumia-status"><span class="lumia-status-dot"></span> AI Powered</span>
                            </div>
                        </div>
                        <button class="lumia-close" onclick="window.LumiaChat.toggle()">×</button>
                    </div>
                    <div class="lumia-chat-messages" id="lumia-messages"></div>
                    <div class="lumia-quick-actions" id="lumia-quick-actions"></div>
                    <div class="lumia-chat-input">
                        <input type="text" id="lumia-input" placeholder="Type your message..." onkeypress="if(event.key === 'Enter') window.LumiaChat.send()">
                        <button onclick="window.LumiaChat.send()" id="lumia-send-btn">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    // Create chatbot CSS
    function createChatbotCSS() {
        const css = `
            .lumia-chatbot {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 9999;
                font-family: 'Inter', -apple-system, sans-serif;
            }

            .lumia-chat-bubble {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #00D4FF 0%, #7B2FFF 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);
                transition: all 0.3s ease;
                position: relative;
            }

            .lumia-chat-bubble:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(0, 212, 255, 0.5);
            }

            .lumia-chat-bubble svg {
                width: 28px;
                height: 28px;
                color: white;
            }

            .lumia-icon-close { display: none; }
            .lumia-chatbot.open .lumia-icon-chat { display: none; }
            .lumia-chatbot.open .lumia-icon-close { display: block; }

            .lumia-badge {
                position: absolute;
                top: -4px;
                right: -4px;
                background: #FF4757;
                color: white;
                font-size: 12px;
                font-weight: 600;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: lumia-pulse 2s infinite;
            }

            @keyframes lumia-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }

            .lumia-chatbot.open .lumia-badge { display: none; }

            .lumia-chat-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 380px;
                height: 520px;
                background: #0d0d12;
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                display: none;
                flex-direction: column;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .lumia-chatbot.open .lumia-chat-window {
                display: flex;
                animation: lumiaSlideUp 0.3s ease;
            }

            @keyframes lumiaSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .lumia-chat-header {
                padding: 16px 20px;
                background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(123, 47, 255, 0.1) 100%);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .lumia-header-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .lumia-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #00D4FF 0%, #7B2FFF 100%);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .lumia-avatar svg {
                width: 24px;
                height: 24px;
                color: white;
            }

            .lumia-header-text {
                display: flex;
                flex-direction: column;
            }

            .lumia-name {
                font-weight: 600;
                color: white;
                font-size: 14px;
            }

            .lumia-status {
                font-size: 12px;
                color: #00D4FF;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .lumia-status-dot {
                width: 8px;
                height: 8px;
                background: #00ff88;
                border-radius: 50%;
                animation: lumia-blink 2s infinite;
            }

            @keyframes lumia-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            .lumia-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.5);
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }

            .lumia-close:hover { color: white; }

            .lumia-chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .lumia-chat-messages::-webkit-scrollbar {
                width: 6px;
            }

            .lumia-chat-messages::-webkit-scrollbar-track {
                background: transparent;
            }

            .lumia-chat-messages::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 3px;
            }

            .lumia-message {
                max-width: 85%;
                padding: 12px 16px;
                border-radius: 16px;
                font-size: 14px;
                line-height: 1.6;
                animation: lumiaFadeIn 0.3s ease;
            }

            @keyframes lumiaFadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .lumia-message.bot {
                background: rgba(255, 255, 255, 0.08);
                color: white;
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }

            .lumia-message.bot strong {
                color: #00D4FF;
            }

            .lumia-message.user {
                background: linear-gradient(135deg, #00D4FF 0%, #7B2FFF 100%);
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }

            .lumia-quick-actions {
                padding: 0 16px 12px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }

            .lumia-quick-btn {
                padding: 8px 16px;
                border-radius: 20px;
                background: rgba(0, 212, 255, 0.1);
                border: 1px solid rgba(0, 212, 255, 0.3);
                color: #00D4FF;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .lumia-quick-btn:hover {
                background: rgba(0, 212, 255, 0.2);
                border-color: #00D4FF;
            }

            .lumia-chat-input {
                padding: 16px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                gap: 12px;
            }

            .lumia-chat-input input {
                flex: 1;
                padding: 12px 16px;
                border-radius: 24px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                background: rgba(255, 255, 255, 0.05);
                color: white;
                font-size: 14px;
                outline: none;
            }

            .lumia-chat-input input:focus {
                border-color: #00D4FF;
            }

            .lumia-chat-input input::placeholder {
                color: rgba(255, 255, 255, 0.4);
            }

            .lumia-chat-input button {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: linear-gradient(135deg, #00D4FF 0%, #7B2FFF 100%);
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s ease;
            }

            .lumia-chat-input button:hover {
                transform: scale(1.05);
            }

            .lumia-chat-input button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .lumia-chat-input button svg {
                width: 20px;
                height: 20px;
                color: white;
            }

            .lumia-typing {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
                align-self: flex-start;
                background: rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                border-bottom-left-radius: 4px;
            }

            .lumia-typing span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #00D4FF;
                animation: lumiaTyping 1.4s infinite;
            }

            .lumia-typing span:nth-child(2) { animation-delay: 0.2s; }
            .lumia-typing span:nth-child(3) { animation-delay: 0.4s; }

            @keyframes lumiaTyping {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                30% { transform: translateY(-8px); opacity: 1; }
            }

            @media (max-width: 480px) {
                .lumia-chat-window {
                    width: calc(100vw - 32px);
                    right: 50%;
                    transform: translateX(50%);
                    bottom: 90px;
                    height: 60vh;
                }
            }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    // Format AI response (convert markdown-like syntax)
    function formatResponse(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^• /gm, '• ')
            .replace(/\n/g, '<br>');
    }

    // Add message to chat
    function addMessage(text, isBot = true) {
        const messagesContainer = document.getElementById('lumia-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `lumia-message ${isBot ? 'bot' : 'user'}`;

        if (isBot) {
            messageDiv.innerHTML = formatResponse(text);
        } else {
            messageDiv.textContent = text;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Store in history
        conversationHistory.push({ text, isBot });
    }

    // Show typing indicator
    function showTyping() {
        const messagesContainer = document.getElementById('lumia-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'lumia-typing';
        typingDiv.id = 'lumia-typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Hide typing indicator
    function hideTyping() {
        const typing = document.getElementById('lumia-typing-indicator');
        if (typing) typing.remove();
    }

    // Show quick action buttons
    function showQuickActions(actions) {
        const container = document.getElementById('lumia-quick-actions');
        container.innerHTML = actions.map(action =>
            `<button class="lumia-quick-btn" onclick="window.LumiaChat.handleQuickAction('${action.replace(/'/g, "\\'")}')">${action}</button>`
        ).join('');
    }

    // Clear quick actions
    function clearQuickActions() {
        document.getElementById('lumia-quick-actions').innerHTML = '';
    }

    // Generate next 5 weekdays
    function getNextWeekdays() {
        const days = [];
        let date = new Date();
        while (days.length < 5) {
            date.setDate(date.getDate() + 1);
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                days.push({
                    date: date.toISOString().split('T')[0],
                    label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                });
            }
        }
        return days;
    }

    // Check for email in text
    function extractEmail(text) {
        const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
        const match = text.match(emailRegex);
        return match ? match[0] : null;
    }

    // Check if user wants to schedule
    function wantsToSchedule(text) {
        const lower = text.toLowerCase();
        return lower.includes('schedule') || lower.includes('book') || lower.includes('meeting') ||
            lower.includes('call') || lower.includes('consultation') || lower.includes('yes');
    }

    // Handle lead capture flow
    function handleLeadCapture(userInput) {
        const lower = userInput.toLowerCase();

        switch (leadStep) {
            case 'name':
                leadData.name = userInput;
                leadStep = 'email';
                addMessage(`Great to meet you, ${userInput}! 🎉\n\nWhat's the best email to reach you?`, true);
                return true;

            case 'email':
                const email = extractEmail(userInput);
                if (email) {
                    leadData.email = email;
                    leadStep = 'company';
                    addMessage(`Perfect! And what company or project is this for? (Or say "personal" if it's for yourself)`, true);
                } else {
                    addMessage(`I didn't catch a valid email. Could you share your email address?`, true);
                }
                return true;

            case 'company':
                leadData.company = userInput;
                leadStep = 'meeting_ask';
                addMessage(`Awesome! Would you like to schedule a free 30-minute consultation with our team? We can discuss your project in detail.`, true);
                showQuickActions(['Yes, schedule a call', 'Not right now']);
                return true;

            case 'meeting_ask':
                if (wantsToSchedule(lower) || lower.includes('yes')) {
                    leadStep = 'meeting_date';
                    addMessage(`Great! Please pick a date that works for you:`, true);
                    const dates = getNextWeekdays();
                    showQuickActions(dates.map(d => d.label));
                } else {
                    leadStep = null;
                    isCollectingLead = false;
                    sendLeadEmail(false);
                    addMessage(`No problem! I've noted your interest and our team will reach out to ${leadData.email} soon.\n\nIs there anything else I can help you with?`, true);
                }
                return true;

            case 'meeting_date':
                leadData.meetingDate = userInput;
                leadStep = 'meeting_time';
                addMessage(`Perfect! What time works best for you?`, true);
                showQuickActions(TIME_SLOTS);
                return true;

            case 'meeting_time':
                leadData.meetingTime = userInput;
                leadStep = null;
                isCollectingLead = false;
                sendLeadEmail(true);
                addMessage(`You're all set! 🚀\n\n📅 **${leadData.meetingDate}** at **${leadData.meetingTime}**\n\nI've sent a confirmation to ${leadData.email}. Our team will send you a calendar invite shortly.\n\nAnything else I can help with?`, true);
                clearQuickActions();
                return true;
        }

        return false;
    }

    // Call AI API
    async function callAI(userMessage) {
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: conversationHistory,
                    leadData: leadData
                })
            });

            if (!response.ok) throw new Error('API error');

            const data = await response.json();
            return data.response || data.fallback;
        } catch (error) {
            console.error('AI API error:', error);
            return "I'm having a moment! You can reach us directly at hello@lumiadigital.site or try again.";
        }
    }

    // Process user input
    async function processInput(userInput) {
        const lower = userInput.toLowerCase();

        // Handle lead capture if in progress
        if (isCollectingLead && handleLeadCapture(userInput)) {
            return;
        }

        // Check for scheduling intent to start lead capture
        if (wantsToSchedule(lower) && !leadData.name) {
            isCollectingLead = true;
            leadStep = 'name';
            addMessage(`I'd love to help you schedule a consultation! First, what's your name?`, true);
            clearQuickActions();
            return;
        }

        // Check for email in message (passive lead capture)
        const email = extractEmail(userInput);
        if (email && !leadData.email) {
            leadData.email = email;
        }

        // Call AI for response
        showTyping();
        document.getElementById('lumia-send-btn').disabled = true;

        try {
            const aiResponse = await callAI(userInput);
            hideTyping();
            addMessage(aiResponse, true);

            // Show contextual quick actions based on response
            if (aiResponse.toLowerCase().includes('schedule') || aiResponse.toLowerCase().includes('consultation')) {
                showQuickActions(['Schedule a call', 'Tell me more']);
            } else if (aiResponse.toLowerCase().includes('service')) {
                showQuickActions(['Web Development', 'AI & Automation', 'Branding']);
            }
        } catch (error) {
            hideTyping();
            addMessage("I'm having trouble connecting. You can email us at hello@lumiadigital.site", true);
        }

        document.getElementById('lumia-send-btn').disabled = false;
    }

    // Generate Calendar Links
    function generateCalendarLinks(dateStr, timeStr) {
        // Parse "Wed, Feb 11" and "3:00 PM"
        const currentYear = new Date().getFullYear();
        const dateParts = dateStr.split(', ')[1].split(' '); // ["Feb", "11"]
        const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
        const month = monthMap[dateParts[0]];
        const day = parseInt(dateParts[1]);

        const timeParts = timeStr.match(/(\d+):(\d+) (AM|PM)/);
        let hours = parseInt(timeParts[1]);
        const minutes = parseInt(timeParts[2]);
        const isPM = timeParts[3] === 'PM';

        if (isPM && hours !== 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;

        const startDate = new Date(currentYear, month, day, hours, minutes);
        const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 min duration

        const formatTime = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');

        const start = formatTime(startDate);
        const end = formatTime(endDate);

        const title = encodeURIComponent("Consultation with Lumia Digital");
        const details = encodeURIComponent("Discussing your project requirements and how Lumia Digital can help.");
        const location = encodeURIComponent("Google Meet (Link to be provided)");

        const google = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
        const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${details}&location=${location}`;

        return { google, outlook };
    }

    // Send lead data via EmailJS
    function sendLeadEmail(withMeeting) {
        if (typeof emailjs !== 'undefined' && leadData.email) {

            // Service IDs
            const ADMIN_SERVICE_ID = 'service_bth9k5j'; // Gmail (for Admin)
            const CLIENT_SERVICE_ID = 'service_bzwukue'; // Brevo (for Client)

            // Generate Calendar Links if meeting exists
            let calendarLinks = { google: '', outlook: '' };
            if (withMeeting && leadData.meetingDate && leadData.meetingTime) {
                calendarLinks = generateCalendarLinks(leadData.meetingDate, leadData.meetingTime);
            }

            // 1. Send to Admin (Standard Template)
            const adminParams = {
                to_email: RECIPIENT_EMAIL,
                lead_name: leadData.name || 'Unknown',
                lead_email: leadData.email,
                name: leadData.name || 'Unknown',
                email: leadData.email,
                reply_to: leadData.email,
                lead_company: leadData.company || 'Not provided',
                lead_service: leadData.service || 'General inquiry',
                meeting_date: leadData.meetingDate || 'Not scheduled',
                meeting_time: leadData.meetingTime || 'Not scheduled',
                has_meeting: withMeeting ? 'Yes' : 'No',
                chat_log: conversationHistory.map(m => `${m.isBot ? 'Lumia' : 'User'}: ${m.text}`).join('\n\n'),
                google_calendar_link: calendarLinks.google,
                outlook_calendar_link: calendarLinks.outlook,
                from_name: 'Lumia Digital',
                timestamp: new Date().toISOString()
            };

            // Chain the requests: Admin (Gmail) -> Client (Brevo)
            console.log('Attempting to send Admin email via Gmail Service...');
            emailjs.send(ADMIN_SERVICE_ID, EMAILJS_TEMPLATE_ID, adminParams, EMAILJS_PUBLIC_KEY)
                .then(() => {
                    console.log('✅ Lead sent to admin successfully (via Gmail)');

                    // 2. Send to User (Client Confirmation)
                    if (withMeeting) {
                        const userParams = { ...adminParams };
                        userParams.to_email = leadData.email;
                        userParams.is_user_copy = true;

                        userParams.chat_log = `
Hi ${leadData.name},

Thanks for scheduling a time with us. We're looking forward to hearing about your project.

📅 **Meeting Confirmed**
Date: ${leadData.meetingDate}
Time: ${leadData.meetingTime}

👇 **Add to your Calendar**
[Google Calendar](${calendarLinks.google}) | [Outlook](${calendarLinks.outlook})

--
Lumia Digital Team
                        `;

                        const CLIENT_CONFIRMATION_TEMPLATE_ID = 'template_client_confirm';

                        console.log('Attempting to send Client email via Brevo Service...');
                        return emailjs.send(CLIENT_SERVICE_ID, CLIENT_CONFIRMATION_TEMPLATE_ID, userParams, EMAILJS_PUBLIC_KEY);
                    }
                })
                .then((result) => {
                    if (result) console.log('✅ Confirmation sent to user successfully (via Brevo)');
                })
                .catch(err => {
                    console.error('❌ EmailJS Error:', err);
                    // Fallback: If Admin failed, try sending client email anyway
                    if (withMeeting && err.text !== 'OK') {
                        const userParams = { ...adminParams };
                        userParams.to_email = leadData.email;
                        userParams.chat_log = `Hi ${leadData.name},\n\nMeeting Confirmed: ${leadData.meetingDate} at ${leadData.meetingTime}`;
                        const CLIENT_CONFIRMATION_TEMPLATE_ID = 'template_client_confirm';
                        const CLIENT_SERVICE_ID = 'service_bzwukue';
                        emailjs.send(CLIENT_SERVICE_ID, CLIENT_CONFIRMATION_TEMPLATE_ID, userParams, EMAILJS_PUBLIC_KEY)
                            .catch(e => console.error('Client email also failed:', e));
                    }
                });
        }
    }

    // Initialize chatbot
    function init() {
        createChatbotCSS();
        createChatbotHTML();
    }

    // Public API
    window.LumiaChat = {
        toggle: function () {
            const chatbot = document.getElementById('lumia-chatbot');
            isOpen = !isOpen;
            chatbot.classList.toggle('open', isOpen);

            if (isOpen && document.getElementById('lumia-messages').children.length === 0) {
                addMessage(INITIAL_GREETING, true);
                showQuickActions(['Our Services', 'Schedule a Call', 'Get a Quote']);
            }

            if (isOpen) {
                setTimeout(() => document.getElementById('lumia-input').focus(), 100);
            }
        },

        send: function () {
            const input = document.getElementById('lumia-input');
            const text = input.value.trim();
            if (!text) return;

            addMessage(text, false);
            input.value = '';
            clearQuickActions();

            processInput(text);
        },

        handleQuickAction: function (action) {
            addMessage(action, false);
            clearQuickActions();
            processInput(action);
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
