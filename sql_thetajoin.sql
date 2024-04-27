SELECT GivingGrants.volunteername
    FROM
        GivingGrants JOIN Fundraising
    ON
        GivingGrants.volunteername = Fundraising.volunteername
        AND
        GivingGrants.moneygiven <= Fundraising.moneyraised;
