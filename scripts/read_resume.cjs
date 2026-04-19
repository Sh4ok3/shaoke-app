const JSZip = require('jszip');
const fs = require('fs');
const buf = fs.readFileSync('C:/Users/User/Desktop/Kyle resume (1).docx');
JSZip.loadAsync(buf).then(zip => {
  return zip.file('word/document.xml').async('string');
}).then(xml => {
  const matches = [...xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map(m => m[1]);
  console.log(matches.join(' ').substring(0, 14000));
}).catch(e => console.error(e));
