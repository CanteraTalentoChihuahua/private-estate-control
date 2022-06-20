export default {
    getAllIncomes: 'SELECT * FROM T_Incomes',
    createNewIncome: `INSERT INTO T_Incomes (IdResDev, IdHouse, Date, Amount, Description, Receipt) 
    VALUES (@idResDev, @idHouse, @date, @amount, @description, @receipt)`,
    getIncomeById: `SELECT * FROM T_Incomes WHERE IdIncome = @id`,
    deleteIncome: `DELETE FROM T_Incomes WHERE IdIncome = @id`,
    updateIncomesById: `UPDATE T_Incomes SET IdResDev = @idResDev, IdHouse = @idHouse, Date = @date,
    Amount = @amount, Description = @description, Receipt = @receipt
    WHERE IdIncome = @id`
}