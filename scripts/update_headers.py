#!/usr/bin/env python3
"""
Script to update all HTML files with consistent header:
- Add Lottie scripts (with correct relative path)
- Replace static logo with animated flame container
- Add dropdown menus
"""

import os
import re
from pathlib import Path

BASE_DIR = Path("/Users/vibhuthanki/clawd/agency")

# Files to update (relative to BASE_DIR)
FILES = [
    "sitemap.html",
    "blog.html",
    "process.html",
    "about.html",
    "services.html",
    "projects/restaurant/index.html",
    "projects/salon/index.html",
    "projects/armory/index.html",
    "projects/nexus/index.html",
    "projects/gym/index.html",
    "projects/boutique/index.html",
    "projects/aura/index.html",
    "projects/coaching/index.html",
    "about/team.html",
    "about/awards.html",
    "about/culture.html",
    "about/careers.html",
    "about/jobs/senior-frontend-engineer.html",
    "about/jobs/seo-strategist.html",
    "about/jobs/product-designer.html",
    "blog/future-of-webgl.html",
    "blog/headless-commerce.html",
    "blog/design-systems.html",
    "blog/index.html",
    "blog/rise-of-generative-ui.html",
    "blog/sustainable-web-design.html",
    "blog/seo-in-chatgpt-era.html",
    "blog/ai-in-design.html",
    "blog/speed-matters.html",
    "blog/webgpu-next-era.html",
    "blog/end-of-cookies.html",
    "blog/ai-personalization.html",
    "blog/micro-interactions-matter.html",
    "blog/spatial-computing-web.html",
    "blog/seo-trends-2026.html",
    "blog/nocode-vs-procode.html",
    "blog/headless-cms-vs-monolith.html",
    "legal/terms.html",
    "legal/cookies.html",
    "legal/impressum.html",
    "legal/privacy.html",
    "services/design.html",
    "services/mobile-apps.html",
    "services/seo.html",
    "services/ecommerce.html",
    "services/development.html",
    "services/analytics.html",
    "services/branding.html",
    "services/motion.html",
]

def get_relative_path(file_path):
    """Calculate relative path to root from file location."""
    rel = Path(file_path).parent
    depth = len(rel.parts)
    if depth == 0:
        return ""
    return "../" * depth

def get_dropdown_html(rel_path):
    """Generate dropdown menu HTML with correct relative paths."""
    return f'''            <div class="desktop-menu">
                <a href="{rel_path}index.html" class="nav-link">Home</a>
                
                <div class="nav-dropdown">
                    <a href="{rel_path}work.html" class="nav-link">Work <span class="dropdown-arrow">▾</span></a>
                    <div class="dropdown-menu">
                        <a href="{rel_path}projects/armory/index.html">Armory</a>
                        <a href="{rel_path}projects/nexus/index.html">Nexus VR</a>
                        <a href="{rel_path}projects/aura/index.html">Aura Interiors</a>
                        <a href="{rel_path}projects/gym/index.html">Iron Forge</a>
                        <a href="{rel_path}projects/restaurant/index.html">Spice Garden</a>
                        <a href="{rel_path}projects/salon/index.html">Luxe Beauty</a>
                        <a href="{rel_path}projects/boutique/index.html">Vogue Atelier</a>
                        <a href="{rel_path}projects/coaching/index.html">Bright Minds</a>
                    </div>
                </div>
                
                <div class="nav-dropdown">
                    <a href="{rel_path}expertise.html" class="nav-link">Expertise <span class="dropdown-arrow">▾</span></a>
                    <div class="dropdown-menu">
                        <a href="{rel_path}services/design.html">UI/UX Design</a>
                        <a href="{rel_path}services/development.html">Web Development</a>
                        <a href="{rel_path}services/branding.html">Branding</a>
                        <a href="{rel_path}services/seo.html">SEO</a>
                        <a href="{rel_path}services/ecommerce.html">E-Commerce</a>
                        <a href="{rel_path}services/motion.html">Motion Design</a>
                    </div>
                </div>
                
                <div class="nav-dropdown">
                    <a href="{rel_path}agency.html" class="nav-link">Agency <span class="dropdown-arrow">▾</span></a>
                    <div class="dropdown-menu">
                        <a href="{rel_path}about/team.html">Our Team</a>
                        <a href="{rel_path}about/culture.html">Culture</a>
                        <a href="{rel_path}about/careers.html">Careers</a>
                        <a href="{rel_path}about/awards.html">Awards</a>
                        <a href="{rel_path}contact.html">Contact</a>
                    </div>
                </div>
            </div>'''

def get_logo_html(rel_path):
    """Generate logo HTML with animated flame."""
    return f'''            <a href="{rel_path}index.html" class="logo">
                <div class="logo-flame-container" id="logoFlame"></div>
                LUMIA DIGITAL<span class="dot">.</span>
            </a>'''

def get_lottie_scripts(rel_path):
    """Generate Lottie script tags with correct relative path."""
    return f'''    <!-- Lottie Animation Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
    <script src="{rel_path}blue-fire-data.js"></script>

'''

def update_file(file_path):
    """Update a single HTML file with consistent header."""
    full_path = BASE_DIR / file_path
    if not full_path.exists():
        print(f"  ✗ Not found: {file_path}")
        return False
    
    try:
        content = full_path.read_text(encoding='utf-8')
        original_content = content
        rel_path = get_relative_path(file_path)
        
        # 1. Add Lottie scripts if not present
        if 'lottie.min.js' not in content:
            # Find where to insert (after fonts, before stylesheet)
            lottie_scripts = get_lottie_scripts(rel_path)
            # Insert before the main stylesheet link
            content = re.sub(
                r'(\s*<link rel="stylesheet" href="[^"]*style\.css">)',
                lottie_scripts + r'\1',
                content,
                count=1
            )
        
        # 2. Replace static logo with animated logo
        if 'logo-flame-container' not in content:
            logo_html = get_logo_html(rel_path)
            # Match various logo patterns
            patterns = [
                r'<a href="[^"]*index\.html" class="logo">\s*<img[^>]+logo\.svg[^>]*>[^<]*LUMIA DIGITAL\s*<span class="dot">\.</span>\s*</a>',
                r'<a href="[^"]*index\.html" class="logo">\s*<img[^>]+logo\.svg[^>]*>\s*LUMIA DIGITAL\s*<span\s+class="dot">\.</span>\s*</a>',
            ]
            for pattern in patterns:
                content = re.sub(pattern, logo_html, content, flags=re.DOTALL)
        
        # 3. Replace old desktop-menu with dropdown version
        if 'nav-dropdown' not in content:
            dropdown_html = get_dropdown_html(rel_path)
            # Match old simple desktop menu
            old_menu_pattern = r'<div class="desktop-menu">.*?</div>\s*(?=<a href="[^"]*contact\.html" class="cta-button">)'
            content = re.sub(old_menu_pattern, dropdown_html + '\n', content, flags=re.DOTALL)
        
        # Write back if changed
        if content != original_content:
            full_path.write_text(content, encoding='utf-8')
            print(f"  ✓ Updated: {file_path}")
            return True
        else:
            print(f"  - No changes: {file_path}")
            return False
            
    except Exception as e:
        print(f"  ✗ Error processing {file_path}: {e}")
        return False

def main():
    print(f"Updating {len(FILES)} files...\n")
    updated = 0
    for file_path in FILES:
        if update_file(file_path):
            updated += 1
    print(f"\nDone! Updated {updated}/{len(FILES)} files.")

if __name__ == "__main__":
    main()
