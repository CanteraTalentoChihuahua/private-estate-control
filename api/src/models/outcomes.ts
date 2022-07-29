export default {
    getAllOutcomes: 'SELECT * FROM T_Outcomes',
    createNewOutcome: `INSERT INTO T_Outcomes (IdResDev, Description, Date, Amount) 
    VALUES (@idResDev, @description, @date, @amount)`,
    getOutcomeById: `SELECT * FROM T_Outcomes WHERE IdOutcome = @id`,
    deleteOutcome: `DELETE FROM T_Outcomes WHERE IdOutcome = @id`,
    updateOutcomesById: `UPDATE T_Outcomes SET IdResDev = @idResDev, Description = @description, date = @date,
    Amount = @amount
    WHERE IdOutcome = @id`,
    getTotBal: `SELECT TotalBalance FROM T_Residentials WHERE IdResDev = @id`,
    updateResBal: `UPDATE T_Residentials SET TotalBalance = @TotalBalance WHERE IdResDev = @id`
}