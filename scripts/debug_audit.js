const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT_DIR = path.join(__dirname, '..');
const IGNORE_DIRS = ['node_modules', '.git', '.netlify', 'scripts'];
const IGNORE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.css', '.js', '.json', '.xml', '.txt', '.ico'];
const IGNORE_FILES_IN_PATH = ['template', '_template'];

// Store results
const brokenLinks = [];
const brokenImages = [];
const brokenResources = []; // CSS/JS
const h1Stats = [];
const metaDescriptions = {}; // url -> description

// Helper: Traverse directories
function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                results = results.concat(getHtmlFiles(filePath));
            }
        } else {
            if (file.endsWith('.html') && !file.includes('template')) {
                results.push(filePath);
            }
        }
    });
    return results;
}

// Helper: Check if path exists
function checkPath(sourceFile, targetRef) {
    if (targetRef.startsWith('http') || targetRef.startsWith('mailto:') || targetRef.startsWith('tel:') || targetRef.startsWith('#')) {
        return true; // Ignore external/anchor/mail links
    }

    let targetPath;
    if (targetRef.startsWith('/')) {
        targetPath = path.join(ROOT_DIR, targetRef);
    } else {
        targetPath = path.resolve(path.dirname(sourceFile), targetRef);
    }

    // Remove query params or anchors
    targetPath = targetPath.split('?')[0].split('#')[0];

    return fs.existsSync(targetPath);
}

// Main Audit Function
async function audit() {
    console.log('Scanning HTML files...');
    const files = getHtmlFiles(ROOT_DIR);

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const dom = new JSDOM(content);
        const doc = dom.window.document;
        const relativePath = path.relative(ROOT_DIR, file);

        // 1. Check Links
        const links = doc.querySelectorAll('a[href]');
        links.forEach(a => {
            const href = a.getAttribute('href');
            if (href && !checkPath(file, href)) {
                brokenLinks.push({ file: relativePath, href });
            }
        });

        // 2. Check Images
        const images = doc.querySelectorAll('img[src]');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !checkPath(file, src)) {
                brokenImages.push({ file: relativePath, src });
            }
        });

        // 3. Check Resources (CSS/JS)
        const scripts = doc.querySelectorAll('script[src]');
        scripts.forEach(s => {
            const src = s.getAttribute('src');
            if (src && !checkPath(file, src)) {
                brokenResources.push({ file: relativePath, src });
            }
        });
        const styles = doc.querySelectorAll('link[rel="stylesheet"]');
        styles.forEach(l => {
            const href = l.getAttribute('href');
            if (href && !checkPath(file, href)) {
                brokenResources.push({ file: relativePath, href });
            }
        });

        // 4. Check H1
        const h1s = doc.querySelectorAll('h1');
        h1Stats.push({ file: relativePath, count: h1s.length });

        // 5. Check Meta Description
        const desc = doc.querySelector('meta[name="description"]');
        if (desc) {
            const content = desc.getAttribute('content');
            if (!metaDescriptions[content]) {
                metaDescriptions[content] = [];
            }
            metaDescriptions[content].push(relativePath);
        }
    }

    // Report Results
    console.log('\n--- HEADERS (H1) ---');
    h1Stats.filter(s => s.count !== 1).forEach(s => {
        console.log(`${s.file}: Found ${s.count} H1 tags.`);
    });

    console.log('\n--- BROKEN LINKS ---');
    brokenLinks.forEach(item => console.log(`${item.file} -> ${item.href}`));

    console.log('\n--- BROKEN IMAGES ---');
    brokenImages.forEach(item => console.log(`${item.file} -> ${item.src}`));

    console.log('\n--- BROKEN RESOURCES ---');
    brokenResources.forEach(item => console.log(`${item.file} -> ${item.src || item.href}`));

    console.log('\n--- DUPLICATE DESCRIPTIONS ---');
    Object.keys(metaDescriptions).forEach(desc => {
        if (metaDescriptions[desc].length > 1) {
            console.log(`"${desc.substring(0, 50)}..." duplicated in ${metaDescriptions[desc].length} files:`);
            metaDescriptions[desc].forEach(f => console.log(`  - ${f}`));
        }
    });
}

audit();
