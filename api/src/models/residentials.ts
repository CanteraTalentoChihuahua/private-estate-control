export default {
    createRes: 'INSERT INTO T_Residentials (Name, Description) VALUES (@name, @description)',
    getallRes: `SELECT * FROM T_Residentials`,
    getResById: `SELECT * FROM T_Residentials WHERE IdResDev = @Id`,
    updateRes: `UPDATE T_Residentials SET Name = @Name, Description = @description WHERE IdResDev = @Id`,
    deleteRes: `DELETE FROM T_Residentials WHERE IdResDev = @Id`,
}