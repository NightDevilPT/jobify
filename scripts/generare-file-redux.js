const fs = require('fs');
const path = require('path');

const folderPath = 'scripts/redux-code.txt';  // Path to the text file
const rootFolder = '../app/frontend/src/app/store';  // Base root folder + redux

// Read and parse the text file
function parseFileStructure(txtFilePath) {
  const content = fs.readFileSync(txtFilePath, 'utf-8');
  const files = [];

  // Split content by the file path marker
  const fileSections = content.split(/\/\/ --- File Path: (.+?) ---/g);

  // Process each section to extract file path and content
  for (let i = 1; i < fileSections.length; i += 2) {
    const filePath = fileSections[i].trim();
    const fileContent = fileSections[i + 1].trim();
    files.push({ path: filePath, content: fileContent });
  }

  return files;
}

// Function to create a file with content if it doesn't exist
function createFileWithContent(filePath, content) {
  // Get the directory path
  const dir = path.dirname(filePath);

  // Check if directory exists, create it if it doesn't
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }

  // Check if file exists, create it if it doesn't
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
  } else {
    console.log(`File already exists: ${filePath}`);
  }
}

// Main function to process the text file
function generateFilesFromTxt(txtFilePath) {
  const files = parseFileStructure(txtFilePath);

  files.forEach((file) => {
    // Concatenate the rootFolder with "redux/" and the file path from the text file
    const filePath = path.resolve(__dirname, rootFolder, file.path);
    const content = file.content;

    createFileWithContent(filePath, content);
  });

  console.log('Redux files generation complete.');
}

// Run the script with the text file as input
generateFilesFromTxt(folderPath);
