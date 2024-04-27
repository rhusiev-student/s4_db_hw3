CREATE TABLE IF NOT EXISTS University (
    name VARCHAR(50) NOT NULL PRIMARY KEY,
    stypendiyna_hodynas_required FLOAT -- In hours
);
CREATE TABLE IF NOT EXISTS Employer (
    name VARCHAR(50) NOT NULL PRIMARY KEY,
    money_to_give FLOAT
);
CREATE TABLE IF NOT EXISTS Volunteer (
    name VARCHAR(50) NOT NULL PRIMARY KEY,
    money_available FLOAT NOT NULL, -- In $
    time_available INT NOT NULL, -- In seconds
    stypendiyna_hodynas_done FLOAT -- In hours
);
CREATE TABLE IF NOT EXISTS Individual (
    name VARCHAR(50) NOT NULL PRIMARY KEY,
    giving FLOAT NOT NULL -- In $
);
CREATE TABLE IF NOT EXISTS Fundraising (
    volunteer_name VARCHAR(50) NOT NULL,
    individual_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (volunteer_name, individual_name),
    FOREIGN KEY
        (volunteer_name) REFERENCES Volunteer (name),
    FOREIGN KEY
        (individual_name) REFERENCES Individual (name)
);
CREATE TABLE IF NOT EXISTS VoluntaryWork (
    description VARCHAR(200) NOT NULL,
    status INT NOT NULL,
    money_needed FLOAT NOT NULL, -- In $
    workid INT NOT NULL PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS WorkOwner (
    workid INT NOT NULL,
    employername VARCHAR(50) NOT NULL,
    PRIMARY KEY (workid, employername),
    FOREIGN KEY
        (workid) REFERENCES VoluntaryWork (workid),
    FOREIGN KEY
        (employername) REFERENCES Employer (name)
);
CREATE TABLE IF NOT EXISTS Task (
    description VARCHAR(200) NOT NULL,
    location VARCHAR(50) NOT NULL,
    time_start Integer NOT NULL, -- In seconds since 1970
    time_end Integer NOT NULL, -- In seconds since 1970
    taskno INT NOT NULL,
    workid INT NOT NULL,
    PRIMARY KEY (taskno, workid),
    FOREIGN KEY
        (workid) REFERENCES VoluntaryWork (workid)
);
CREATE VIEW IF NOT EXISTS WorkTime AS
SELECT
    VoluntaryWork.workid,
    SUM(Task.time_end - Task.time_start) AS time_to_spend
FROM
    VoluntaryWork
    LEFT JOIN Task ON VoluntaryWork.workid = Task.workid
GROUP BY
    VoluntaryWork.workid;
CREATE TABLE IF NOT EXISTS Studying (
    volunteer_name VARCHAR(50) NOT NULL,
    university_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (volunteer_name, university_name),
    FOREIGN KEY
        (volunteer_name) REFERENCES Volunteer (name),
    FOREIGN KEY
        (university_name) REFERENCES University (name)
);
CREATE TABLE IF NOT EXISTS GivingGrants (
    employer_name VARCHAR(50) NOT NULL,
    volunteer_name VARCHAR(50) NOT NULL,
    money_given FLOAT NOT NULL, -- In $
    PRIMARY KEY (employer_name, volunteer_name),
    FOREIGN KEY
        (employer_name) REFERENCES Employer (name),
    FOREIGN KEY
        (volunteer_name) REFERENCES Volunteer (name)
);
CREATE TABLE IF NOT EXISTS Assigning (
    volunteer_name VARCHAR(50) NOT NULL,
    workid INT NOT NULL,
    PRIMARY KEY (volunteer_name, workid),
    FOREIGN KEY
        (volunteer_name) REFERENCES Volunteer (name),
    FOREIGN KEY
        (workid) REFERENCES VoluntaryWork (workid)
);
