const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
const regex1 = /const GUJ_FONT_REGULAR_B64 = "[^"]+";/;
const regex2 = /const GUJ_FONT_BOLD_B64 = "[^"]+";/;
const match1 = content.match(regex1);
const match2 = content.match(regex2);
console.log('Regular found:', !!match1, 'Bold found:', !!match2);
if (!match1 || !match2) { process.exit(1); }
const regB64 = match1[0].match(/"([^"]+)"/)[1];
const boldB64 = match2[0].match(/"([^"]+)"/)[1];
console.log('Reg b64 len:', regB64.length, 'Bold b64 len:', boldB64.length);
content = content.substring(0, match1.index) + 'let GUJ_FONT_REGULAR_B64 = null;' + content.substring(match1.index + match1[0].length);
const match2b = content.match(regex2);
content = content.substring(0, match2b.index) + 'let GUJ_FONT_BOLD_B64 = null;' + content.substring(match2b.index + match2b[0].length);
const bodyEnd = content.lastIndexOf('</body>');
const fontScript = '\n<script>\nGUJ_FONT_REGULAR_B64 = ' + JSON.stringify(regB64) + ';\nGUJ_FONT_BOLD_B64 = ' + JSON.stringify(boldB64) + ';\n</script>\n';
content = content.substring(0, bodyEnd) + fontScript + content.substring(bodyEnd);
fs.writeFileSync('index.html', content, 'utf8');
console.log('Done. New size:', content.length);
