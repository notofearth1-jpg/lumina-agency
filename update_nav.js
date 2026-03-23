const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        if (file === 'node_modules' || file.startsWith('.')) continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Pattern 1: root level href="work/webapps.html"
            const pattern1 = /<!-- Web Applications -->\s*<a href="work\/webapps\.html">Web Applications<\/a>/g;
            if (pattern1.test(content)) {
                content = content.replace(pattern1, `<!-- Web Applications -->
                        <div class="nav-dropdown nested-dropdown">
                            <a href="work/webapps.html">Web Applications <span class="dropdown-arrow">›</span></a>
                            <div class="dropdown-menu sub-menu">
                                <a href="projects/codeviki/index.html">CodeWiki Studio</a>
                            </div>
                        </div>`);
                modified = true;
            }

            // Pattern 2: shallow level href="webapps.html"
            const pattern2 = /<!-- Web Applications -->\s*<a href="webapps\.html">Web Applications<\/a>/g;
            if (pattern2.test(content)) {
                content = content.replace(pattern2, `<!-- Web Applications -->
                        <div class="nav-dropdown nested-dropdown">
                            <a href="webapps.html">Web Applications <span class="dropdown-arrow">›</span></a>
                            <div class="dropdown-menu sub-menu">
                                <a href="../projects/codeviki/index.html">CodeWiki Studio</a>
                            </div>
                        </div>`);
                modified = true;
            }

            // Pattern 3: deep level href="../../work/webapps.html"
            const pattern3 = /<!-- Web Applications -->\s*<a href="\.\.\/\.\.\/work\/webapps\.html">Web Applications<\/a>/g;
            if (pattern3.test(content)) {
                content = content.replace(pattern3, `<!-- Web Applications -->
                        <div class="nav-dropdown nested-dropdown">
                            <a href="../../work/webapps.html">Web Applications <span class="dropdown-arrow">›</span></a>
                            <div class="dropdown-menu sub-menu">
                                <a href="../../projects/codeviki/index.html">CodeWiki Studio</a>
                            </div>
                        </div>`);
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated nav in: ${fullPath}`);
            }
        }
    }
}

processDir(__dirname);
console.log('Finished updating navigation.');
