const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'client/src/components');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Updated regex to catch ANY img tag following "Buy with"
    const regex = /<a([^>]*className="btns-full[^>]*")>\s*Buy with(?:\{" "\})?\s*<img[^>]*>\s*<\/a>/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, '<a$1>Buy now</a>');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed:', filePath);
    }
}

function traverseDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            replaceInFile(fullPath);
        }
    });
}

traverseDirectory(directoryPath);
console.log('Done!');
