import mysql from "mysql";
import inquirer from "inquirer";

// MySQL connection configuration
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "voluntary_engagements",
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the MySQL database!");
    startCLI();
});

// Function to start the CLI
function startCLI() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "operation",
                message: "What operation would you like to perform?",
                choices: [
                    "Create a work",
                    "Add a task to a work",
                    "Assign a volunteer",
                    "Change a task",
                    "Change a work",
                    "Get total time of a work",
                    "Add/remove/change individual",
                    "Change volunteer details",
                    "Change money willing to give",
                    "Change university requirements",
                    "Get all volunteers",
                    "Get all individuals",
                    "Get all universities",
                    "Get all employers",
                    "Get all voluntary works",
                    "Get all tasks",
                    "Get all fundraising relationships",
                    "Get all giving grants relationships",
                    "Get all studying relationships",
                    "Get all work owners",
                    "Get all assignments",
                    "Get work tasks",
                    "Get total time of all works a volunteer is assigned to",
                    "Get tasks done remotely",
                    "Exit",
                ],
            },
        ])
        .then((answers) => {
            switch (answers.operation) {
                // ... (existing cases)
                case "Get all volunteers":
                    getAllVolunteers();
                    break;
                case "Get all individuals":
                    getAllIndividuals();
                    break;
                case "Get all universities":
                    getAllUniversities();
                    break;
                case "Get all employers":
                    getAllEmployers();
                    break;
                case "Get all voluntary works":
                    getAllVoluntaryWorks();
                    break;
                case "Get all tasks":
                    getAllTasks();
                    break;
                case "Get all fundraising relationships":
                    getAllFundraisings();
                    break;
                case "Get all giving grants relationships":
                    getAllGivingGrants();
                    break;
                case "Get all studying relationships":
                    getAllStudyings();
                    break;
                case "Get all work owners":
                    getAllWorkOwners();
                    break;
                case "Get all assignments":
                    getAllAssignments();
                    break;
                case "Create a work":
                    createWork();
                    break;
                case "Add a task to a work":
                    addTaskToWork();
                    break;
                case "Assign a volunteer":
                    assignVolunteer();
                    break;
                case "Change a task":
                    changeTask();
                    break;
                case "Change a work":
                    changeWork();
                    break;
                case "Get total time of a work":
                    getTotalTimeOfWork();
                    break;
                case "Add/remove/change individual":
                    addRemoveChangeIndividual();
                    break;
                case "Change volunteer details":
                    changeVolunteerDetails();
                    break;
                case "Change money willing to give":
                    changeMoneyWillingToGive();
                    break;
                case "Change university requirements":
                    changeUniversityRequirements();
                    break;
                case "Get work tasks":
                    getWorkTasks();
                    break;
                case "Get total time of all works a volunteer is assigned to":
                    getVolunteerTime();
                    break;
                case "Get tasks done remotely":
                    getTasksDoneRemotely();
                    break;
                case "Exit":
                    connection.end();
                    break;
                default:
                    console.log("Invalid operation");
                    startCLI();
            }
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}

// Function to create a work
function createWork() {
    inquirer
        .prompt([
            {
                name: "description",
                message: "Enter the work description:",
            },
            {
                name: "moneyNeeded",
                message: "Enter the amount of money needed for the work:",
            },
        ])
        .then((answers) => {
            // get max workid
            const getMaxWorkIdQuery = "SELECT MAX(workid) as maxWorkId FROM VoluntaryWork";
            connection.query(getMaxWorkIdQuery, (err, result) => {
                if (err) throw err;
                const maxWorkId = result[0].maxWorkId;
                const workId = maxWorkId ? maxWorkId + 1 : 1;
                const query =
                    "INSERT INTO VoluntaryWork (workid, status, description, money_needed) VALUES (?, ?, ?, ?)";
                connection.query(
                    query,
                    [workId, 0, answers.description, answers.moneyNeeded],
                    (err, result) => {
                        if (err) throw err;
                        console.log("Work created successfully!");
                        startCLI();
                    },
                );
            });
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}

// Function to add a task to a work
function addTaskToWork() {
    inquirer
        .prompt([
            {
                name: "workId",
                message: "Enter the work ID:",
            },
            {
                name: "description",
                message: "Enter the task description:",
            },
            {
                name: "location",
                message: "Enter the task location:",
            },
            {
                name: "timeStart",
                message: "Enter the task start time (in seconds since 1970):",
            },
            {
                name: "timeEnd",
                message: "Enter the task end time (in seconds since 1970):",
            },
        ])
        .then((answers) => {
            // get max taskno
            const getMaxTaskNoQuery = "SELECT MAX(taskno) as maxTaskNo FROM Task WHERE workid = ?";
            connection.query(getMaxTaskNoQuery, [answers.workId], (err, result) => {
                if (err) throw err;
                const maxTaskNo = result[0].maxTaskNo;
                const taskNo = maxTaskNo ? maxTaskNo + 1 : 1;
                const query =
                    "INSERT INTO Task (taskno, workid, description, location, time_start, time_end) VALUES (?, ?, ?, ?, ?, ?)";
                connection.query(
                    query,
                    [
                        taskNo,
                        answers.workId,
                        answers.description,
                        answers.location,
                        answers.timeStart,
                        answers.timeEnd,
                    ],
                    (err, result) => {
                        if (err) throw err;
                        console.log("Task added successfully!");
                        startCLI();
                    },
                );
            });
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}

// Function to assign a volunteer
function assignVolunteer() {
    inquirer
        .prompt([
            {
                name: "volunteerName",
                message: "Enter the volunteer name:",
            },
            {
                name: "workId",
                message: "Enter the work ID:",
            },
        ])
        .then((answers) => {
            const query =
                "INSERT INTO Assigning (volunteer_name, workid) VALUES (?, ?)";
            connection.query(
                query,
                [answers.volunteerName, answers.workId],
                (err, result) => {
                    if (err) throw err;
                    console.log("Volunteer assigned successfully!");
                    startCLI();
                },
            );
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}

// Function to change a task
function changeTask() {
    inquirer
        .prompt([
            {
                name: "taskNo",
                message: "Enter the task number:",
            },
            {
                name: "workId",
                message: "Enter the work ID:",
            },
            {
                name: "newDescription",
                message:
                    "Enter the new task description (or leave blank to keep the current one):",
            },
            {
                name: "newLocation",
                message:
                    "Enter the new task location (or leave blank to keep the current one):",
            },
            {
                name: "newTimeStart",
                message:
                    "Enter the new task start time (in seconds since 1970) (or leave blank to keep the current one):",
            },
            {
                name: "newTimeEnd",
                message:
                    "Enter the new task end time (in seconds since 1970) (or leave blank to keep the current one):",
            },
        ])
        .then((answers) => {
            const query =
                "UPDATE Task SET description = COALESCE(?, description), location = COALESCE(?, location), time_start = COALESCE(?, time_start), time_end = COALESCE(?, time_end) WHERE taskno = ? AND workid = ?";
            connection.query(
                query,
                [
                    answers.newDescription || null,
                    answers.newLocation || null,
                    answers.newTimeStart || null,
                    answers.newTimeEnd || null,
                    answers.taskNo,
                    answers.workId,
                ],
                (err, result) => {
                    if (err) throw err;
                    console.log("Task updated successfully!");
                    startCLI();
                },
            );
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}

// Function to change a work
function changeWork() {
    inquirer
        .prompt([
            {
                name: "workId",
                message: "Enter the work ID:",
            },
            {
                name: "newDescription",
                message:
                    "Enter the new work description (or leave blank to keep the current one):",
            },
            {
                name: "newMoneyNeeded",
                message:
                    "Enter the new amount of money needed for the work (or leave blank to keep the current one):",
            },
            {
                name: "newStatus",
                message:
                    "Enter the new work status (or leave blank to keep the current one):",
            },
        ])
        .then((answers) => {
            const query =
                "UPDATE VoluntaryWork SET description = COALESCE(?, description), money_needed = COALESCE(?, money_needed), status = COALESCE(?, status) WHERE workid = ?";
            connection.query(
                query,
                [
                    answers.newDescription || null,
                    answers.newMoneyNeeded || null,
                    answers.newStatus || null,
                    answers.workId,
                ],
                (err, result) => {
                    if (err) throw err;
                    console.log("Work updated successfully!");
                    startCLI();
                },
            );
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}

// Function to get the total time of a work
function getTotalTimeOfWork() {
    inquirer
        .prompt([
            {
                name: "workId",
                message: "Enter the work ID:",
            },
        ])
        .then((answers) => {
            const query = "SELECT time_to_spend FROM WorkTime WHERE workid = ?";
            connection.query(query, [answers.workId], (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    console.log("No work found with the given ID.");
                } else {
                    const totalTime = result[0].time_to_spend;
                    console.log(
                        `Total time needed for the work: ${totalTime} seconds`,
                    );
                }
                startCLI();
            });
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}

// Function to add, remove, or change an individual
function addRemoveChangeIndividual() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "operation",
                message: "What operation would you like to perform?",
                choices: [
                    "Add individual",
                    "Remove individual",
                    "Change individual",
                ],
            },
            {
                name: "individualName",
                message: "Enter the individual name:",
            },
            {
                name: "individualGiving",
                message:
                    "Enter the amount of money the individual is giving (or leave blank for removal):",
                when: (answers) => answers.operation !== "Remove individual",
            },
            {
                name: "volunteerName",
                message:
                    "Enter the volunteer name (or leave blank for no volunteer):",
                when: (answers) => answers.operation !== "Remove individual",
            },
        ])
        .then((answers) => {
            switch (answers.operation) {
                case "Add individual":
                    const addQuery =
                        "INSERT INTO Individual (name, giving) VALUES (?, ?)";
                    connection.query(
                        addQuery,
                        [answers.individualName, answers.individualGiving],
                        (err, result) => {
                            if (err) throw err;
                            if (answers.volunteerName) {
                                const addFundraisingQuery =
                                    "INSERT INTO Fundraising (volunteer_name, individual_name) VALUES (?, ?)";
                                connection.query(
                                    addFundraisingQuery,
                                    [
                                        answers.volunteerName,
                                        answers.individualName,
                                    ],
                                    (err, result) => {
                                        if (err) throw err;
                                        console.log(
                                            "Individual added successfully!",
                                        );
                                        startCLI();
                                    },
                                );
                            } else {
                                console.log("Individual added successfully!");
                                startCLI();
                            }
                        },
                    );
                    break;
                case "Remove individual":
                    const removeQuery = "DELETE FROM Individual WHERE name = ?";
                    connection.query(
                        removeQuery,
                        [answers.individualName],
                        (err, result) => {
                            if (err) throw err;
                            console.log("Individual removed successfully!");
                            startCLI();
                        },
                    );
                    break;
                case "Change individual":
                    const changeQuery =
                        "UPDATE Individual SET giving = ? WHERE name = ?";
                    connection.query(
                        changeQuery,
                        [answers.individualGiving, answers.individualName],
                        (err, result) => {
                            if (err) throw err;
                            console.log("Individual updated successfully!");
                            startCLI();
                        },
                    );
                    break;
            }
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}
// Function to change volunteer details
function changeVolunteerDetails() {
    inquirer
        .prompt([
            {
                name: "volunteerName",
                message: "Enter the volunteer name:",
            },
            {
                name: "newMoneyAvailable",
                message:
                    "Enter the new amount of money available for the volunteer (or leave blank to keep the current value):",
            },
            {
                name: "newTimeAvailable",
                message:
                    "Enter the new amount of time available for the volunteer (in seconds) (or leave blank to keep the current value):",
            },
            {
                name: "newStypendiynaHodynasComplete",
                message:
                    "Enter the new number of stypendiyna hodynas completed by the volunteer (or leave blank to keep the current value):",
            },
            {
                name: "newUniversityName",
                message:
                    "Enter the new university name for the volunteer (or leave blank to keep the current one):",
            },
        ])
        .then((answers) => {
            const query =
                "UPDATE Volunteer SET money_available = COALESCE(?, money_available), time_available = COALESCE(?, time_available), stypendiyna_hodynas_done = COALESCE(?, stypendiyna_hodynas_done) WHERE name = ?";
            connection.query(
                query,
                [
                    answers.newMoneyAvailable || null,
                    answers.newTimeAvailable || null,
                    answers.newStypendiynaHodynasComplete || null,
                    answers.volunteerName,
                ],
                (err, result) => {
                    if (err) throw err;
                    if (answers.newUniversityName) {
                        const updateStudyingQuery =
                            "UPDATE Studying SET university_name = ? WHERE volunteer_name = ?";
                        connection.query(
                            updateStudyingQuery,
                            [answers.newUniversityName, answers.volunteerName],
                            (err, result) => {
                                if (err) throw err;
                                console.log(
                                    "Volunteer details updated successfully!",
                                );
                                startCLI();
                            },
                        );
                    } else {
                        console.log("Volunteer details updated successfully!");
                        startCLI();
                    }
                },
            );
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}
// Function to change money willing to give
function changeMoneyWillingToGive() {
    inquirer
        .prompt([
            {
                name: "employerName",
                message: "Enter the employer name:",
            },
            {
                name: "newMoneyToGive",
                message:
                    "Enter the new amount of money the employer is willing to give:",
            },
        ])
        .then((answers) => {
            const query =
                "UPDATE Employer SET money_to_give = ? WHERE name = ?";
            connection.query(
                query,
                [answers.newMoneyToGive, answers.employerName],
                (err, result) => {
                    if (err) throw err;
                    console.log("Money willing to give updated successfully!");
                    startCLI();
                },
            );
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}
// Function to change university requirements
function changeUniversityRequirements() {
    inquirer
        .prompt([
            {
                name: "universityName",
                message: "Enter the university name:",
            },
            {
                name: "newStypendiynaHodynasRequired",
                message:
                    "Enter the new number of stypendiyna hodynas required:",
            },
        ])
        .then((answers) => {
            const query =
                "UPDATE University SET stypendiyna_hodynas_required = ? WHERE name = ?";
            connection.query(
                query,
                [answers.newStypendiynaHodynasRequired, answers.universityName],
                (err, result) => {
                    if (err) throw err;
                    console.log(
                        "University requirements updated successfully!",
                    );
                    startCLI();
                },
            );
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}

// Function to get all volunteers
function getAllVolunteers() {
    const query = "SELECT * FROM Volunteer";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("All volunteers:");
        console.table(result);
        startCLI();
    });
}

// Function to get all individuals
function getAllIndividuals() {
    const query = "SELECT * FROM Individual";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("All individuals:");
        console.table(result);
        startCLI();
    });
}

// Function to get all universities
function getAllUniversities() {
    const query = "SELECT * FROM University";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("All universities:");
        console.table(result);
        startCLI();
    });
}

// Function to get all employers
function getAllEmployers() {
    const query = "SELECT * FROM Employer";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("All employers:");
        console.table(result);
        startCLI();
    });
}

// Function to get all voluntary works
function getAllVoluntaryWorks() {
    const query = "SELECT * FROM VoluntaryWork";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("All voluntary works:");
        console.table(result);
        startCLI();
    });
}

// Function to get all tasks
function getAllTasks() {
    const query = "SELECT * FROM Task";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("All tasks:");
        console.table(result);
        startCLI();
    });
}

// Function to get all fundraising relationships
function getAllFundraisings() {
    const query = "SELECT * FROM Fundraising";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("All fundraising relationships:");
        console.table(result);
        startCLI();
    });
}

// Function to get all giving grants relationships
function getAllGivingGrants() {
    const query = "SELECT * FROM GivingGrants";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("All giving grants relationships:");
        console.table(result);
        startCLI();
    });
}

// Function to get all studying relationships
function getAllStudyings() {
    const query = "SELECT * FROM Studying";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("All studying relationships:");
        console.table(result);
        startCLI();
    });
}

// Function to get all work owners
function getAllWorkOwners() {
    const query = "SELECT * FROM WorkOwner";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("All work owners:");
        console.table(result);
        startCLI();
    });
}

// Function to get all assignments
function getAllAssignments() {
    const query = "SELECT * FROM Assigning";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("All assignments:");
        console.table(result);
        startCLI();
    });
}

function getWorkTasks() {
    inquirer
        .prompt([
            {
                name: "workId",
                message: "Enter the work ID:",
            },
        ])
        .then((answers) => {
            const query = "SELECT * FROM Task WHERE workid = ?";
            connection.query(query, [answers.workId], (err, result) => {
                if (err) throw err;
                console.log("Tasks for the work:");
                console.table(result);
                startCLI();
            });
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}

// get total time of all works a volunteer is assigned to
function getVolunteerTime() {
    inquirer
        .prompt([
            {
                name: "volunteerName",
                message: "Enter the volunteer name:",
            },
        ])
        .then((answers) => {
            const query =
                "SELECT SUM(time_end - time_start) as totalTime FROM Task WHERE workid IN (SELECT workid FROM Assigning WHERE volunteer_name = ?)";
            connection.query(query, [answers.volunteerName], (err, result) => {
                if (err) throw err;
                console.log(
                    `Total time of all works the volunteer is assigned to: ${result[0].totalTime} seconds`,
                );
                startCLI();
            });
        })
        .catch((error) => {
            console.error(error);
            startCLI();
        });
}

// get tasks done remotely
function getTasksDoneRemotely() {
    const query = "SELECT * FROM Task WHERE location = 'remote'";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("Tasks done remotely:");
        console.table(result);
        startCLI();
    });
}
