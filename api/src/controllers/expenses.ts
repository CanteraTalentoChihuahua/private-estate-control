// Expenses controller
import { getConnection } from "../conf/db";
import sql from "mssql";

export const testExpenses = (req: any, res: any) => {
    res.json({header: "Expenses"})
}