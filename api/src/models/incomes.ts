export default {
    getHouseIncome: 'SELECT Balance FROM T_Houses WHERE IdHouse = @idHouse',
    updateHouseBalance: `UPDATE T_Houses SET Balance = @finalBalance
    WHERE IdHouse = @idHouse`,
    getAllIncomes: 'SELECT * FROM T_Incomes',
    createNewIncome: `INSERT INTO T_Incomes (IdResDev, IdHouse, Date, Amount, Description, Receipt) 
    VALUES (@idResDev, @idHouse, @date, @amount, @description, @receipt)`,
    getIncomeById: `SELECT DISTINCT(IdIncome), T_Incomes.IdResDev, T_Incomes.IdHouse, T_Incomes.Description,
    T_Incomes.Date, T_Incomes.Amount, T_Incomes.Receipt  FROM T_Incomes
    JOIN T_UsersHouses ON T_Incomes.IdHouse = T_UsersHouses.IdHouse 
    JOIN T_Users ON T_UsersHouses.IdUser = @iduser`,
    deleteIncome: `DELETE FROM T_Incomes WHERE IdIncome = @id`,
    updateIncomesById: `UPDATE T_Incomes SET IdResDev = @idResDev, IdHouse = @idHouse, Date = @date,
    Amount = @amount, Description = @description, Receipt = @receipt
    WHERE IdIncome = @id`,
    updateHouseBal: `UPDATE T_Houses SET Balance = @balance WHERE IdHouse = @id`,
    getABalance: `SELECT Balance FROM T_Houses WHERE IdHouse = @id`,
    getResBal: `SELECT TotalBalance FROM T_Residentials WHERE IdResDev = @id`,
    updateResBal: `UPDATE T_Residentials SET TotalBalance = @TotalBalance WHERE IdResDev = @id`
}