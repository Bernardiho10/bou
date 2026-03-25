const fs = require('fs');
const files = ['xtate.html', 'tracking.html', 'magic-ui.html', 'hotel-management.html', 'emergency.html', 'edtech.html', 'boucloud.html', 'boss.html', 'agritech.html'];

let count = 0;
files.forEach(file => {
  const path = 'src/' + file;
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    const match = content.match(/id="(carousel-[^"]+)"/);
    if (match) {
      const id = match[1];
      if (!content.includes('carousel-control-prev')) {
        let originalContent = content;
        // The regex captures exactly the boundary where the carousel inner closes and the main carousel closes
        content = content.replace(/(<\/div>\s*<\/div>\s*)(<\/div>\s*<\/div>\s*<div class="col-lg-(?:7|12)">)/, (match, g1, g2) => {
            return g1 + `              <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev" style="width: 50px;">\n                <span class="carousel-control-prev-icon" aria-hidden="true" style="background-color: var(--color-primary); padding: 20px; border-radius: 5px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></span>\n                <span class="visually-hidden">Previous</span>\n              </button>\n              <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next" style="width: 50px;">\n                <span class="carousel-control-next-icon" aria-hidden="true" style="background-color: var(--color-primary); padding: 20px; border-radius: 5px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></span>\n                <span class="visually-hidden">Next</span>\n              </button>\n            ` + g2;
        });
        
        if (content !== originalContent) {
            fs.writeFileSync(path, content, 'utf8');
            console.log(`Updated ${file}`);
            count++;
        } else {
            console.log(`Pattern not found in ${file}`);
        }
      } else {
         console.log(`Buttons already exist in ${file}`);
      }
    }
  }
});
console.log(`Total files updated: ${count}`);
