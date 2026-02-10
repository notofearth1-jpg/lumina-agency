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

function fixAltTags(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Use regex to find img tags without alt
    // Capture the src to generate alt
    content = content.replace(/<img\s+(?![^>]*\balt=)([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi, (match, before, src, after) => {
        // Generate alt from filename
        const filename = src.split('/').pop().split('.')[0];
        // Convert hyphens/underscores to spaces and capitalize
        const altText = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        console.log(`Fixing alt in ${path.relative(ROOT_DIR, filePath)}: ${src} -> "${altText}"`);
        modified = true;

        // Return reconstructed tag with alt
        return `<img ${before}src="${src}" alt="${altText}"${after}>`;
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

function run() {
    console.log('Starting Alt Tag Fixer...');
    const htmlFiles = getHtmlFiles(ROOT_DIR);
    console.log(`Scanning ${htmlFiles.length} HTML files...`);

    htmlFiles.forEach(file => {
        fixAltTags(file);
    });
    console.log('Alt Tag Fixes Completed!');
}

run();
