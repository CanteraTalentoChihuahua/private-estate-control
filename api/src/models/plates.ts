export default {
    getPlate: 'SELECT * FROM T_Cars WHERE LicensePlate = @plates',
    getAllPlates: `SELECT * FROM T_Cars`,
    access: `INSERT INTO T_Accesses (IdUser, Date, IsFaceRecon) VALUES (@iduser, @date, @isFaceRecon)`
}