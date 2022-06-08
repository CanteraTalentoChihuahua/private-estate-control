// Account controller
import { getConnection } from "../conf/db";
import sql from "mssql";

export const testAccount = (req: any, res: any) => {
    res.json({header: "Account Settings"})
}