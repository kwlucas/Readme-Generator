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
];

//prompt for a highlight feature
//Another highlight feature?
//If yes loop the prompt if no continue

const highlightFeaturePrompt = {
    type: 'input',
    name: 'highlightFeature',
    message: 'What is a highlight feature of your project/application?',
    validate: (ans) => {
        if (ans) {
            return true;
        }
        else {
            return 'Please enter a valid feature of your project/application.';
        }
    }
};


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
            return 'Please enter valid instrcutions to install/set up your project/application.';
        }
    }
};
//NO > continue

//Prompt Do you need to add usage directions?
//YES > Prompt for usage directions
const usagePrompt = {
    type: 'input',
    name: 'usageDirections',
    message: 'Write out the directions for using your project/application. (To break a line add two or more spaces)',
    validate: (ans) => {
        if (ans) {
            return true;
        }
        else {
            return 'Please enter valid directions for how to properly use your project/application.';
        }
    }
};
//NO > continue

//prompt for features
const featurePrompt = {
    type: 'input',
    name: 'feature',
    message: 'What is a feature of your project/application?',
    validate: (ans) => {
        if (ans) {
            return true;
        }
        else {
            return 'Please enter a valid feature of your project/application.';
        }
    }
};
//ADD another feature?
//YES loop prompt
//NO continue

//Prompt for credit
const creditPrompt = {
    type: 'input',
    name: 'credit',
    message: 'What contributor or asset do you want give credit to? (Include links if needed)',
    validate: (ans) => {
        if (ans) {
            return true;
        }
        else {
            return 'Please enter a valid contributor/asset you want to credit.';
        }
    }
};
//Add another credit?
//YES loop prompt
//NO continue

//Prompt for license message or leave blank for none
const licensePrompt = {
    type: 'input',
    name: 'license',
    message: 'Enter your license or copywrite text. If you do not have a license leave this blank or type "N/A".'
};

function addItemPrompt(item) {
    const itemPrompt = {
        type: 'confirm',
        name: 'willAdd',
        message: `Do you want to add ${item} to the readme?`,
        default: false
    };
    return itemPrompt;
};

async function addAnotherPrompt(repeatPrompt, item) {
    const itemPrompt = {
        type: 'confirm',
        name: 'addAnother',
        message: `Do you want to add ${item} to the list?`,
        default: false
    }
    const dataName = repeatPrompt.name;
    const questions = [repeatPrompt, itemPrompt];
    let itemsToAdd = [];
    let askAgain = true;
    await inquirer.prompt(questions).then((ans) => {
        askAgain = ans.addAnother;
        itemsToAdd.push(ans[`${dataName}`]);

        // if (ans.addAnother) {
        //     return addAnotherPrompt(repeatPrompt, item);
        // }
        // else {
        //     return itemsToAdd;
        // }
    });
    if(askAgain){
        return await addAnotherPrompt(repeatPrompt, item);
    }
    else {
        return itemsToAdd;
    }
}

//take answers and plug them in to MD timeplate literals and write file
async function generateReadme() {
    let markdownContent = '';
    let newSection = false;
    await inquirer.prompt(basicInfoPrompts).then((ans) => {
        const { title, description } = ans;
        markdownContent += `# ${title}\n> ${description}\n`;
    });

    // let highlightSection = '';
    await inquirer.prompt(addItemPrompt('a highlight feature list')).then((ans) => {
        newSection = ans.willAdd;
    });
    if (newSection) {
        markdownContent += '## Highlight Features\n';
        await addAnotherPrompt(highlightFeaturePrompt, 'another highlight feature').then((highlightArray) => {
            for (let i = 0; i < highlightArray.length; i++) {
                markdownContent += `- ${highlightArray[i]}\n`;
            }
        });
        newSection = false;
    }

    // let previewSection = '';
    await inquirer.prompt(addItemPrompt('a placeholder section for a preview image')).then((ans) => {
        if (ans.willAdd) {
            markdownContent += '##Preview\n';
        }
    });

    // let setupInstructions = '';
    await inquirer.prompt(addItemPrompt('setup/installation instructions')).then((ans) => {
        newSection = ans.willAdd;
    });
    
    if(newSection) {
        await inquirer.prompt(setUpPrompt).then((answer) => {
            markdownContent += `##Setup\n${answer.installInstructions}\n`;
        })
    }

    // let usageDirections = '';
    await inquirer.prompt(addItemPrompt('usage directions')).then((ans) => {
        newSection = ans.willAdd;
    });
    if(newSection){
        await inquirer.prompt(usagePrompt).then((answer) => {
            markdownContent += `##Usage\n${answer.usageDirections}\n`;
        });
        newSection = false;
    }

    // let featureSection = '';
    await inquirer.prompt(addItemPrompt('a feature list')).then((ans) => {
        newSection = ans.willAdd;
    });
    if(newSection){
        markdownContent += '##Features\n';
        await addAnotherPrompt(featurePrompt, 'another feature').then((featureArray) => {
            for (let i = 0; i < featureArray.length; i++) {
                markdownContent += `- ${featureArray[i]}\n`;
            }
        });
        newSection = false;
    }

    // let creditSection = '';
    await inquirer.prompt(addItemPrompt('a "credits" section')).then((ans) => {
        newSection = ans.willAdd;
    });
    if(newSection){
        markdownContent += '##Credit\n';
        await addAnotherPrompt(creditPrompt, 'another contributor or asset').then((creditArray) => {
            for (let i = 0; i < creditArray.length; i++) {
                markdownContent += `- ${creditArray[i]}\n`;
            }
        });
        newSection = false;
    }
    // let licenseSection
    await inquirer.prompt(licensePrompt).then((ans) => {
        if (!ans.license || (ans.license).toLowerCase() == 'n/a') {
            markdownContent += '';
        }
        else {
            markdownContent += '##License\n';
            markdownContent += `${ans.license}\n`;
        }
    });
    console.log(markdownContent);
};

generateReadme();

