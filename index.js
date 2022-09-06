const inquirer = require("inquirer");
const fs = require("fs");

//Use inquirer to prompt user and get responses in variables 

//NEED IN README
//Title of application
//Description (What it does and why you made it)
//Highlight Functionality
//Preview
//Installation instructions (if needed)
//Usage
//Features
//Credits
//License


//Prompt for application title
const basicInfoPrompts = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the name/title of your project/application?',
        validate: (ans) => {
            if (ans) {
                return true;
            }
            else {
                return 'Please enter a valid title for your project/application.';
            }
        }
    },
    { //Prompt for description
        type: 'input',
        name: 'description',
        message: 'Describe what your project/application does and your purpose for creating it.',
        validate: (ans) => {
            if (ans) {
                return true;
            }
            else {
                return 'Please enter a valid description for your project/application.';
            }
        }
    }
]

//prompt for a highlight feature
//Another highlight feature?
//If yes loop the prompt if no continue

const highlightFeaturePrompt = {
    type: 'input',
    name: 'highlightFeature',
    message: 'What is a highlight feature of your project/application.',
    validate: (ans) => {
        if (ans) {
            return true;
        }
        else {
            return 'Please enter a valid feature of your project/application.';
        }
    }
}


//Prompt Make a place for preview image?

//Prompt Do you need to add set up instructions?
//YES > Prompt for set up instructions
const setUpPrompt = {
    type: 'input',
    name: 'installInstructions',
    message: 'Write out the instructions for setting up or installing your project/application. (To break a line add two or more spaces)',
    validate: (ans) => {
        if (ans) {
            return true;
        }
        else {
            return 'Please enter instrcutions to install/set up your project/application.';
        }
    }
}
//NO > continue

//Prompt Do you need to add usage directions?
//YES > Prompt for usage directions
//NO > continue

//prompt for features
//ADD another feature?
//YES loop prompt
//NO continue

//Prompt for credit
//Add another credit?
//YES loop prompt
//NO continue

//Prompt for license message or leave blank for none

function addItemPrompt(item) {
    const itemPrompt = {
        type: 'confirm',
        name: 'willAdd',
        message: `Do you want to add ${item} to the readme?`,
        default: false
    }
    return inquirer.prompt(itemPrompt).then((ans) => {
        console.log(ans);
    })
}

//take answers and plug them in to MD timeplate literals and write file
