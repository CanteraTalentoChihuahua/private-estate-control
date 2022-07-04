export default {
    getAllHouses: 'SELECT * FROM T_Houses',
    getShownInfo: `SELECT Address, Balance FROM T_Houses WHERE IdHouse = @id`,
    getUserBasedOnHouse: `SELECT T_Users.IdUser, T_Users.LastName, T_Users.FirstName, T_Users.PhoneNumber, T_Users.Email
    FROM T_Houses
    FULL JOIN T_UsersHouses
    ON T_UsersHouses.IdHouse = T_Houses.IdHouse
    FULL JOIN T_Users
    ON
    T_Users.IdUser = T_UsersHouses.IdUser
    WHERE T_Houses.IdHouse = @id
    ORDER BY ISNULL(LastName, 'zzz') ASC`,
    
    createHouse: `INSERT INTO T_Houses (Address, Occuppied, Balance, IdResDev) 
    VALUES (@address, @occuppied, @balance, @idResDev)`,
    getHouseById: `SELECT * FROM T_Houses WHERE IdHouse = @id`,
    updateHouse: `UPDATE T_Houses SET Address = @address, Occuppied = @occuppied, Balance = @balance, IdResDev = @idResDev 
    WHERE IdHouse = @id`,
    deleteHouse: `DELETE FROM T_Houses WHERE IdHouse = @id`
}