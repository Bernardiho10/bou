import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.html') || file.endsWith('.lhtml')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/"assets\//g, '"/assets/')
    .replace(/'assets\//g, "'/assets/")
    .replace(/\(assets\//g, "(/assets/");
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Updated:', file);
    changedCount++;
  }
});

console.log('Fixed paths in', changedCount, 'files.');
