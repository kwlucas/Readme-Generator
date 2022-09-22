# ReadMe Generator
> Allow a user to easily create a professional looking read me for their applications and/or projects.
## Preview

<figure class="video_container">
  <video controls="true" allowfullscreen="true">
    <source src="./assets/images/appDemo.webm" type="video/webm">
  </video>
</figure>

[Application Demo (Google Drive)](https://drive.google.com/file/d/1oF48c7s5a30nvXIF_vTw-xJvM9GiiouU/view?usp=sharing)

## Set Up
- Download the "package.json" and "index.js" files from the repository
- Ensure that the files are located in the root directory of your project
- Ensure that you have all the necessary packages/node_modules

## Usage
- Using node run the "index.js" file
- Respond to the prompts given in the command line.
- Once you have finished responding to the prompts a new 'README.md" file will be generated in the root directory
> Note: Generating a readme file will overwrite any existing readme file. If you wish to save a pre-existing readme file, rename it so that its name is not "README.md".

## Features
- Prompts the user for the title of the project/application
- Prompts the user for a description of and motivation behind the project/application
- Prompts the user for whether or not a highlight section should be included in the readme
    - If a highlight section is desired the application will prompt the user for features of their project/application to put in the highlight section
    - After prompting for a highlight feature the application will prompt the user for whether or not they would like to add another highlight feature to the list
- Prompts the user for whether or not a placeholder section for a preview should be added to the readme
- Prompts the user for whether or not setup/installation instructions should be added to the readme
    - If setup/installation instructions are desired the application will prompt the user for the instructions
- Prompts the user for whether or not usage directions should be added to the readme
    - If usage directions are desired the application will prompt the user for the directions
- Prompts the user for whether or not a feature list should be included in the readme
    - If a feature section is desired the application will prompt the user for features of their project/application
    - After prompting for a feature the application will prompt the user for whether or not they would like to add another highlight feature to the list
- Prompts the user for whether or not a credit list should be included in the readme
    - If a feature section is desired the application will prompt the user for contributors of the project/application
    - After prompting for a contributor the application will prompt the user for whether or not they would like to add another to the credit list
- Prompts the user for a message to place in the license section
    - If the response is "N/A" or is left blank there will be no license section on the readme
- Creates a properly formatted markdown readme file populated with the user provided responses

## Required Packages
- Inquirer (node package)
