const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Define the template (Your provided prompt)
const template = `
folder structure of CQRS Module
[moduleName]                          // Root folder for the module (replace with actual module name)
│
├── commands                          // Contains all command-related logic (for write operations)
│   ├── handler                       // Contains handlers that process the commands (create, update, delete)
│   │   ├── [commandName].handler.ts  // Command handler for a specific command, e.g., CreateUserHandler
│   │
│   ├── impl                          // Implementation folder for command definitions (write operations)
│   │   ├── [commandName].command.ts  // Command file for a specific write operation, e.g., CreateUserCommand
│   │
│   ├── index.ts                      // Exports all command handlers in an array for easy import
│
├── dto                               // Contains Data Transfer Objects (DTOs) for command and query inputs
│   ├── [moduleName].dto.ts           // DTOs for the module (e.g., CreateUserDto, UpdateUserDto)
│
├── entities                          // Contains the database entities
│   ├── user.entity.ts                // Entity definitions (e.g., UserEntity, OrderEntity)
│
├── queries                           // Contains all query-related logic (for read operations)
│   ├── handler                       // Contains handlers that process the queries (read operations)
│   │   ├── [queryName].handler.ts    // Query handler for a specific read operation, e.g., GetUserHandler
│   │
│   ├── impl                          // Implementation folder for query definitions (read operations)
│   │   ├── [queryName].query.ts      // Query file for a specific read operation, e.g., GetUserQuery
│   │
│   ├── index.ts                      // Exports all query handlers in an array for easy import
│
├── repository                        // Contains repository logic for interacting with the database
│   ├── [moduleName].repository.ts    // The repository for data access, e.g., UserRepository
│
├── [moduleName].controller.ts        // The controller that handles incoming HTTP requests (REST endpoints)
│
├── [moduleName].module.ts            // The main module definition for dependency injection
│
└── [moduleName].service.ts           // Service that contains business logic (possibly calls command/query handlers)

this is my folder structure of the CQRS module which contains the commands and queries
this folder contains the handler and impl 
handler contains all the handlers which listen command which will be created in the impl folder of command and query
all write,update,delete command and its handler will be generate in the commands folder
but for read operation we use query command and its handler to get data which contains in queries handler,impl folder
all handlers logic use the Respository folder to connect with db and perform action 

workflow : controller -> service -> ( service trigger the command ) -> command handler perform a logic and return response

Common Service which we are using

Error Service :
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  GoneException,
  ImATeapotException,
  MethodNotAllowedException,
  NotAcceptableException,
  RequestTimeoutException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

@Injectable()
export class ErrorService {
  throwNotFoundError(message: string): void {
    throw new NotFoundException(message);
  }

  throwBadRequestError(message: string): void {
    throw new BadRequestException(message);
  }

  throwInternalServerError(message: string): void {
    throw new InternalServerErrorException(message);
  }

  throwUnauthorizedError(message: string): void {
    throw new UnauthorizedException(message);
  }

  throwForbiddenError(message: string): void {
    throw new ForbiddenException(message);
  }

  throwConflictError(message: string): void {
    throw new ConflictException(message);
  }

  throwGoneError(message: string): void {
    throw new GoneException(message);
  }

  throwTeapotError(message: string): void {
    throw new ImATeapotException(message);
  }

  throwMethodNotAllowedError(message: string): void {
    throw new MethodNotAllowedException(message);
  }

  throwNotAcceptableError(message: string): void {
    throw new NotAcceptableException(message);
  }

  throwRequestTimeoutError(message: string): void {
    throw new RequestTimeoutException(message);
  }

  throwUnsupportedMediaTypeError(message: string): void {
    throw new UnsupportedMediaTypeException(message);
  }
}

LoggerService : 
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;
  private context?: string;  // The default context

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp, context }) => {
          return \`[\${level.toUpperCase()}] \${timestamp} \${context ? \`[\${context}]\` : ''} \${message}\`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d',
        }),
      ],
    });
  }

  // Method to set the default context
  setContext(context: string): void {
    this.context = context;
  }

  // Log methods with optional overriding context
  log(message: string, context?: string): void {
    this.logger.info(message, { context: context || this.context });
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(\`\${message} - Trace: \${trace}\`, { context: context || this.context });
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, { context: context || this.context });
  }

  debug(message: string, context?: string): void {
    this.logger.debug(message, { context: context || this.context });
  }

  verbose(message: string, context?: string): void {
    this.logger.verbose(message, { context: context || this.context });
  }
}

Entity : 
{{entityCode}}

Controller : 
{{controllerCode}}

Service : 
{{serviceCode}}
`;

// Utility function to read file content
const readFileContent = (filePath) => {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : null;
};

// Function to generate the prompt file
const generatePrompt = (moduleFolderPath) => {
  const entityPath = path.join(moduleFolderPath, 'entities', 'user.entity.ts');
  const controllerPath = path.join(moduleFolderPath, `${path.basename(moduleFolderPath)}.controller.ts`);
  const servicePath = path.join(moduleFolderPath, `${path.basename(moduleFolderPath)}.service.ts`);

  // Read file contents
  const entityCode = readFileContent(entityPath);
  const controllerCode = readFileContent(controllerPath);
  const serviceCode = readFileContent(servicePath);

  if (!entityCode || !controllerCode || !serviceCode) {
    console.log('Error: One or more required files (entity, controller, service) are missing.');
    return;
  }

  // Replace placeholders in the template
  const finalPrompt = template
    .replace('{{entityCode}}', entityCode)
    .replace('{{controllerCode}}', controllerCode)
    .replace('{{serviceCode}}', serviceCode);

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
