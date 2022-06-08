// Dashboard controller
import { getConnection } from "../conf/db";
import sql from "mssql";

export const testDashboard = (req: any, res: any) => {
    res.json({header: "Admin dashboard"})
}