const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

// Function to generate the additional CQRS folder structure
const createCQRSStructure = (folderPath, entityName) => {
  const capitalizedEntityName = capitalizeFirstLetter(entityName);

  const directories = [
    `commands`,
    `commands/handler`,
    `commands/impl`,
    `queries`,
    `queries/handler`,
    `queries/impl`,
    `repositories`,
  ];

  directories.forEach((dir) => {
    const fullPath = path.join(folderPath, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
    }
  });

  const files = [
    {
      path: `commands/index.ts`,
      content: `export const ${capitalizedEntityName}CommandHandlers = [];`,
    },
    {
      path: `queries/index.ts`,
      content: `export const ${capitalizedEntityName}QueryHandlers = [];`,
    },
    {
      path: `repositories/${entityName}.repository.ts`,
      content: `import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { ${capitalizedEntityName} } from '../entities/${entityName}.entity';

@Injectable()
export class ${capitalizedEntityName}Repository extends BaseRepository<${capitalizedEntityName}> {
  constructor(
    @InjectModel(${capitalizedEntityName}.name) private readonly ${entityName}Model: Model<${capitalizedEntityName}>,
  ) {
    super(${entityName}Model);
  }
}
`,
    },
  ];

  files.forEach((file) => {
    const filePath = path.join(folderPath, file.path);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.content);
      console.log(`Created file: ${filePath}`);
    }
  });

  // Update entity file to extend Document
  updateEntityFile(path.join(folderPath, 'entities', `${entityName}.entity.ts`), entityName);
};

// Function to update the entity file to extend Document
const updateEntityFile = (entityFilePath, entityName) => {
  const capitalizedEntityName = capitalizeFirstLetter(entityName);

  let entityFileContent = '';

  if (fs.existsSync(entityFilePath)) {
    entityFileContent = fs.readFileSync(entityFilePath, 'utf8');
  }

  // Check if the file already contains the Mongoose Document extension and add if missing
  if (!entityFileContent.includes('extends Document')) {
    // Add import statement if it's not already present
    if (!entityFileContent.includes(`import { Document } from 'mongoose';`)) {
      entityFileContent = `import { Document } from 'mongoose';\n${entityFileContent}`;
    }

    // Modify the class to extend Document
    const classDeclarationRegex = new RegExp(`class ${capitalizedEntityName}[^\\{]*\\{`);
    entityFileContent = entityFileContent.replace(
      classDeclarationRegex,
      ` class ${capitalizedEntityName} extends Document {`
    );

    // Write the updated entity file content
    fs.writeFileSync(entityFilePath, entityFileContent, 'utf8');
    console.log(`Updated entity file: ${entityFilePath} to extend Document.`);
  } else {
    console.log(`Entity file: ${entityFilePath} already extends Document.`);
  }
};

// Function to update the module.ts file to add command and query handlers
const updateModuleFile = (moduleFilePath, entityName) => {
  const capitalizedEntityName = capitalizeFirstLetter(entityName);
  const commandHandlersImport = `import { ${capitalizedEntityName}CommandHandlers } from './commands';`;
  const queryHandlersImport = `import { ${capitalizedEntityName}QueryHandlers } from './queries';`;

  // Read the current module.ts file
  let moduleFileContent = fs.readFileSync(moduleFilePath, 'utf8');

  // Inject imports at the top if they don't already exist
  if (!moduleFileContent.includes(`${capitalizedEntityName}CommandHandlers`)) {
    moduleFileContent = `${commandHandlersImport}\n${queryHandlersImport}\n${moduleFileContent}`;
  }

  // Inject command and query handlers into providers
  const providersRegex = /providers\s*:\s*\[([^\]]*)\]/;
  const providersMatch = moduleFileContent.match(providersRegex);
  if (providersMatch) {
    const providersContent = providersMatch[1].trim();

    let newProvidersContent = providersContent;
    if (!providersContent.includes(`${capitalizedEntityName}CommandHandlers`)) {
      newProvidersContent += `, ...${capitalizedEntityName}CommandHandlers`;
    }
    if (!providersContent.includes(`${capitalizedEntityName}QueryHandlers`)) {
      newProvidersContent += `, ...${capitalizedEntityName}QueryHandlers`;
    }

    moduleFileContent = moduleFileContent.replace(
      providersRegex,
      `providers: [${newProvidersContent}]`
    );
  }

  // Write the updated content back to module.ts
  fs.writeFileSync(moduleFilePath, moduleFileContent, 'utf8');
  console.log(`Updated ${moduleFilePath} with command and query handlers.`);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

(async () => {
  try {
    const folderPath = await askQuestion('Enter the folder path (e.g., ./src/modules): ');
    const entityName = await askQuestion('Enter the entity name: ');

    if (!folderPath || !entityName) {
      console.log('Folder path and entity name are required.');
      rl.close();
      return;
    }

    console.log(`Changing directory to ${folderPath}...`);
    process.chdir(folderPath);

    console.log(`Generating NestJS resource for ${entityName}...`);
    execSync(`nest g res ${entityName}`, { stdio: 'inherit' });

    console.log(`Adding CQRS structure to ${folderPath}/${entityName}...`);
    createCQRSStructure(path.join(folderPath, entityName), entityName);

    // Step 5: Update the module.ts file with the command and query handlers
    const moduleFilePath = path.join(folderPath, entityName, `${entityName}.module.ts`);
    updateModuleFile(moduleFilePath, entityName);

    console.log('CQRS structure and files have been created and module file updated successfully.');
  } catch (error) {
    console.error('Error occurred:', error.message);
  } finally {
    rl.close();
  }
})();
