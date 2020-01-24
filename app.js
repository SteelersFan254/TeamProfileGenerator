const inquirer = require("inquirer");
const Manager = require("./lib/manager.js")
const Engineer = require("./lib/engineer.js")
const Intern = require("./lib/intern.js")

const fs = require("fs");
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
async function makeTeam() {
    inquirer
        .prompt(managerQuestions)
        .then(async function (managerResponse) {
            var { managerName, managerId, managerEmail, managerOffice, engineers, interns } = managerResponse;
            let makeManager = new Manager(managerName, managerId, managerEmail, managerOffice);

            var engineerArray = [];
            for (i = 0; i < engineers; i++) {
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            message: `What is engineer ${i + 1}'s name?`,
                            name: "engineerName"
                        },
                        {
                            type: "number",
                            message: `What is engineer ${i + 1}'s ID?`,
                            name: "engineerId"
                        },
                        {
                            type: "input",
                            message: `What is engineer ${i + 1}'s email?`,
                            name: "engineerEmail"
                        },
                        {
                            type: "input",
                            message: `What is engineer ${i + 1}'s github username?`,
                            name: "engineerGithub"
                        }
                    ])
                    .then(function (engineerResponse) {

                        var { engineerName, engineerId, engineerEmail, engineerGitHub } = engineerResponse;

                        var makeEngineer = new Engineer(engineerName, engineerId, engineerEmail, engineerGitHub)

                        engineerArray.push(makeEngineer)
                    })
            };
            var internArray = []
            for (j = 0; j < interns; j++) {
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            message: `What is intern ${j + 1}'s name?`,
                            name: "internName"
                        },
                        {
                            type: "number",
                            message: `What is intern ${j + 1}'s ID?`,
                            name: "internId"
                        },
                        {
                            type: "input",
                            message: `What is intern ${j + 1}'s email?`,
                            name: "internEmail"
                        },
                        {
                            type: "input",
                            message: `What is intern ${j + 1}'s school affiliation?`,
                            name: "internSchool"
                        }
                    ]).then(function (internResponse) {
                        var { internName, internId, internEmail, internSchool } = internResponse;

                        var makeIntern = new Intern(internName, internId, internEmail, internSchool)

                        internArray.push(makeIntern)
                    })
            }
            // console.log(makeManager);
            // console.log(engineerArray);
            // console.log(internArray);
            var { name, id, email, officeNumber, role } = makeManager

            let mgrCard = fs.readFileSync('./templates/manger.html', 'utf8');
            mgrCard = mgrCard.replace('{{name}}', name);
            mgrCard = mgrCard.replace('{{id}}', id);
            mgrCard = mgrCard.replace('{{email}}', email);
            mgrCard = mgrCard.replace('{{officeNumber}}', officeNumber);
            mgrCard = mgrCard.replace('{{role}}', role);
            console.log(mgrCard)

        });

}
makeTeam();
