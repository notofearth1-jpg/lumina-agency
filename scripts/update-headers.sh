#!/bin/bash

# This script updates all HTML files to replace the static logo with animated Lottie logo
# and adds the Lottie library scripts if not present

# List of files to update
FILES=(
    "/Users/vibhuthanki/clawd/agency/sitemap.html"
    "/Users/vibhuthanki/clawd/agency/blog.html"
    "/Users/vibhuthanki/clawd/agency/process.html"
    "/Users/vibhuthanki/clawd/agency/about.html"
    "/Users/vibhuthanki/clawd/agency/services.html"
    "/Users/vibhuthanki/clawd/agency/projects/restaurant/index.html"
    "/Users/vibhuthanki/clawd/agency/projects/salon/index.html"
    "/Users/vibhuthanki/clawd/agency/projects/armory/index.html"
    "/Users/vibhuthanki/clawd/agency/projects/nexus/index.html"
    "/Users/vibhuthanki/clawd/agency/projects/gym/index.html"
    "/Users/vibhuthanki/clawd/agency/projects/boutique/index.html"
    "/Users/vibhuthanki/clawd/agency/projects/aura/index.html"
    "/Users/vibhuthanki/clawd/agency/projects/coaching/index.html"
    "/Users/vibhuthanki/clawd/agency/about/team.html"
    "/Users/vibhuthanki/clawd/agency/about/awards.html"
    "/Users/vibhuthanki/clawd/agency/about/culture.html"
    "/Users/vibhuthanki/clawd/agency/about/careers.html"
    "/Users/vibhuthanki/clawd/agency/about/jobs/senior-frontend-engineer.html"
    "/Users/vibhuthanki/clawd/agency/about/jobs/seo-strategist.html"
    "/Users/vibhuthanki/clawd/agency/about/jobs/product-designer.html"
    "/Users/vibhuthanki/clawd/agency/blog/future-of-webgl.html"
    "/Users/vibhuthanki/clawd/agency/blog/headless-commerce.html"
    "/Users/vibhuthanki/clawd/agency/blog/design-systems.html"
    "/Users/vibhuthanki/clawd/agency/blog/index.html"
    "/Users/vibhuthanki/clawd/agency/blog/rise-of-generative-ui.html"
    "/Users/vibhuthanki/clawd/agency/blog/sustainable-web-design.html"
    "/Users/vibhuthanki/clawd/agency/blog/seo-in-chatgpt-era.html"
    "/Users/vibhuthanki/clawd/agency/blog/ai-in-design.html"
    "/Users/vibhuthanki/clawd/agency/blog/speed-matters.html"
    "/Users/vibhuthanki/clawd/agency/blog/webgpu-next-era.html"
    "/Users/vibhuthanki/clawd/agency/blog/end-of-cookies.html"
    "/Users/vibhuthanki/clawd/agency/blog/ai-personalization.html"
    "/Users/vibhuthanki/clawd/agency/blog/micro-interactions-matter.html"
    "/Users/vibhuthanki/clawd/agency/blog/spatial-computing-web.html"
    "/Users/vibhuthanki/clawd/agency/blog/seo-trends-2026.html"
    "/Users/vibhuthanki/clawd/agency/blog/nocode-vs-procode.html"
    "/Users/vibhuthanki/clawd/agency/blog/headless-cms-vs-monolith.html"
    "/Users/vibhuthanki/clawd/agency/legal/terms.html"
    "/Users/vibhuthanki/clawd/agency/legal/cookies.html"
    "/Users/vibhuthanki/clawd/agency/legal/impressum.html"
    "/Users/vibhuthanki/clawd/agency/legal/privacy.html"
    "/Users/vibhuthanki/clawd/agency/services/design.html"
    "/Users/vibhuthanki/clawd/agency/services/mobile-apps.html"
    "/Users/vibhuthanki/clawd/agency/services/seo.html"
    "/Users/vibhuthanki/clawd/agency/services/ecommerce.html"
    "/Users/vibhuthanki/clawd/agency/services/development.html"
    "/Users/vibhuthanki/clawd/agency/services/analytics.html"
    "/Users/vibhuthanki/clawd/agency/services/branding.html"
    "/Users/vibhuthanki/clawd/agency/services/motion.html"
)

echo "Updating ${#FILES[@]} files..."

for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        echo "Processing: $FILE"
        
        # Add Lottie scripts if not present (after the fonts link)
        if ! grep -q "lottie.min.js" "$FILE"; then
            # Determine the correct path based on file location depth
            REL_PATH=""
            DEPTH=$(echo "$FILE" | sed 's|/Users/vibhuthanki/clawd/agency/||' | tr '/' '\n' | wc -l)
            DEPTH=$((DEPTH - 1))
            
            for i in $(seq 1 $DEPTH); do
                REL_PATH="../$REL_PATH"
            done
            
            # Remove trailing slash if present
            REL_PATH="${REL_PATH%/}"
            [ -z "$REL_PATH" ] && REL_PATH="."
            
            # Insert Lottie scripts after charset meta or at the appropriate place
            sed -i '' "s|<link rel=\"stylesheet\" href=\"\(.*\)style.css\">|<!-- Lottie Animation Library -->\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js\"></script>\n    <script src=\"${REL_PATH}/blue-fire-data.js\"></script>\n\n    <link rel=\"stylesheet\" href=\"\1style.css\">|" "$FILE"
        fi
        
        # Replace static logo with animated flame container
        # Pattern 1: <img src="...logo.svg" ...>
        sed -i '' 's|<img src="[^"]*logo\.svg"[^>]*>||g' "$FILE"
        
        # Add the flame container if not present
        if ! grep -q "logo-flame-container" "$FILE"; then
            sed -i '' 's|<a href="[^"]*index\.html" class="logo">|<a href="index.html" class="logo">\
                <div class="logo-flame-container" id="logoFlame"></div>|' "$FILE"
        fi
        
        echo "  ✓ Updated"
    else
        echo "  ✗ File not found: $FILE"
    fi
done

echo ""
echo "Done! Updated ${#FILES[@]} files."
