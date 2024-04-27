ALTER TABLE Volunteer
ADD money_available FLOAT;
ALTER TABLE Volunteer
ADD stypendiyna_hodynas_done FLOAT;
ALTER TABLE Volunteer
RENAME COLUMN canspendtime TO time_available;

DROP TABLE IF EXISTS DoingWorkFor;
CREATE TABLE IF NOT EXISTS WorkOwner (
    workid INT NOT NULL,
    employername VARCHAR(50) NOT NULL,
    PRIMARY KEY (workid, employername),
    FOREIGN KEY
        (workid) REFERENCES VoluntaryWork (workid),
    FOREIGN KEY
        (employername) REFERENCES Employer (name)
);

ALTER TABLE VoluntaryWork
ADD status INT;
ALTER TABLE VoluntaryWork
RENAME COLUMN workdescription TO description;
ALTER TABLE VoluntaryWork
RENAME COLUMN moneyneeded TO money_needed;

CREATE TABLE IF NOT EXISTS Assigning (
    volunteer_name VARCHAR(50) NOT NULL,
    workid INT NOT NULL,
    PRIMARY KEY (volunteer_name, workid),
    FOREIGN KEY
        (volunteer_name) REFERENCES Volunteer (name),
    FOREIGN KEY
        (workid) REFERENCES VoluntaryWork (workid)
);

DROP TABLE IF EXISTS TimePeriod;
ALTER TABLE Task
ADD description VARCHAR(200);
ALTER TABLE Task
ADD time_start INT;
ALTER TABLE Task
ADD time_end INT;

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

DROP TABLE IF EXISTS Organization;

ALTER TABLE Fundraising
DROP COLUMN moneyraised;
ALTER TABLE Fundraising
RENAME COLUMN volunteername to volunteer_name;
ALTER TABLE Fundraising
RENAME COLUMN individualname to individual_name;

ALTER TABLE Employer
ADD COLUMN money_to_give FLOAT;

ALTER TABLE Individual
RENAME COLUMN willingtogive TO giving;

ALTER TABLE Studying
RENAME COLUMN volunteername TO volunteer_name;
ALTER TABLE Studying
RENAME COLUMN universityname TO university_name;

ALTER TABLE University
RENAME COLUMN stypendiynahodynasneeded TO stypendiyna_hodynas_required;
