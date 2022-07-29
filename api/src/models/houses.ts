export default {
    getAllHouses: 'SELECT * FROM T_Houses',
    createHouse: `INSERT INTO T_Houses (Address, Occuppied, Balance, IdResDev) 
    VALUES (@address, @occuppied, @balance, @idResDev)`,
    getHouseById: `SELECT * FROM T_Houses WHERE IdHouse = @id`,
    updateHouse: `UPDATE T_Houses SET Address = @address, Occuppied = @occuppied, Balance = @balance, IdResDev = @idResDev 
    WHERE IdHouse = @id`,
    deleteHouse: `DELETE FROM T_UsersHouses WHERE IdHouse = @id
    DELETE FROM T_Houses WHERE IdHouse = @id`,
    housePayment: `UPDATE T_Houses SET Balance = @newbal WHERE IdHouse = @id`,
    houseBal: `SELECT Balance FROM T_Houses WHERE IdHouse = @id`,
    houseCounter: `SELECT COUNT(Balance) AS Count FROM T_Houses`,
    houseIds: `SELECT IdHouse FROM T_Houses`,
    updateResBal: `UPDATE T_Residentials SET TotalBalance = @TotalBalance WHERE IdResDev = @id`,
    getResBal: `SELECT TotalBalance FROM T_Residentials WHERE IdResDev = @id`
}