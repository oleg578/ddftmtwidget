const fs = require('fs');
const path = require('path');

// Read the JSON file
const filePath = path.join(__dirname, 'model.json');
const data = fs.readFileSync(filePath, 'utf8');

// Parse the JSON data
const jsonData = JSON.parse(data);

// Template for the index.html file
const htmlTemplate = (handle) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${handle}</title>
    </head>
    <body>
        <h1>${handle}</h1>
    </body>
</html>
`;

// Create a directory and index.html file for each handle
jsonData.Response.forEach(item => {
    const dirPath = path.join(__dirname, '../collections', item.handle);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
    } else {
        console.log(`Directory already exists: ${dirPath}`);
    }

    const htmlContent = htmlTemplate(item.handle);
    const filePath = path.join(dirPath, 'index.html');
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    console.log(`File created: ${filePath}`);
});