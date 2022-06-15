export default {
    createHouse: `INSERT INTO T_Houses (Address, Occuppied, Balance, IdResDev) 
    VALUES (@address, @occuppied, @balance, @idResDev)`,
    getHouseById: `SELECT * FROM T_Houses WHERE IdHouse = @Id`,
    getHouses: 'SELECT * FROM T_Houses',
    updateHouse: `UPDATE T_Houses SET Address = @address, Occuppied = @occuppied, Balance = @balance, IdResDev = @idResDev 
    WHERE IdHouse = @Id`,
    deleteHouse: `DELETE FROM T_Houses WHERE IdHouse = @Id`
}