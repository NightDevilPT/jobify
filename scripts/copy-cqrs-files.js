const fs = require('fs');
const path = require('path');

// Load configuration from JSON
const configPath = path.resolve(__dirname, 'config.json');  // Update to your JSON file's path
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Use values from config
const exampleFile = config.exampleFile;
const folderName = config.folderName;
const outputFile = config.outputFile;
const hardcodedFolderPath = path.resolve(__dirname, `../app/backend/src/modules/${folderName}`);

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
        } else if (!filePath.endsWith('.md') && !/test|spec/i.test(file)) {
            // If file and not a .md or test/spec file, add to the result list
            results.push(filePath);
        }
    });
    return results;
}

// New function to retrieve and format example content from a file
function getExampleContent(filePath) {
    const exampleFilePath = path.resolve(__dirname, filePath);
    let exampleContent = '';

    if (fs.existsSync(exampleFilePath)) {
        try {
            const content = fs.readFileSync(exampleFilePath, 'utf8');
            exampleContent = `\n--- Example of CQRS Implementation START ---\n${content}\n--- Example of CQRS Implementation END ---\n`;
        } catch (error) {
            console.error(`Could not read example file ${exampleFilePath}:`, error);
        }
    } else {
        console.warn(`Example file "${filePath}" not found.`);
    }

    return exampleContent;
}

// Function to write collected code from files into output.txt, with example content prepended
function collectCodeFromFiles(dir, outputFile) {
    const allFiles = getFilesRecursively(dir);
    let outputData;
    outputData = getExampleContent(exampleFile);

    outputData += `\n--- The source code of ${folderName} we want to modify ---\n`;

    // Append contents from each file in the target folder
    allFiles.forEach((filePath) => {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            outputData += `\n--- File: ${filePath} ---\n${fileContent}\n`;
        } catch (error) {
            console.error(`Could not read file ${filePath}:`, error);
        }
    });

    // Additional instructions
    outputData += `
I have included an example demonstrating a file and folder structure based on the CQRS (Command Query Responsibility Segregation) pattern, along with a sample source file and its folder.

Using this example as a reference, please create appropriate commands for Create, Update, and Delete operations, along with their respective handlers, for the ${folderName} module. Additionally, create a Query command and its handler.

Ensure to set up an index.ts file for both the commands and queries, as well as for the module file, which should organize all the modules, services, and controllers.

Ensure that:
1. Commands and queries are triggered through the service.
2. The controller includes Swagger documentation, following the provided example code.
3. A proper service code is provided to trigger commands and queries, following the example code.
4. All operations involving updates, modifications, deletions, or any database changes are added in the repository, following the provided example code.
`;


    fs.writeFileSync(outputFile, outputData, 'utf8');
    console.log(`All file contents with example written to ${outputFile}`);
}

// Check if the hardcoded folder exists and is a directory
if (fs.existsSync(hardcodedFolderPath) && fs.statSync(hardcodedFolderPath).isDirectory()) {
    collectCodeFromFiles(hardcodedFolderPath, outputFile);
} else {
    console.error('Invalid folder path. Make sure the folder exists.');
}
