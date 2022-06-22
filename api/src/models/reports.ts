export default {
    getAllUsersHouses: `SELECT * FROM T_UsersHouses`,
    createUsersHousesRegister: `INSERT INTO T_UsersHouses(IdHouse, IdUser) VALUES (@idHouse, @idUser)`,
    reportUsersHouses: `SELECT T_Users.IdUser, T_Users.FirstName, T_Users.LastName, T_Users.Email, T_Users.Active, T_Users.FaceID,
    T_Houses.IdHouse, T_Houses.Address, T_Houses.Balance, T_Houses.Occuppied, T_Houses.IdResDev, T_UsersHouses.IdUserHouse
    FROM T_Users
    FULL OUTER JOIN T_UsersHouses
    ON T_UsersHouses.IdUser = T_Users.IdUser
    FULL OUTER JOIN T_Houses
    ON
    T_Houses.IdHouse = T_UsersHouses.IdHouse`
}