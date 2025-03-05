const fs = require('fs');
const path = require('path');

// Define the folder path here
const folderPath = 'app/frontend/src/app/store/layout';  // <-- Set your folder path here

// Function to read and copy file contents with file paths into ng-output.txt
function copyCodeWithPaths(directory) {
    const outputFile = path.join(directory, 'ng-output.txt');
    
    // Open or create ng-output.txt and prepare it for writing
    const output = fs.createWriteStream(outputFile, { flags: 'w' });

    // Recursive function to walk through folders
    function walkDir(dir) {
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                // Recursively walk through nested directories
                walkDir(filePath);
            } else {
                // Only process specific file types
                if (file.endsWith('.txt') || file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.scss') || file.endsWith('.md')) {
                    try {
                        // Write file path as a header
                        output.write(`\n\n--- File Path: ${filePath} ---\n\n`);

                        // Read the file content and write to output file
                        const content = fs.readFileSync(filePath, 'utf8');
                        output.write(content);
                    } catch (error) {
                        console.error(`Could not read ${filePath}: ${error}`);
                    }
                }
            }
        });
    }

    // Start walking from the root directory
    walkDir(directory);

    // Close the output file
    output.end(() => {
        console.log(`Content saved to ${outputFile}`);
    });
}

// Run the function with the predefined folder path
copyCodeWithPaths(folderPath);
