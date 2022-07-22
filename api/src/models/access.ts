export default {
    joinAccess: `SELECT 
    T_Users.IdUser, 
    T_Users.FirstName + ' ' + T_Users.LastName AS 'FullName',
    CASE
        WHEN T_Accesses.IsFaceRecon = 0
            THEN 'Plate'
            ELSE 'Face'
        END as AccessType,
    T_Accesses.Date
    FROM T_Accesses
    INNER JOIN T_Users ON T_Accesses.IdUser = T_Users.IdUser
    ORDER BY T_Accesses.Date;`
}