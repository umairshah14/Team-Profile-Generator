const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let employeeArr = []
// TODO: Write Code to gather information about the development team members, and render the HTML file.

// prompt series of questions for user

const promptAddMore = () => 
    inquirer
        .prompt([
        {
        type: "list",
        name: "Roles",
        message: "Please select one of the following options: ",
        choices: ["Add an Engineer", "Add an Intern", "Finish building the team"],
        }
    ])

const promptUser = () =>
    inquirer
        .prompt([
            {
                type: "input",
                name: "ManagerName",
                message: "Enter Manager name",
            },
            {
                type: "input",
                name: "ManagerID",
                message: "Enter Manager ID",
            },
            {
                type: "input",
                name: "ManagerEmail",
                message: "Enter Manager Email Address",
            },
            {
                type: "input",
                name: "ManagerNumber",
                message: "Enter Manager Office Number",
            },
        ])
        .then((answers) => {
            employeeArr.push(new Manager(answers.ManagerName, answers.ManagerID, answers.ManagerEmail, answers.ManagerNumber))
            promptAddMore().then((answer) => {
                AdditionalQuestions(answer.Roles)
            })
        })

const AdditionalQuestions = (Roles) => {
    switch (Roles) {
        case "Add an Engineer":
            const promptUserEngineer = () =>
                inquirer
                .prompt([
                        {
                            type: "input",
                            name: "EngineerName",
                            message: "Enter Engineer name",
                        },
                        {
                            type: "input",
                            name: "EngineerID",
                            message: "Enter Engineer ID",
                        },
                        {
                            type: "input",
                            name: "EngineerEmail",
                            message: "Enter Engineer Email Address",
                        },
                        {
                            type: "input",
                            name: "EngineerGithub",
                            message: "Enter Engineer Github username",
                        },
                        
                ])
                promptUserEngineer().then((answers) => {
                    employeeArr.push(new Engineer(answers.EngineerName, answers.EngineerID, answers.EngineerEmail, answers.EngineerGithub))
                    promptAddMore().then((answer) => {
                        AdditionalQuestions(answer.Roles)
                    })        
                })
                break
        case "Add an Intern":
            const promptUserIntern = () =>
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "InternName",
                        message: "Enter Intern name",
                    },
                    {
                        type: "input",
                        name: "InternID",
                        message: "Enter Intern ID",
                    },
                    {
                        type: "input",
                        name: "InternEmail",
                        message: "Enter Intern Email Address",
                    },
                    {
                        type: "input",
                        name: "InternSchool",
                        message: "Enter Intern's school",
                    },
                ])
                promptUserIntern().then((answers) => {
                    employeeArr.push(new Intern(answers.InternName, answers.InternID, answers.InternEmail, answers.InternSchool))
                    promptAddMore().then((answer) => {
                        AdditionalQuestions(answer.Roles)
                    })        
                })
                break
        case "Finish building the team":
            renderPage(employeeArr)
            return
    }
}

const renderPage = () =>{
    const indexPage = render(employeeArr)
                
    fs.writeFile(outputPath, indexPage, (err) => {
        if (err) {
          console.log("Could not generate file");
        } else {
          console.log("Success: New HTML file generated inside 'output' folder.");
        }
      });
}


promptUser()

