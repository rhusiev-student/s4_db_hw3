CREATE TABLE IF NOT EXISTS University (
    name VARCHAR(60) NOT NULL PRIMARY KEY,
    stypendiynahodynasneeded FLOAT -- In hours
);
CREATE TABLE IF NOT EXISTS Employer (
    name VARCHAR(60) NOT NULL PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS Organization (
    name VARCHAR(60) NOT NULL,
    INDEX (name),
    FOREIGN KEY
        (name) REFERENCES Employer (name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (name)
);
CREATE TABLE IF NOT EXISTS Volunteer (
    canspendtime INT NOT NULL, -- In seconds
    name VARCHAR(60) NOT NULL,
    INDEX (name),
    FOREIGN KEY
        (name) REFERENCES Employer (name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (name)
);
CREATE TABLE IF NOT EXISTS Individual (
    willingtogive FLOAT NOT NULL, -- In $
    name VARCHAR(60) NOT NULL,
    INDEX (name),
    FOREIGN KEY
        (name) REFERENCES Employer (name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (name)
);
CREATE TABLE IF NOT EXISTS VoluntaryWork (
    workid INT NOT NULL PRIMARY KEY,
    INDEX (workid),
    workdescription VARCHAR(200),
    moneyneeded FLOAT NOT NULL -- In $
);
CREATE TABLE IF NOT EXISTS TimePeriod (
    timestart INT NOT NULL, -- In seconds since 1970 (UNIX time)
    timeend INT NOT NULL, -- In seconds since 1970 (UNIX time)
    workid INT NOT NULL,
    PRIMARY KEY (timestart, timeend, workid),
    FOREIGN KEY
        (workid) REFERENCES VoluntaryWork (workid)
);
CREATE VIEW IF NOT EXISTS WorkTime AS
SELECT
    VoluntaryWork.workid,
    SUM(TimePeriod.timeend - TimePeriod.timestart) AS timetospend
FROM
    VoluntaryWork
    LEFT JOIN TimePeriod ON VoluntaryWork.workid = TimePeriod.workid
GROUP BY
    VoluntaryWork.workid;
CREATE TABLE IF NOT EXISTS Task (
    location VARCHAR(60) NOT NULL,
    taskno INT NOT NULL,
    workid INT NOT NULL,
    PRIMARY KEY (taskno, workid),
    FOREIGN KEY
        (workid) REFERENCES VoluntaryWork (workid)
);
CREATE TABLE IF NOT EXISTS Studying (
    volunteername VARCHAR(60) NOT NULL,
    universityname VARCHAR(60) NOT NULL,
    PRIMARY KEY (volunteername, universityname),
    FOREIGN KEY
        (volunteername) REFERENCES Volunteer (name),
    FOREIGN KEY
        (universityname) REFERENCES University (name)
);
CREATE TABLE IF NOT EXISTS GivingGrants (
    organizationname VARCHAR(60) NOT NULL,
    volunteername VARCHAR(60) NOT NULL,
    moneygiven FLOAT NOT NULL, -- In $
    PRIMARY KEY (organizationname, volunteername),
    FOREIGN KEY
        (organizationname) REFERENCES Organization (name),
    FOREIGN KEY
        (volunteername) REFERENCES Volunteer (name)
);
CREATE TABLE IF NOT EXISTS Fundraising (
    volunteername VARCHAR(60) NOT NULL,
    individualname VARCHAR(60) NOT NULL,
    moneyraised FLOAT NOT NULL, -- In $
    PRIMARY KEY (volunteername, individualname),
    FOREIGN KEY
        (volunteername) REFERENCES Volunteer (name),
    FOREIGN KEY
        (individualname) REFERENCES Individual (name)
);
CREATE TABLE IF NOT EXISTS DoingWorkFor (
    volunteername VARCHAR(60) NOT NULL,
    employername VARCHAR(60) NOT NULL,
    workid INT NOT NULL,
    PRIMARY KEY (volunteername, employername, workid),
    FOREIGN KEY
        (volunteername) REFERENCES Volunteer (name),
    FOREIGN KEY
        (employername) REFERENCES Employer (name),
    FOREIGN KEY
        (workid) REFERENCES VoluntaryWork (workid)
);
