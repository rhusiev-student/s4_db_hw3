INSERT INTO Individual VALUES (50.0, 'radomyr husiev');
INSERT INTO VoluntaryWork (workid, workdescription, moneyneeded) VALUES (4, 'Sort humanitarian aid', 0.0);
INSERT INTO Task (location, taskno, workid) VALUES ('Warehouse', 0, 4);
INSERT INTO TimePeriod (timestart, timeend, workid) VALUES (1713632400, 1713646800, 4);
REPLACE INTO Individual (willingtogive, name) VALUES (42.0, 'radomyr husiev');
