export default {
    getAllHouses: 'SELECT * FROM T_Houses',
    createHouse: `INSERT INTO T_Houses (Address, Occuppied, Balance, IdResDev) 
    VALUES (@address, @occuppied, @balance, @idResDev)`,
    getHouseById: `SELECT * FROM T_Houses WHERE IdHouse = @id`,
    updateHouse: `UPDATE T_Houses SET Address = @address, Occuppied = @occuppied, Balance = @balance, IdResDev = @idResDev 
    WHERE IdHouse = @id`,
    deleteHouse: `DELETE FROM T_UsersHouses WHERE IdHouse = @id
    DELETE FROM T_Houses WHERE IdHouse = @id`
}