SELECT volunteername FROM GivingGrants
    INTERSECT
    SELECT volunteername FROM Fundraising;
