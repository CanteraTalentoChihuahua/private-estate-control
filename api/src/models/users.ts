export default {
    getAllUsers: 'SELECT * FROM T_Users ORDER BY LastName',
    getUserByEmail: 'SELECT * FROM T_Users WHERE Email = @email',
    createNewUser: `INSERT INTO T_Users (IdResDev, FirstName, LastName, PhoneNumber, Email, Password, Active, FaceID, Role) 
    VALUES (@idResDev, @firstName, @lastName, @phoneNumber, @email, @password, @active, @faceId, 3)`,
    getUserById: `SELECT * FROM T_Users WHERE IdUser = @id`,
    deleteUser: `DELETE FROM T_Users WHERE IdUser = @id`,
    getTotalUsers: `SELECT COUNT(*) FROM T_Users`,
    updateUsersById: `UPDATE T_Users SET IdResDev = @idResDev, FirstName = @firstName, LastName = @lastName,
    PhoneNumber = @phoneNumber, Active = @active, FaceID = @faceId
    WHERE IdUser = @id`,
    unlinkUserHouse: `DELETE FROM T_UsersHouses WHERE IdUser = @idUser AND IdHouse = @idHouse`,
    emailVerification: `SELECT T_Users.IdUser
    FROM T_Users
    WHERE Email = @email`
}