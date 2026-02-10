const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://lumiadigital.site';
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
            // Check if it's an HTML file
            if (file.endsWith('.html')) {
                // Special case: valid Google verification file should be INCLUDED
                const isGoogleVerification = file.match(/^google[a-f0-9]+\.html$/);

                // If it's a Google verification file, include it regardless of exclude list
                if (isGoogleVerification) {
                    fileList.push(filePath);
                }
                // Otherwise check exclude list
                else if (!EXCLUDE_FILES.some(ex => file.includes(ex))) {
                    fileList.push(filePath);
                }
            }
        }
    });

    return fileList;
}

function generateSitemap() {
    console.log('Scanning for HTML files...');
    const htmlFiles = getHtmlFiles(ROOT_DIR);
    console.log(`Found ${htmlFiles.length} HTML files.`);

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${htmlFiles.map(file => {
        let relativePath = path.relative(ROOT_DIR, file);
        // Normalize path separators for Windows compatibility if needed, though we are on Mac
        relativePath = relativePath.split(path.sep).join('/');

        let urlPath = relativePath;
        if (urlPath === 'index.html') {
            urlPath = '';
        } else if (urlPath.endsWith('index.html')) {
            urlPath = urlPath.replace('/index.html', '/');
        }

        const fullUrl = `${SITE_URL}/${urlPath}`;

        // Determine priority and changefreq
        let priority = '0.5';
        let changefreq = 'monthly';

        if (urlPath === '') {
            priority = '1.0';
            changefreq = 'weekly';
        } else if (urlPath.startsWith('services/') || urlPath.startsWith('work.html')) {
            priority = '0.8';
            changefreq = 'monthly';
        } else if (urlPath.startsWith('blog/')) {
            priority = '0.7';
            changefreq = 'weekly'; // Blogs update more often
        } else if (urlPath.startsWith('about/')) {
            priority = '0.6';
            changefreq = 'yearly';
        }

        const lastMod = new Date().toISOString().split('T')[0];

        return `   <url>
      <loc>${fullUrl}</loc>
      <lastmod>${lastMod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
   </url>`;
    }).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapContent);
    console.log('sitemap.xml generated successfully!');

    // Also update robots.txt to point to sitemap
    const robotsContent = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;
    fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsContent);
    console.log('robots.txt updated successfully!');
}

generateSitemap();
