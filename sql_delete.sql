DELETE e, f FROM Employer e, Fundraising f
    WHERE f.moneyraised < 1 AND e.name = f.individualname;
DELETE FROM Individual WHERE willingtogive > 100000.0;
