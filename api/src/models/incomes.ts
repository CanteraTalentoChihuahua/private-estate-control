export default {
    getHouseIncome: 'SELECT Balance FROM T_Houses WHERE IdHouse = @idHouse',
    updateHouseBalance: `UPDATE T_Houses SET Balance = @finalBalance
    WHERE IdHouse = @idHouse`,
    getAllIncomes: 'SELECT * FROM T_Incomes',
    createNewIncome: `INSERT INTO T_Incomes (IdResDev, IdHouse, Date, Amount, Description, Receipt) 
    VALUES (@idResDev, @idHouse, @date, @amount, @description, @receipt)`,
    getIncomeById: `SELECT * FROM T_Incomes WHERE IdIncome = @id`,
    deleteIncome: `DELETE FROM T_Incomes WHERE IdIncome = @id`,
    updateIncomesById: `UPDATE T_Incomes SET IdResDev = @idResDev, IdHouse = @idHouse, Date = @date,
    Amount = @amount, Description = @description, Receipt = @receipt
    WHERE IdIncome = @id`,
    updateHouseBal: `UPDATE T_Houses SET Balance = @balance WHERE IdHouse = @id`,
    getABalance: `SELECT Balance FROM T_Houses WHERE IdHouse = @id`,
    getResBal: `SELECT TotalBalance FROM T_Residentials WHERE IdResDev = @id`,
    updateResBal: `UPDATE T_Residentials SET TotalBalance = @TotalBalance WHERE IdResDev = @id`
}