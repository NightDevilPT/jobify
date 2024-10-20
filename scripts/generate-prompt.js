const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Template for the CQRS Module folder structure with relative paths included
const template = `
folder structure of CQRS Module
[moduleName]                          // Root folder for the module (replace with actual module name)
 |
 |- commands                          // Contains all command-related logic (for write operations)
 |    |- handler                      // Contains handlers that process the commands (create, update, delete)
 |    |    |- [commandName].handler.ts  // Command handler for a specific command, e.g., CreateUserHandler
 |    |
 |    |- impl                          // Implementation folder for command definitions (write operations)
 |    |    |- [commandName].command.ts  // Command file for a specific write operation, e.g., CreateUserCommand
 |    |
 |    |- index.ts                      // Exports all command handlers in an array for easy import
 |
 |- dto                               // Contains Data Transfer Objects (DTOs) for command and query inputs
 |    |- [moduleName].dto.ts           // DTOs for the module (e.g., CreateUserDto, UpdateUserDto)
 |
 |- entities                          // Contains the database entities
 |    |- [moduleName].entity.ts        // Entity definitions (e.g., UserEntity, OrderEntity)
 |
 |- queries                           // Contains all query-related logic (for read operations)
 |    |- handler                       // Contains handlers that process the queries (read operations)
 |    |    |- [queryName].handler.ts   // Query handler for a specific read operation, e.g., GetUserHandler
 |    |
 |    |- impl                          // Implementation folder for query definitions (read operations)
 |    |    |- [queryName].query.ts     // Query file for a specific read operation, e.g., GetUserQuery
 |    |
 |    |- index.ts                      // Exports all query handlers in an array for easy import
 |
 |- repository                        // Contains repository logic for interacting with the database
 |    |- [moduleName].repository.ts    // The repository for data access, e.g., UserRepository
 |
 |- [moduleName].controller.ts        // The controller that handles incoming HTTP requests (REST endpoints)
 |
 |- [moduleName].module.ts            // The main module definition for dependency injection
 |
 |- [moduleName].service.ts           // Service that contains business logic (possibly calls command/query handlers)

Repository (Path: {{repoPath}}): 
{{repoCode}}

Entity (Path: {{entityPath}}): 
{{entityCode}}

Controller (Path: {{controllerPath}}): 
{{controllerCode}}

Service (Path: {{servicePath}}): 
{{serviceCode}}

Error Service (Path: {{errorServicePath}}): 
{{errorServiceCode}}

Logger Service (Path: {{loggerServicePath}}): 
{{loggerServiceCode}}

Here’s the revised version:

This folder structure outlines the CQRS module, which manages both commands and queries. The module is organized into handlers and implementations (impl). The **handlers** folder contains the logic responsible for processing commands and queries, while the **impl** folder contains the command and query definitions.

- **Commands Folder:** This folder contains the logic for handling all write, update, and delete operations. Commands and their corresponding handlers are placed here.
- **Queries Folder:** This folder handles read operations, with query commands and handlers for retrieving data.
  
Each handler interacts with the **Repository** to communicate with the database and perform the necessary actions.

### Key Points:
- **Command or Query Handlers:** When building command or query handlers, ensure you use the **ErrorService** for error handling and the **LoggerService** for logging to support debugging.
- **Repository:** Any database-related logic, such as data retrieval or updates, should be implemented in the repository file.
- **Controller:** When creating a controller, include Swagger documentation and support for multipart form data (where applicable) to enable easy API testing in Swagger.

### Workflow:
Controller => Service => Service triggers the command => Command handler executes the logic and returns a response.

- **DTOs:** When creating or modifying features, ensure proper validation by implementing appropriate DTOs with the necessary validation rules.

**Note:** Whenever you create or modify anything, make sure to incorporate the changes as outlined in this prompt.
`;

// Utility function to read file content
const readFileContent = (filePath) => {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : null;
};

// Function to replace placeholders in the template
const replacePlaceholders = (template, moduleFolderPath, replacements) => {
  const moduleName = path.basename(moduleFolderPath);
  
  // Replace [moduleName], placeholders, and provided replacement values
  let result = template.replace(/\[moduleName\]/g, moduleName);

  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(`{{${key}}}`, value || '');
  }
  
  return result;
};

// Function to generate the prompt file
const generatePrompt = (moduleFolderPath) => {
  const entityPath = path.join(moduleFolderPath, 'entities', `${path.basename(moduleFolderPath)}.entity.ts`);
  const repoPath = path.join(moduleFolderPath, 'repositories', `${path.basename(moduleFolderPath)}.repository.ts`);
  const controllerPath = path.join(moduleFolderPath, `${path.basename(moduleFolderPath)}.controller.ts`);
  const servicePath = path.join(moduleFolderPath, `${path.basename(moduleFolderPath)}.service.ts`);
  const errorServicePath = path.join('app', 'backend', 'src', 'services', 'error', 'error.service.ts'); // Relative path to ErrorService
  const loggerServicePath = path.join('app', 'backend', 'src', 'services', 'logger', 'logger.service.ts'); // Relative path to LoggerService

  // Read file contents
  const entityCode = readFileContent(entityPath);
  const controllerCode = readFileContent(controllerPath);
  const serviceCode = readFileContent(servicePath);
  const repoCode = readFileContent(repoPath);
  const errorServiceCode = readFileContent(errorServicePath);
  const loggerServiceCode = readFileContent(loggerServicePath);

  if (!entityCode || !controllerCode || !serviceCode || !repoCode || !errorServiceCode || !loggerServiceCode) {
    console.log('Error: One or more required files (entity, controller, service, error service, logger service) are missing.');
    return;
  }

  // Replace placeholders in the template with file contents and relative paths
  const finalPrompt = replacePlaceholders(template, moduleFolderPath, {
    entityCode,
    controllerCode,
    serviceCode,
    repoCode,
    errorServiceCode,
    loggerServiceCode,
    entityPath: path.relative('app', entityPath), // Make path relative to 'app'
    controllerPath: path.relative('app', controllerPath),
    servicePath: path.relative('app', servicePath),
    repoPath: path.relative('app', repoPath),
    errorServicePath: path.relative('app', errorServicePath),
    loggerServicePath: path.relative('app', loggerServicePath)
  });

  // Write the final prompt to a file
  fs.writeFileSync(path.join(moduleFolderPath, 'prompt.txt'), finalPrompt);
  console.log('Prompt generated successfully in prompt.txt.');
};

// Setting up readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for the folder path
rl.question('Please provide the module folder path: ', (moduleFolderPath) => {
  if (!fs.existsSync(moduleFolderPath)) {
    console.log('Error: The provided folder path does not exist.');
  } else {
    generatePrompt(moduleFolderPath);
  }
  rl.close();
});
