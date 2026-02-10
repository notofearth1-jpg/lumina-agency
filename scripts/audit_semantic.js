const fs = require('fs');
const path = require('path');

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

function auditFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(ROOT_DIR, filePath);
    let issues = [];

    // Check for missing alt tags
    // Simple regex to find img tags without alt attribute
    const imgMatches = content.matchAll(/<img\s+(?![^>]*\balt=)[^>]*>/gi);
    for (const match of imgMatches) {
        issues.push(`[IMG] Missing alt attribute: ${match[0].substring(0, 50)}...`);
    }

    // Check for empty alt tags (warning)
    const emptyAltMatches = content.matchAll(/<img[^>]+alt=["']\s*["'][^>]*>/gi);
    // for (const match of emptyAltMatches) {
    //     issues.push(`[IMG] Empty alt attribute (check if decorative): ${match[0].substring(0, 50)}...`);
    // }

    // Check for H1 tag
    if (!content.includes('<h1')) {
        issues.push(`[H1] Missing <h1... tag`);
    }

    // Check for multiple H1 tags
    const h1Count = (content.match(/<h1/gi) || []).length;
    if (h1Count > 1) {
        issues.push(`[H1] Multiple H1 tags found (${h1Count})`);
    }

    // Check for document title
    if (!content.includes('<title>')) {
        issues.push(`[META] Missing <title> tag`);
    }

    // Check for meta description
    if (!content.includes('name="description"')) {
        issues.push(`[META] Missing meta description`);
    }

    if (issues.length > 0) {
        console.log(`\n📄 ${relativePath}:`);
        issues.forEach(issue => console.log(`  ⚠ ${issue}`));
    }
}

function run() {
    console.log('Starting Semantic SEO Audit...');
    const htmlFiles = getHtmlFiles(ROOT_DIR);
    console.log(`Scanning ${htmlFiles.length} HTML files...\n`);

    htmlFiles.forEach(file => {
        auditFile(file);
    });
    console.log('\nAudit Completed!');
}

run();
