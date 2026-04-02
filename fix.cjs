const fs = require('fs');
let c = fs.readFileSync('src/components/landing/SplashSequence.tsx', 'utf8');
c = c.replace(/const htmlContent1 = \`([\\s\\S]*?)^(\`)/m, (m, p1, p2) => 'const htmlContent1 = \`' + p1.replace(/\`/g, '\\\\`') + p2);
c = c.replace(/const htmlContent2 = \`([\\s\\S]*?)^(\`)/m, (m, p1, p2) => 'const htmlContent2 = \`' + p1.replace(/\`/g, '\\\\`') + p2);
fs.writeFileSync('src/components/landing/SplashSequence.tsx', c);
console.log('Fixed SplashSequence.tsx');
