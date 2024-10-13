const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

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
	updateEntityFile(
		path.join(folderPath, "entities", `${entityName}.entity.ts`),
		entityName
	);
};

// Function to update the entity file to extend Document
const updateEntityFile = (entityFilePath, entityName) => {
	const capitalizedEntityName = capitalizeFirstLetter(entityName);
	const mongooseSchemaImport = `import { SchemaFactory } from '@nestjs/mongoose';`;

	let entityFileContent = "";

	if (fs.existsSync(entityFilePath)) {
		entityFileContent = fs.readFileSync(entityFilePath, "utf8");
	}

	// Check if the file already contains the Mongoose Document extension and add if missing
	if (!entityFileContent.includes("extends Document")) {
		// Add import statement if it's not already present
		if (
			!entityFileContent.includes(`import { Document } from 'mongoose';`)
		) {
			entityFileContent = `import { Document } from 'mongoose';\n${mongooseSchemaImport};\n${entityFileContent}`;
		}

		// Modify the class to extend Document
		const classDeclarationRegex = new RegExp(
			`class ${capitalizedEntityName}[^\\{]*\\{`
		);
		entityFileContent = entityFileContent.replace(
			classDeclarationRegex,
			`class ${capitalizedEntityName} extends Document {`
		);

		entityFileContent += `\nexport const ${capitalizedEntityName}Schema = SchemaFactory.createForClass(${capitalizedEntityName});\n${capitalizedEntityName}Schema.plugin(require('mongoose-autopopulate'));`;

		// Write the updated entity file content
		fs.writeFileSync(entityFilePath, entityFileContent, "utf8");
		console.log(
			`Updated entity file: ${entityFilePath} to extend Document.`
		);
	} else {
		console.log(`Entity file: ${entityFilePath} already extends Document.`);
	}
};

// const updateControllerFile = (controllerFilePath, entityName) => {
//   const capitalizedEntityName = capitalizeFirstLetter(entityName);
//   const apiTagsImport = `import { ApiTags } from '@nestjs/swagger';`;
//   const apiOperationImport = `import { ApiOperation } from '@nestjs/swagger';`;
//   const apiTagsDecorator = `@ApiTags('${capitalizedEntityName}')`;

//   let controllerFileContent = '';

//   if (fs.existsSync(controllerFilePath)) {
//     controllerFileContent = fs.readFileSync(controllerFilePath, 'utf8');
//   }

//   // Add imports if not already present
//   if (!controllerFileContent.includes(`@nestjs/swagger`)) {
//     controllerFileContent = `${apiTagsImport}\n${apiOperationImport}\n${controllerFileContent}`;
//   }

//   // Add @ApiTags to the controller class if not already present
//   const controllerClassRegex = new RegExp(`class ${capitalizedEntityName}Controller`, 'g');
//   if (!controllerFileContent.includes(apiTagsDecorator)) {
//     controllerFileContent = controllerFileContent.replace(
//       controllerClassRegex,
//       `${apiTagsDecorator}\nclass ${capitalizedEntityName}Controller`
//     );
//   }

//   // Optionally, add @ApiOperation for individual methods (e.g., for findAll, findOne, create, update, delete)
//   const methodsToDecorate = ['findAll', 'findOne', 'create', 'update', 'remove'];
//   methodsToDecorate.forEach((method) => {
//     const methodRegex = new RegExp(`async ${method}\\([^\\)]*\\)`, 'g');
//     if (!controllerFileContent.includes(`@ApiOperation({`)) {
//       controllerFileContent = controllerFileContent.replace(
//         methodRegex,
//         `@ApiOperation({ summary: '${capitalizeFirstLetter(method)} ${capitalizedEntityName}' })\nasync ${method}`
//       );
//     }
//   });

//   // Write the updated controller file content
//   fs.writeFileSync(controllerFilePath, controllerFileContent, 'utf8');
//   console.log(`Updated controller file: ${controllerFilePath} with Swagger decorators.`);
// };


const updateModuleFile = (moduleFilePath, entityName) => {
  const capitalizedEntityName = capitalizeFirstLetter(entityName);
  const commandHandlersImport = `import { ${capitalizedEntityName}CommandHandlers } from './commands';`;
  const queryHandlersImport = `import { ${capitalizedEntityName}QueryHandlers } from './queries';`;
  const mongooseImport = `import { MongooseModule } from '@nestjs/mongoose';`;
  const entityImport = `import { ${capitalizedEntityName}, ${capitalizedEntityName}Schema } from './entities/${entityName}.entity';`;
  const mongooseFeatureImport = `MongooseModule.forFeature([{ name: ${capitalizedEntityName}.name, schema: ${capitalizedEntityName}Schema }])`;

  // Read the current module.ts file
  let moduleFileContent = fs.readFileSync(moduleFilePath, 'utf8');

  // Inject imports at the top if they don't already exist
  if (
    !moduleFileContent.includes(`${capitalizedEntityName}CommandHandlers`) &&
    !moduleFileContent.includes(`${capitalizedEntityName}QueryHandlers`)
  ) {
    moduleFileContent = `${commandHandlersImport}\n${queryHandlersImport}\n${mongooseImport}\n${entityImport}\n${moduleFileContent}`;
  }

  // Inject MongooseModule into imports
  const importsRegex = /imports\s*:\s*\[([^\]]*)\]/;
  const importsMatch = moduleFileContent.match(importsRegex);
  if (importsMatch) {
    let importsContent = importsMatch[1].trim();

    if (!importsContent.includes(mongooseFeatureImport)) {
      importsContent += `, ${mongooseFeatureImport}`;
    }

    moduleFileContent = moduleFileContent.replace(
      importsRegex,
      `imports: [${importsContent}]`
    );
  } else {
    // If imports section doesn't exist, add it
    moduleFileContent = moduleFileContent.replace(
      /@Module\s*\(\s*{([\s\S]*?)\}\s*\)/,
      `@Module({\nimports: [${mongooseFeatureImport}],\n$1\n})`
    );
  }

  // Inject command and query handlers into providers
  const providersRegex = /providers\s*:\s*\[([^\]]*)\]/;
  const providersMatch = moduleFileContent.match(providersRegex);
  if (providersMatch) {
    let providersContent = providersMatch[1].trim();

    if (!providersContent.includes(`${capitalizedEntityName}Service`)) {
      providersContent += `, ${capitalizedEntityName}Service`;
    }
    if (!providersContent.includes(`${capitalizedEntityName}CommandHandlers`)) {
      providersContent += `, ...${capitalizedEntityName}CommandHandlers`;
    }
    if (!providersContent.includes(`${capitalizedEntityName}QueryHandlers`)) {
      providersContent += `, ...${capitalizedEntityName}QueryHandlers`;
    }

    moduleFileContent = moduleFileContent.replace(
      providersRegex,
      `providers: [${providersContent}]`
    );
  } else {
    // If providers section doesn't exist, add it
    moduleFileContent = moduleFileContent.replace(
      /@Module\s*\(\s*{([\s\S]*?)\}\s*\)/,
      `@Module({\nproviders: [${capitalizedEntityName}Service, ...${capitalizedEntityName}CommandHandlers, ...${capitalizedEntityName}QueryHandlers],\n$1\n})`
    );
  }

  // Inject the controller into the module
  const controllersRegex = /controllers\s*:\s*\[([^\]]*)\]/;
  const controllersMatch = moduleFileContent.match(controllersRegex);
  if (controllersMatch) {
    let controllersContent = controllersMatch[1].trim();

    if (!controllersContent.includes(`${capitalizedEntityName}Controller`)) {
      controllersContent += `, ${capitalizedEntityName}Controller`;
    }

    moduleFileContent = moduleFileContent.replace(
      controllersRegex,
      `controllers: [${controllersContent}]`
    );
  } else {
    // If controllers section doesn't exist, add it
    moduleFileContent = moduleFileContent.replace(
      /@Module\s*\(\s*{([\s\S]*?)\}\s*\)/,
      `@Module({\ncontrollers: [${capitalizedEntityName}Controller],\n$1\n})`
    );
  }

  // Write the updated content back to module.ts
  fs.writeFileSync(moduleFilePath, moduleFileContent, 'utf8');
  console.log(
    `Updated ${moduleFilePath} with MongooseModule, command and query handlers, controller, and service.`
  );
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
		const folderPath = await askQuestion(
			"Enter the folder path (e.g., ./src/modules): "
		);
		const entityName = await askQuestion("Enter the entity name: ");

		if (!folderPath || !entityName) {
			console.log("Folder path and entity name are required.");
			rl.close();
			return;
		}

		console.log(`Changing directory to ${folderPath}...`);
		process.chdir(folderPath);

		console.log(`Generating NestJS resource for ${entityName}...`);
		execSync(`nest g res ${entityName}`, { stdio: "inherit" });

		console.log(`Adding CQRS structure to ${folderPath}/${entityName}...`);
		createCQRSStructure(path.join(folderPath, entityName), entityName);

		// Step 5: Update the module.ts file with the command and query handlers
		const moduleFilePath = path.join(
			folderPath,
			entityName,
			`${entityName}.module.ts`
		);
		updateModuleFile(moduleFilePath, entityName);

    // Update the controller file with Swagger decorators
		// const controllerFilePath = path.join(
		// 	folderPath,
		// 	entityName,
		// 	`${entityName}.controller.ts`
		// );
		// updateControllerFile(controllerFilePath, entityName);

		console.log(
			"CQRS structure and files have been created and module file updated successfully."
		);
	} catch (error) {
		console.error("Error occurred:", error.message);
	} finally {
		rl.close();
	}
})();
