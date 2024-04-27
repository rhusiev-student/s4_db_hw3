SELECT organizationname AS name, moneygiven AS money FROM GivingGrants
    UNION
    SELECT individualname AS name, moneyraised AS money FROM Fundraising;
