"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getAllUsers: 'SELECT * FROM T_TestUsers',
    createNewUser: `INSERT INTO T_TestUsers (firstName, lastName, password, info) 
    VALUES (@firstName, @lastName, @password, @info)`,
    getUserById: `SELECT * FROM T_TestUsers WHERE IdTestUser = @Id`,
    deleteUser: `DELETE FROM T_TestUsers WHERE IdTestUser = @Id`,
    getTotalUsers: `SELECT COUNT(*) FROM T_TestUsers`,
    updateUsersById: `UPDATE T_TestUsers SET FirstName = @firstName,
    LastName = @lastName, Password = @password, Info = @info
    WHERE IdTestUser = @Id`
};
