export default {
    matchUser: `SELECT * FROM T_Users WHERE Email = @email`,
    getRole: `SELECT Role FROM T_Users WHERE Email = @email`,
    getIdResDev: `SELECT IdResDev, IdUser FROM T_Users WHERE Email = @email`
}