const fs = require('fs');
const path = require('path');

// Hardcoded folder path (update this with your actual folder path)
const folderName = 'user'
const hardcodedFolderPath = path.resolve(__dirname, `../app/backend/src/modules/${folderName}`);
const outputFile = 'output.txt';

// Function to recursively get all files in a directory
function getFilesRecursively(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            // If directory, recursively get files from there
            results = results.concat(getFilesRecursively(filePath));
        } else {
            // If file, add to the result list
            results.push(filePath);
        }
    });
    return results;
}

// Function to write collected code from files into output.txt
function collectCodeFromFiles(dir, outputFile) {
    const allFiles = getFilesRecursively(dir);
    let outputData = '';

    allFiles.forEach((filePath) => {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            outputData += `\n--- File: ${filePath} ---\n${fileContent}\n`;
        } catch (error) {
            console.error(`Could not read file ${filePath}:`, error);
        }
    });

    fs.writeFileSync(outputFile, outputData, 'utf8');
    console.log(`All file contents written to ${outputFile}`);
}

// Check if the hardcoded folder exists and is a directory
if (fs.existsSync(hardcodedFolderPath) && fs.statSync(hardcodedFolderPath).isDirectory()) {
    collectCodeFromFiles(hardcodedFolderPath, outputFile);
} else {
    console.error('Invalid folder path. Make sure the folder exists.');
}
