const fs = require('fs');
const path = require('path');
const dir = process.cwd();

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  
  // Remove existing active classes first
  content = content.replace(/class="active"/g, '');
  
  // For each link in the menu, if it matches the current filename, add active class
  // We target the main-menu and vs-mobile-menu
  // Simple heuristic: find <a href="filename.html"> and add class="active"
  
  const activeLink = `href="${f}"`;
  const regex = new RegExp(`(<a\\s+[^>]*?)${activeLink}([^>]*?>)`, 'g');
  
  let newContent = content.replace(regex, `$1${activeLink} class="active"$2`);
  
  if(content !== newContent) {
    fs.writeFileSync(p, newContent, 'utf8');
    console.log('Fixed active link in ' + f);
  }
});
