# EmailJS Setup Guide for Lumia Assistant

## Step 1: Create Email Service

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click **Email Services** → **Add New Service**
3. Choose **Gmail** (or your preferred provider)
4. Follow OAuth authentication
5. **Copy your Service ID** (e.g., `service_abc123`)

---

## Step 2: Create Email Template

1. Go to **Email Templates** → **Create New Template**
2. **Copy-paste this template:**

### Template Settings:
- **Template Name:** `Lumia Lead Notification`
- **To Email:** `hello@lumiadigital.site`
- **From Name:** `Lumia Assistant`
- **Subject:** `🔥 New Lead: {{lead_name}} - {{lead_service}}`

### Template Content (copy this):

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d12; color: #ffffff; padding: 30px; border-radius: 12px;">
  
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #00D4FF; margin: 0;">New Lead from Lumia Assistant</h1>
    <p style="color: #888; font-size: 14px;">Captured on {{timestamp}}</p>
  </div>

  <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #00D4FF; font-size: 16px; margin-top: 0;">👤 Contact Details</h2>
    <table style="width: 100%; color: #fff;">
      <tr><td style="padding: 8px 0; color: #888;">Name:</td><td style="padding: 8px 0;"><strong>{{lead_name}}</strong></td></tr>
      <tr><td style="padding: 8px 0; color: #888;">Email:</td><td style="padding: 8px 0;"><a href="mailto:{{lead_email}}" style="color: #00D4FF;">{{lead_email}}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #888;">Company:</td><td style="padding: 8px 0;">{{lead_company}}</td></tr>
      <tr><td style="padding: 8px 0; color: #888;">Service Interest:</td><td style="padding: 8px 0;"><strong>{{lead_service}}</strong></td></tr>
    </table>
  </div>

  {{#if has_meeting}}
  <div style="background: linear-gradient(135deg, rgba(0,212,255,0.1), rgba(123,47,255,0.1)); padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid rgba(0,212,255,0.3);">
    <h2 style="color: #00D4FF; font-size: 16px; margin-top: 0;">📅 Meeting Scheduled</h2>
    <table style="width: 100%; color: #fff;">
      <tr><td style="padding: 8px 0; color: #888;">Date:</td><td style="padding: 8px 0;"><strong>{{meeting_date}}</strong></td></tr>
      <tr><td style="padding: 8px 0; color: #888;">Time:</td><td style="padding: 8px 0;"><strong>{{meeting_time}}</strong></td></tr>
    </table>
    <p style="color: #00ff88; font-size: 14px; margin-bottom: 0;">⚡ Please send a calendar invite to the client!</p>
  </div>
  {{/if}}

  <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px;">
    <h2 style="color: #00D4FF; font-size: 16px; margin-top: 0;">💬 Chat Log</h2>
    <pre style="color: #ccc; font-size: 12px; white-space: pre-wrap; margin: 0;">{{chat_log}}</pre>
  </div>

  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
    <p style="color: #666; font-size: 12px; margin: 0;">Lumia Digital • hello@lumiadigital.site</p>
  </div>

</div>
```

3. Click **Save**
4. **Copy your Template ID** (e.g., `template_xyz789`)

---

## Step 3: Update Chatbot Configuration

Update `/js/chatbot.js` lines 9-10 with your IDs:

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';  // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Replace with your Template ID
```

---

## Template Variables Reference

The chatbot sends these variables to your email template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{lead_name}}` | Client's name | John Smith |
| `{{lead_email}}` | Client's email | john@company.com |
| `{{lead_company}}` | Company name | Acme Inc |
| `{{lead_service}}` | Service interest | Web Design & Development |
| `{{meeting_date}}` | Scheduled date | Monday, February 10 |
| `{{meeting_time}}` | Scheduled time | 2:00 PM |
| `{{has_meeting}}` | Meeting booked? | Yes/No |
| `{{chat_log}}` | Full conversation | Bot: Hi... User: ... |
| `{{timestamp}}` | Submission time | 2026-02-08T21:00:00Z |

---

## Testing

1. Open your website
2. Click the chat bubble
3. Complete a test lead capture
4. Check hello@lumiadigital.site for the notification

---

## Need Help?

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Template Syntax Guide](https://www.emailjs.com/docs/sdk/send/)
