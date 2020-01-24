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
        .then(async function (manageresponse) {
            var { managerName, managerId, managerEmail, managerOffice, engineers, interns } = manageresponse;
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


            let managerCard = fs.readFileSync('./templates/manger.html', 'utf8');
            managerCard = managerCard.replace('{{name}}', name);
            managerCard = managerCard.replace('{{id}}', id);
            managerCard = managerCard.replace('{{email}}', email);
            managerCard = managerCard.replace('{{officeNumber}}', officeNumber);
            managerCard = managerCard.replace('{{role}}', role);
            console.log(managerCard)

            var htmlEngineerArray = []
            for (i = 0; i < engineerArray.length; i++) {
                var { name, id, email, gitHub, role } = engineerArray[i];

                let engineerCard = fs.readFileSync('./templates/manger.html', 'utf8');
                engineerCard = engineerCard.replace('{{name}}', name);
                engineerCard = engineerCard.replace('{{id}}', id);
                engineerCard = engineerCard.replace('{{email}}', email);
                engineerCard = engineerCard.replace('{{github}}', gitHub);
                engineerCard = engineerCard.replace('{{role}}', role);
                htmlEngineerArray.push(engineerCard)
            }

            var htmlInternArray = []
            for (i = 0; i < internArray.length; i++) {
                var { name, id, email, gitHub, school } = internArray[i];

                let internCard = fs.readFileSync('./templates/manger.html', 'utf8');
                internCard = internCard.replace('{{name}}', name);
                internCard = internCard.replace('{{id}}', id);
                internCard = internCard.replace('{{email}}', email);
                internCard = internCard.replace('{{school}}', school);
                internCard = internCard.replace('{{role}}', role);
                htmlInternArray.push(internCard)

            }
            let mainHtml = fs.readFileSync('./templates/index.html', 'utf8');
            mainHtml = mainHtml.replace('{{manager}}', managerCard);
            mainHtml = mainHtml.replace('{{engineers}}', htmlEngineerArray);
            mainHtml = mainHtml.replace('{{interns}}', htmlInternArray);

            fs.writeFileSync('.outputs.html', mainHtml);


        });

}
makeTeam();
