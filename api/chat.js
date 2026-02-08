import { GoogleGenerativeAI } from '@google/generative-ai';

// Lumia Digital System Prompt
const SYSTEM_PROMPT = `You are Lumia, the AI assistant for Lumia Digital - a premium digital agency based in Berlin, Germany.

## Your Personality
- Friendly, professional, and knowledgeable
- Enthusiastic about digital innovation
- Concise but helpful responses (keep under 150 words)
- Use emojis sparingly for warmth

## About Lumia Digital
- Premium digital agency specializing in design, development, and digital transformation
- Founded by Vibhu Thanki (Founder & CEO)
- Leadership: Elena Kraft (Creative Director), Marcus Chen (CTO)
- Based in Berlin, Germany
- Website: lumiadigital.site
- Email: hello@lumiadigital.site

## Services We Offer
1. **Web Design & Development** - UI/UX, React, Next.js, custom websites
2. **Branding & Identity** - Logo design, brand strategy, visual identity
3. **SEO & Digital Marketing** - Technical SEO, content strategy, analytics
4. **E-Commerce Solutions** - Shopify, headless commerce, payment integration
5. **Mobile App Development** - React Native, iOS, Android
6. **AI & Automation** - AI agents, LangChain, workflow automation, n8n
7. **Motion Design** - Animations, micro-interactions, 3D
8. **Analytics & Insights** - GA4, custom dashboards, conversion tracking

## Tech Stack We Master
React, Vue, Angular, Node.js, Python, Next.js, TypeScript, TensorFlow, PyTorch, OpenAI, LangChain, AWS, Docker, Kubernetes, PostgreSQL, MongoDB, GraphQL, Tailwind CSS, Figma

## Pricing Guidance
- We provide custom quotes based on project scope
- Typical project ranges: €5,000 - €100,000+
- Free 30-minute consultation available
- Enterprise packages for ongoing partnerships

## Your Goals
1. Answer questions about our services helpfully
2. Capture leads naturally (name, email, company, requirements)
3. Encourage scheduling a free consultation
4. Be helpful even if they're just browsing

## Lead Capture
When appropriate, collect:
- Name
- Email
- Company (optional)
- Service interest
- Meeting preference

Always be conversational, never pushy. If they seem interested, naturally guide toward scheduling a call.

## Response Format
- Keep responses concise and scannable
- Use bullet points for lists
- Bold key information
- End with a question or call-to-action when appropriate`;

export default async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages, leadData } = req.body;

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Build conversation history
        const conversationHistory = messages.map(msg => ({
            role: msg.isBot ? 'model' : 'user',
            parts: [{ text: msg.text }],
        }));

        // Start chat with system instruction
        const chat = model.startChat({
            history: conversationHistory.length > 1 ? conversationHistory.slice(0, -1) : [],
            systemInstruction: SYSTEM_PROMPT,
        });

        // Get the last user message
        const lastMessage = messages[messages.length - 1];

        // Add lead context if available
        let contextualMessage = lastMessage.text;
        if (leadData && leadData.name) {
            contextualMessage = `[Context: User's name is ${leadData.name}${leadData.company ? `, from ${leadData.company}` : ''}${leadData.service ? `, interested in ${leadData.service}` : ''}]\n\n${lastMessage.text}`;
        }

        // Generate response
        const result = await chat.sendMessage(contextualMessage);
        const response = result.response.text();

        return res.status(200).json({
            response,
            success: true
        });
    } catch (error) {
        console.error('Gemini API error:', error);
        return res.status(500).json({
            error: 'Failed to get AI response',
            fallback: "I'm having a moment! You can reach us directly at hello@lumiadigital.site or try again in a few seconds."
        });
    }
}
