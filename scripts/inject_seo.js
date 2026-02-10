const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://lumiadigital.site';
const DEFAULT_IMAGE = 'https://lumiadigital.site/assets/lumia-og-image.jpg'; // Placeholder, user needs to create this
const SITE_NAME = 'Lumia Digital';
const TWITTER_HANDLE = '@LumiaDigital';

const ROOT_DIR = path.resolve(__dirname, '..');
const EXCLUDE_DIRS = ['node_modules', '.git', '.netlify', '.vercel', 'api', 'assets', 'icons', 'styles', 'scripts', 'includes'];
const EXCLUDE_FILES = ['google', 'yandex', 'bing', '404.html'];

function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!EXCLUDE_DIRS.includes(file)) {
                getHtmlFiles(filePath, fileList);
            }
        } else {
            if (file.endsWith('.html') && !EXCLUDE_FILES.some(ex => file.includes(ex))) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function extractMeta(content) {
    const titleMatch = content.match(/<title>([^<]*)<\/title>/);
    const descMatch = content.match(/<meta name="description"\s+content="([^"]*)"/i) || content.match(/<meta content="([^"]*)"\s+name="description"/i);

    return {
        title: titleMatch ? titleMatch[1] : SITE_NAME,
        description: descMatch ? descMatch[1] : 'Premium digital agency specializing in design, development, and digital transformation.'
    };
}

function injectSeoTags(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const { title, description } = extractMeta(content);

    // Calculate canonical URL
    let relativePath = path.relative(ROOT_DIR, filePath).split(path.sep).join('/');
    if (relativePath.endsWith('index.html')) {
        relativePath = relativePath.replace('/index.html', '/');
        if (relativePath === 'index.html') relativePath = '';
    }
    const canonicalUrl = `${SITE_URL}/${relativePath}`.replace(/\/\/$/, '/');

    // Standard Meta Description (if missing)
    let standardMeta = '';
    if (!content.includes('name="description"')) {
        standardMeta = `    <meta name="description" content="${description}">\n`;
    }

    // SEO Tags to inject
    const seoTags = `
    ${standardMeta}
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${DEFAULT_IMAGE}">
    <meta property="og:site_name" content="${SITE_NAME}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${canonicalUrl}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${DEFAULT_IMAGE}">

    <!-- Canonical -->
    <link rel="canonical" href="${canonicalUrl}">
    
    <!-- Favicon (Ensure consistency) -->
    <link rel="icon" type="image/png" href="/favicon.png">`;

    // Inject before </head>
    // First, remove existing OG/Twitter tags to avoid duplicates if re-running
    content = content.replace(/<meta property="og:.*?>/g, '');
    content = content.replace(/<meta property="twitter:.*?>/g, '');
    content = content.replace(/<link rel="canonical".*?>/g, '');

    // Check if we already have these specific tags to avoid double insertion if regex missed
    if (!content.includes('property="og:title"')) {
        if (content.includes('</head>')) {
            content = content.replace('</head>', `${seoTags}\n</head>`);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Injected SEO tags into: ${relativePath}`);
        } else {
            console.warn(`Skipping ${relativePath}: No </head> tag found.`);
        }
    } else {
        console.log(`Skipping ${relativePath}: SEO tags already present.`);
    }
}

function run() {
    console.log('Starting SEO Injection...');
    const htmlFiles = getHtmlFiles(ROOT_DIR);
    console.log(`Found ${htmlFiles.length} HTML files.`);

    htmlFiles.forEach(file => {
        injectSeoTags(file);
    });
    console.log('SEO Injection Completed!');
}

run();
