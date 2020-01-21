const inquirer = require("inquirer");
const employee = require("./lib/employee.js")

// const fs = require("fs");
// const generateHTML = require("generateHTML.js")
const managerQuestions = [
    {
        type: "input",
        message: "Hello. You are the manager of a new software engineering team. What is your name?",
        name: "managerName",
        // validate: confirmName()
    },
    {
        type: "number",
        message: "What is the manager's ID?",
        name: "managerId",
        // validate: confirmNumber()
    },
    {
        type: "input",
        message: "What is the manager's email address?",
        name: "managerEmail",
        // validate: confirmEmail()
    },
    {
        type: "number",
        message: "What is the manager's office number?",
        name: "managerOffice",
        // validate: confirmOfficeNumber()
    },
    {
        type: "number",
        message: "How many engineers are a part of this team?",
        name: "engineers",
        // validate: confirmEngineersNum()
    },
    {
        type: "number",
        message: "How many interns are a part of this team?",
        name: "interns",
        // validate: confirmInternsNum()
    }
]

inquirer
    .prompt(managerQuestions)
    .then(async function (managerResponse) {
        let makeManager = new employee.Employee(managerResponse);

        // console.log(managerResponse)
        // console.log(managerResponse.engineers)
    //     let NumOfEngineers = managerResponse.engineers;
    //     let NumOfInterns = managerResponse.interns;
    //     console.log(NumOfEngineers);
    //     for (i = 0; i < NumOfEngineers; i++) {
    //         await inquirer
    //             .prompt([
    //                 {
    //                     type: "input",
    //                     message: `What is engineer ${i + 1}'s name?`,
    //                     name: "engineerName"
    //                 },
    //                 {
    //                     type: "number",
    //                     message: `What is engineer ${i + 1}'s ID?`,
    //                     name: "engineerId"
    //                 },
    //                 {
    //                     type: "input",
    //                     message: `What is engineer ${i + 1}'s email?`,
    //                     name: "engineerEmail"
    //                 },
    //                 {
    //                     type: "input",
    //                     message: `What is engineer ${i + 1}'s github username?`,
    //                     name: "engineerGithub"
    //                 }
    //             ])
    //             .then(function (engineerResponse) {
    //                 console.log(engineerResponse)
    //             })
    //     };
    //     for (j = 0; j < NumOfInterns; j++) {
    //         await inquirer
    //             .prompt([
    //                 {
    //                     type: "input",
    //                     message: `What is intern ${j + 1}'s name?`,
    //                     name: "internName"
    //                 },
    //                 {
    //                     type: "number",
    //                     message: `What is intern ${j + 1}'s ID?`,
    //                     name: "internId"
    //                 },
    //                 {
    //                     type: "input",
    //                     message: `What is intern ${j + 1}'s email?`,
    //                     name: "internEmail"
    //                 },
    //                 {
    //                     type: "input",
    //                     message: `What is intern ${j + 1}'s school affiliation?`,
    //                     name: "internSchool"
    //                 }
    //             ])
    //     }
    });
// Use the Inquirer npm package to prompt the user for their email, id, and specific information based on their role with the company. For instance, an intern may provide their school, whereas an engineer may provide their GitHub username.