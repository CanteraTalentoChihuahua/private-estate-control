export default {
    getAllRes: `SELECT * FROM T_Residentials`,
    createRes: 'INSERT INTO T_Residentials (Name, Description, TotalBalance) VALUES (@name, @description, 0)',
    getResById: `SELECT * FROM T_Residentials WHERE IdResDev = @id`,
    updateRes: `UPDATE T_Residentials SET Name = @Name, Description = @description WHERE IdResDev = @id`,
    updateResBalance: `UPDATE T_Residentials SET TotalBalance = @totalBalance WHERE IdResDev = @id`,
    deleteRes: `DELETE FROM T_Residentials WHERE IdResDev = @id`
}