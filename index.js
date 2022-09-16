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
        validate: (ans) => { //verify that a response was entered.
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
        validate: (ans) => { //verify that a response was entered.
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

//prompt for highlight feature
const highlightFeaturePrompt = {
    type: 'input',
    name: 'highlightFeature',
    message: 'What is a highlight feature of your project/application?',
    validate: (ans) => { //verify that a response was entered.
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

//prompt for set up instructions
const setUpPrompt = {
    type: 'input',
    name: 'installInstructions',
    message: 'Write out the instructions for setting up or installing your project/application. (To make a line break add "[br]")',
    validate: (ans) => { //verify that a response was entered.
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

//prompt for usage directions
const usagePrompt = {
    type: 'input',
    name: 'usageDirections',
    message: 'Write out the directions for using your project/application. (To make a line break add "[br]")',
    validate: (ans) => {//verify that a response was entered.
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
    validate: (ans) => {//verify that a response was entered.
        if (ans) {
            return true;
        }
        else {
            return 'Please enter a valid feature of your project/application.';
        }
    }
};
//ADD another feature?
//YES loop pro[br]
//NO continue

//Prompt for credit
const creditPrompt = {
    type: 'input',
    name: 'credit',
    message: 'What contributor or asset do you want give credit to? (Include links if needed)',
    validate: (ans) => {//verify that a response was entered.
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

//function that will return a prompt asking if the user would like to add the passed item in the readme.
function addItemPrompt(item) {
    const itemPrompt = {
        type: 'confirm',
        name: 'willAdd',
        message: `Do you want to add ${item} to the readme?`,
        default: false
    };
    return itemPrompt;
};

//function that will ask if someone wants to add another of the passed item and if yes it will prompt them to eneter another item
async function addAnotherPrompt(repeatPrompt, item, itemsToAdd = []) {
    const itemPrompt = {
        type: 'confirm',
        name: 'addAnother',
        message: `Do you want to add ${item} to the list?`,
        default: true
    }
    const dataName = repeatPrompt.name;
    const questions = [repeatPrompt, itemPrompt];
    let askAgain = true;
    //ask user if they want to add another ITEM
    await inquirer.prompt(questions).then((ans) => {
        askAgain = ans.addAnother;
        itemsToAdd.push(ans[`${dataName}`]); //saves the previous response in array
    });
    if(askAgain){
        //runs the function again if the user responded yes to adding another
        return await addAnotherPrompt(repeatPrompt, item, itemsToAdd);
    }
    else {
        //exits the function and returns the array of responses
        return itemsToAdd;
    }
}

//take answers and plug them in to MD timeplate literals and write file
async function generateReadme() {
    let markdownContent = '';
    let newSection = false;
    //ask the basic info prompts
    await inquirer.prompt(basicInfoPrompts).then((ans) => {
        const { title, description } = ans;
        //Add responses in markdown format to the "markdownContent" string
        markdownContent += `# ${title}\n> ${description}\n`;
    });

    //Ask the user if they would like to add a highlight feature list to the read me
    await inquirer.prompt(addItemPrompt('a highlight feature list')).then((ans) => {
        newSection = ans.willAdd;
    });
    if (newSection) {
        //Add the header for the highlight feature section
        markdownContent += '## Highlight Features\n';
        //Ask the user the highlight feature prompt before asking them if they would like to add another then repeat if yes
        await addAnotherPrompt(highlightFeaturePrompt, 'another highlight feature').then((highlightArray) => {
            //Add all the responses in markdown format to the "markdownContent" string
            for (let i = 0; i < highlightArray.length; i++) {
                markdownContent += `- ${highlightArray[i]}\n`;
            }
        });
        //Reset the newSection bool
        newSection = false;
    }

    //Ask the user if they would like to add a section for a preview image in the readme
    await inquirer.prompt(addItemPrompt('a placeholder section for a preview image')).then((ans) => {
        if (ans.willAdd) {
            //Add the header for the preview section
            markdownContent += '## Preview\n';
        }
    });

    //Ask the user if they would like to add setup instructions to the read me
    await inquirer.prompt(addItemPrompt('setup/installation instructions')).then((ans) => {
        newSection = ans.willAdd;
    });
    
    if(newSection) {
        //Ask the setupInstructions prompt
        await inquirer.prompt(setUpPrompt).then((answer) => {
            //Add the setup instructions response to the "markdownContent" string in markdown format
            markdownContent += `## Setup\n${answer.installInstructions}\n`;
        });
        newSection = false;
    }

    //Ask the user if they would like to add usage directions to the read me
    await inquirer.prompt(addItemPrompt('usage directions')).then((ans) => {
        newSection = ans.willAdd;
    });
    if(newSection){
        //Ask the usageInstructions prompt
        await inquirer.prompt(usagePrompt).then((answer) => {
            //Add the setup instructions response to the "markdownContent" string in markdown format
            markdownContent += `## Usage\n${answer.usageDirections}\n`;
        });
        newSection = false;
    }

    //Ask the user if they would like to add a feature list to the read me
    await inquirer.prompt(addItemPrompt('a feature list')).then((ans) => {
        newSection = ans.willAdd;
    });
    if(newSection){
        //Add the header for the feature section
        markdownContent += '## Features\n';
        //Ask the user the feature prompt before asking them if they would like to add another then repeat if yes
        await addAnotherPrompt(featurePrompt, 'another feature').then((featureArray) => {
            //Add all the responses in markdown format to the "markdownContent" string
            for (let i = 0; i < featureArray.length; i++) {
                markdownContent += `- ${featureArray[i]}\n`;
            }
        });
        newSection = false;
    }

    //Ask the user if they would like to add a credit section to the read me
    await inquirer.prompt(addItemPrompt('a "credits" section')).then((ans) => {
        newSection = ans.willAdd;
    });
    if(newSection){
        //Add the header for the credit section
        markdownContent += '## Credit\n';
        //Ask the user the credit prompt before asking them if they would like to add another then repeat if yes
        await addAnotherPrompt(creditPrompt, 'another contributor or asset').then((creditArray) => {
            for (let i = 0; i < creditArray.length; i++) {
                //Add all the responses in markdown format to the "markdownContent" string
                markdownContent += `- ${creditArray[i]}\n`;
            }
        });
        newSection = false;
    }
    // let licenseSection
    await inquirer.prompt(licensePrompt).then((ans) => {
        if (!ans.license || (ans.license).toLowerCase() == 'n/a') {//check if the response was blank or "n/a"
            //Add nothing
            markdownContent += '';
        }
        else {
            //Add the License section header
            markdownContent += '## License\n';
            //Add the response in markdown format to the "markdownContent" string
            markdownContent += `${ans.license}\n`;
        }
    });

    //replace any "[br]"s in the "markdownContent" string with a markdown formatted newline characters (two or more spaced followed by newline)
    markdownContent = markdownContent.replace(/\[br\]/gi, `  \n`);
    //console.log(markdownContent);
    const fileName = 'README.md';
    fs.writeFile(fileName, markdownContent, (err) => {
        //conditional ternary operator for catching error
        err ? console.error(err) : console.log(`"${fileName}" has been written.`);
    })
};

generateReadme();

