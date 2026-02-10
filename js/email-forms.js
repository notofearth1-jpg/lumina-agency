(function () {
    // EmailJS Credentials
    const PUBLIC_KEY = 't_jt2N1fPjoNlie9e';
    const SERVICE_ID = 'service_bth9k5j'; // Updated to Admin (Gmail) Service
    const TEMPLATE_ID = 'template_0r3ufzq';

    // Initialize EmailJS
    emailjs.init(PUBLIC_KEY);

    // Helper: Show Feedback
    function showFeedback(form, type, message) {
        // Remove existing feedback
        const existing = form.querySelector('.form-feedback');
        if (existing) existing.remove();

        const feedback = document.createElement('div');
        feedback.className = `form-feedback ${type}`;
        feedback.style.marginTop = '1rem';
        feedback.style.padding = '10px';
        feedback.style.borderRadius = '4px';
        feedback.style.fontSize = '0.9rem';

        if (type === 'success') {
            feedback.style.background = 'rgba(76, 175, 80, 0.1)';
            feedback.style.color = '#4caf50';
            feedback.style.border = '1px solid #4caf50';
        } else {
            feedback.style.background = 'rgba(244, 67, 54, 0.1)';
            feedback.style.color = '#f44336';
            feedback.style.border = '1px solid #f44336';
        }

        feedback.textContent = message;
        form.appendChild(feedback);

        // Auto remove after 5s
        setTimeout(() => feedback.remove(), 5000);
    }

    // Helper: Handle Form Submit
    function handleFormSubmit(event, formType) {
        event.preventDefault();
        const form = event.target;
        const btn = form.querySelector('button[type="submit"]');
        const originalBtnText = btn.textContent;

        // Set Loading State
        btn.textContent = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        // Collect Data based on Form Type
        let templateParams = {
            to_email: 'hello@lumiadigital.site',
            source: 'Website Form'
        };

        if (formType === 'contact') {
            const name = form.querySelector('input[name="name"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const message = form.querySelector('textarea[name="message"]').value;

            // Map to existing chatbot template vars
            templateParams.lead_name = name;
            templateParams.lead_email = email;
            templateParams.lead_company = 'Website Contact Form';
            templateParams.lead_service = 'General Inquiry';
            templateParams.chat_log = `Subject: New Contact Message\n\nMessage:\n${message}`;
            templateParams.has_meeting = 'No';
            templateParams.meeting_date = 'N/A';
            templateParams.meeting_time = 'N/A';
            templateParams.from_name = 'Lumia Digital'; // Added for display name customization

        } else if (formType === 'job') {
            const name = form.querySelector('input[name="name"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const portfolio = form.querySelector('input[name="portfolio"]').value;
            const why = form.querySelector('textarea[name="why"]').value;
            const role = document.title.split('|')[0].trim();

            templateParams.lead_name = name;
            templateParams.lead_email = email;
            templateParams.lead_company = 'Job Application';
            templateParams.lead_service = `Role: ${role}`;
            templateParams.chat_log = `Portfolio URL: ${portfolio}\n\nWhy them:\n${why}`;
            // These fields are required by the template to avoid blank spots or errors
            templateParams.has_meeting = 'No';
            templateParams.meeting_date = 'N/A';
            templateParams.meeting_time = 'N/A';
        }

        // Send Email
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(() => {
                showFeedback(form, 'success', 'Message sent successfully! We will get back to you soon.');
                form.reset();
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                showFeedback(form, 'error', 'Failed to send message. Please try again later.');
            })
            .finally(() => {
                // Reset Button
                btn.textContent = originalBtnText;
                btn.disabled = false;
                btn.style.opacity = '1';
            });
    }

    // Attach Listeners
    document.addEventListener('DOMContentLoaded', () => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact'));
        }

        const jobForm = document.getElementById('job-application-form');
        if (jobForm) {
            jobForm.addEventListener('submit', (e) => handleFormSubmit(e, 'job'));
        }
    });

})();
