export default {
    getAllUsers: 'SELECT * FROM T_Users',
    createNewUser: `INSERT INTO T_Users (IdUser, IdResDev, FirstName, LastName, PhoneNumber, Email, Password, Active, FacialID) 
    VALUES (@idUser, @idResDev, @firstName, @lastName, @phoneNumber, @email, @password, @active, @facialId)`,
    getUserById: `SELECT * FROM T_Users WHERE IdUser = @Id`,
    deleteUser: `DELETE FROM T_Users WHERE IdUser = @Id`,
    getTotalUsers: `SELECT COUNT(*) FROM T_Users`,
    updateUsersById: `UPDATE T_Users SET FirstName = @firstName, LastName = @lastName,
     Password = @password, PhoneNumber = @phoneNumber, Active = @active, FacialID = @facialId,
    WHERE IdTestUser = @Id`
}  