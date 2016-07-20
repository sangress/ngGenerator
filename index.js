const readline = require('readline');
const inquirer = require('inquirer');
const fs = require('fs');
const _ = require('lodash');

let config = require('./config.json');

// TODO: RxJS

function generateFile(templateFile, componentName) {
	componentName = componentName || 'my-comp';

	let file = fs.readFileSync(templateFile, {}).toString();
	let compiled = _.template(file);
	let componentSelectorName = _.camelCase(componentName);
	let componentNameCamel = _.upperFirst(componentSelectorName);

	return compiled({
		componentName, 
		componentNameCamel, 
		componentSelectorName
	});
}



let componentsPath = config.componentsPath; 
let path = process.argv[2];
inquirer.prompt([{
	type: 'list',
	name: 'type',
	message: 'what do you want to generate?',
	choices: [
		'component'
	],
	filter: val => {
		return val.toLowerCase()
	}
}]).then(answers => {
	console.log(answers)
	inquirer.prompt([{
		type: 'input',
		name: 'componentName',
		message: 'component name? (this will be the folder name.)'
	}]).then(answer => {				
		let componentPath = componentsPath + '/' + answer.componentName;
		fs.mkdirSync(componentPath);

		let componentFile = generateFile(config.templatesPath + 'component.ts', answer.componentName);
		let componentHtmlFile = generateFile(config.templatesPath + 'component.html', answer.componentName);
		let componentStyleFile = generateFile(config.templatesPath + 'component.scss', answer.componentName);

		fs.writeFile(componentPath + '/' + answer.componentName + '.ts', componentFile, err => {
			if(err) {
				return console.log(err);
			}

			console.log("component file created!");
		});
		fs.writeFile(componentPath + '/' + answer.componentName + '.html', componentHtmlFile, err => {
			if(err) {
				return console.log(err);
			}

			console.log("component html created!");
		});
		fs.writeFile(componentPath + '/' + answer.componentName + '.scss', componentStyleFile, err => {
			if(err) {
				return console.log(err);
			}

			console.log("component style file created!");
		});		

		// console.log("component created succesfully! don't forget to sign it;");
	})
});








