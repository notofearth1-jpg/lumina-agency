const fs = require('fs');
const path = require('path');

// Output Directory: correct path relative to script location in 'agency/'
const outputDir = path.join(__dirname, 'social_posts');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read Logo and Convert to Base64
const logoPath = path.join(__dirname, 'favicon.png');
let logoSrc = '';
try {
    const logoData = fs.readFileSync(logoPath);
    logoSrc = 'data:image/png;base64,' + logoData.toString('base64');
} catch (err) {
    console.error("Error reading favicon.png:", err);
    logoSrc = '../favicon.png'; // Fallback
}


// BOLD DESIGN SYSTEM CSS
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
    
    body {
        margin: 0; padding: 0;
        background-color: #000;
        display: flex; justify-content: center; align-items: center;
        height: 100vh; overflow: hidden;
    }

    .artboard {
        width: 1080px; height: 1080px;
        background: #030305;
        position: relative;
        overflow: hidden;
        display: flex; flex-direction: column;
        justify-content: center; align-items: center;
        border: 1px solid #222;
    }

    /* --- Backgrounds --- */
    .bg-grid {
        position: absolute; inset: 0;
        background-image: 
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 80px 80px;
        opacity: 0.3; z-index: 1;
    }

    .bg-spotlight {
        position: absolute;
        width: 1400px; height: 1400px;
        background: radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 60%);
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        filter: blur(80px); z-index: 0;
    }

    .bg-vignette {
        position: absolute; inset: 0;
        background: radial-gradient(circle, transparent 40%, #000 120%);
        z-index: 2; pointer-events: none;
    }

    /* --- Elements --- */
    .content-layer {
        position: relative; z-index: 10;
        width: 85%; height: 85%;
        display: flex; flex-direction: column;
        justify-content: center; align-items: center;
    }

    /* Centered Top Tag */
    .post-tag {
        position: absolute;
        top: 80px;
        left: 0; right: 0; margin: 0 auto;
        width: fit-content;
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        font-size: 1.1rem;
        letter-spacing: 4px;
        text-transform: uppercase;
        color: #00D4FF;
        border: 1px solid rgba(0, 212, 255, 0.3);
        padding: 12px 32px;
        border-radius: 100px;
        background: rgba(0,0,0,0.4);
        backdrop-filter: blur(10px);
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.15);
        z-index: 20;
    }

    /* Centered Bottom Logo */
    .post-logo {
        position: absolute;
        bottom: 80px;
        left: 0; right: 0; margin: 0 auto;
        display: flex; justify-content: center; align-items: center;
        gap: 16px;
        z-index: 20;
    }

    .post-logo img {
        width: 48px; height: 48px;
        object-fit: contain;
        /* Ensure logo pops against dark bg */
        filter: drop-shadow(0 0 10px rgba(79, 70, 229, 0.5)); 
    }

    .post-logo span {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        font-size: 1.5rem;
        color: white;
        letter-spacing: 5px;
    }

    /* --- Typographic Styles --- */
    
    /* 1. ULTRA BOLD STATEMENT */
    .statement-wrap {
        text-align: center;
    }
    .statement-wrap h1 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 8rem; /* Massive */
        line-height: 0.85;
        font-weight: 700;
        text-transform: uppercase;
        color: white;
        margin: 0;
        letter-spacing: -2px;
    }
    .highlight {
        color: transparent;
        -webkit-text-stroke: 3px #00D4FF;
        position: relative;
        display: inline-block;
    }
    .highlight.filled {
        color: #00D4FF;
        -webkit-text-stroke: 0;
        text-shadow: 0 0 50px rgba(0, 212, 255, 0.4);
    }

    /* 2. QUOTE CARD */
    .quote-wrap {
        border-left: 10px solid #00D4FF;
        padding-left: 60px;
        width: 80%;
    }
    .quote-text {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 4.5rem;
        line-height: 1.1;
        font-weight: 600;
        color: white;
    }
    .quote-author {
        margin-top: 40px;
        font-family: 'Inter', sans-serif;
        font-size: 1.5rem;
        color: #888;
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    /* 3. BOLD LIST */
    .list-wrap {
        display: flex; gap: 40px;
        flex-direction: column;
        width: 100%;
    }
    .list-row {
        display: flex; align-items: center; justify-content: space-between;
        border-bottom: 2px solid rgba(255,255,255,0.1);
        padding-bottom: 20px;
    }
    .list-row h2 {
        font-family: 'Space Grotesk';
        font-size: 4rem;
        color: white;
        margin: 0;
    }
    .list-row .num {
        font-family: 'Space Grotesk';
        font-size: 2rem;
        color: #00D4FF;
        font-weight: 700;
        border: 2px solid #00D4FF;
        width: 60px; height: 60px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 50%;
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
    }
`;

const posts = [
    // Week 1: The Launch & Brand
    { type: 'statement', tag: 'Launch', text: 'WE DIDN\'T JUST BUILD AN AGENCY. WE BUILT AN <span class="highlight filled">ENGINE.</span>' },
    { type: 'quote', tag: 'Reality', text: 'Your website is asleep 80% of the time. Wake it up.' },
    { type: 'statement', tag: 'Vision', text: 'DESIGN THAT <span class="highlight filled">STOPS THE SCROLL.</span>' },
    { type: 'list', tag: 'Why Us', items: ['SPEED', 'AUTOMATION', 'AESTHETICS'] },

    // Week 2: AI & Automation
    { type: 'statement', tag: 'AI Power', text: 'MEET YOUR NEW <span class="highlight filled">SALES REP.</span>' },
    { type: 'quote', tag: 'Efficiency', text: 'If you do it twice, automate it.' },
    { type: 'list', tag: 'Capabilities', items: ['24/7 CAPTURE', 'INSTANT SYNC', 'AUTO SCHEDULING'] },
    { type: 'statement', tag: 'Code', text: 'GREAT CODE IS <span class="highlight filled">INVISIBLE.</span>' },

    // Week 3: Design Philosophy
    { type: 'statement', tag: 'Mobile', text: '50% OF TRAFFIC IS MOBILE. <span class="highlight filled">ARE YOU READY?</span>' },
    { type: 'quote', tag: 'Design', text: 'Simplicity is the ultimate sophistication.' },
    { type: 'statement', tag: 'Dark Mode', text: 'COME TO THE <span class="highlight filled">DARK SIDE.</span>' },
    { type: 'list', tag: 'Style', items: ['NEON GLOWS', 'GLASSMORPHISM', 'GRID LAYOUTS'] },

    // Week 4: Conversion & Strategy
    { type: 'statement', tag: 'Strategy', text: 'FREE 30-MIN <span class="highlight filled">STRATEGY CALL.</span>' },
    { type: 'quote', tag: 'Growth', text: 'Results matter more than pixels.' },
    { type: 'statement', tag: 'Action', text: 'THE NEXT LEVEL STARTS <span class="highlight filled">NOW.</span>' },
    { type: 'list', tag: 'Services', items: ['WEB DEV', 'AI SYSTEMS', 'BRANDING'] },

    // Week 5: Expansion (New Content)
    { type: 'statement', tag: 'Mindset', text: 'BUILD. SHIP. <span class="highlight filled">REPEAT.</span>' },
    { type: 'quote', tag: 'Speed', text: 'The future belongs to the fast.' },
    { type: 'list', tag: 'Process', items: ['DISCOVER', 'ARCHITECT', 'DEPLOY'] },
    { type: 'statement', tag: 'SEO', text: 'BE FOUND OR BE <span class="highlight filled">FORGOTTEN.</span>' },

    // Week 6: Deep Dives
    { type: 'quote', tag: 'E-Comm', text: 'Turn visitors into raving fans.' },
    { type: 'statement', tag: 'WebGL', text: 'IMMERSIVE <span class="highlight filled">EXPERIENCES.</span>' },
    { type: 'list', tag: 'Tech Stack', items: ['REACT', 'THREE.JS', 'SUPABASE'] },
    { type: 'statement', tag: 'Audit', text: 'IS YOUR SITE <span class="highlight filled">LEAKING REVENUE?</span>' },

    // Week 7: Agency Culture
    { type: 'quote', tag: 'Flow', text: 'Deep work produces rare value.' },
    { type: 'statement', tag: 'No-Code', text: 'CODE IS A <span class="highlight filled">LIABILITY.</span>' }, /* Contrarian take */
    { type: 'list', tag: 'Values', items: ['TRANSPARENCY', 'VELOCITY', 'MASTERY'] },
    { type: 'statement', tag: 'Partner', text: 'WE DON\'T SIGN CLIENTS. WE SIGN <span class="highlight filled">PARTNERS.</span>' },
];

posts.forEach((post, i) => {
    let content = '';

    if (post.type === 'statement') {
        content = `<div class="statement-wrap"><h1>${post.text}</h1></div>`;
    } else if (post.type === 'quote') {
        content = `
            <div class="quote-wrap">
                <div class="quote-text">"${post.text}"</div>
                <div class="quote-author">Lumia Digital</div>
            </div>`;
    } else if (post.type === 'list') {
        const rows = post.items.map((item, idx) => `
            <div class="list-row">
                <h2>${item}</h2>
                <div class="num">0${idx + 1}</div>
            </div>
        `).join('');
        content = `<div class="list-wrap">${rows}</div>`;
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Post ${i + 1}</title>
    <style>${styles}</style>
</head>
<body>
    <div class="artboard">
        <div class="bg-grid"></div>
        <div class="bg-spotlight"></div>
        <div class="bg-vignette"></div>
        
        <div class="post-tag">${post.tag}</div>
        
        <div class="content-layer">
            ${content}
        </div>

        <div class="post-logo">
            <img src="${logoSrc}" alt="Logo">
            <span>LUMIA DIGITAL</span>
        </div>
    </div>
</body>
</html>`;

    // Write file
    const fileName = `post_${(i + 1).toString().padStart(2, '0')}.html`;
    fs.writeFileSync(path.join(outputDir, fileName), html);
    console.log(`Generated ${fileName}`);
});
