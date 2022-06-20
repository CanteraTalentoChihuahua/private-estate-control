export default {
    getAllRes: `SELECT * FROM T_Residentials`,
    createRes: 'INSERT INTO T_Residentials (Name, Description) VALUES (@name, @description)',
    getResById: `SELECT * FROM T_Residentials WHERE IdResDev = @id`,
    updateRes: `UPDATE T_Residentials SET Name = @Name, Description = @description WHERE IdResDev = @id`,
    deleteRes: `DELETE FROM T_Residentials WHERE IdResDev = @id`
}