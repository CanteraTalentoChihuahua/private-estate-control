// Access controller
import { getConnection } from "../conf/db";
import sql from "mssql";

export const testAccess = (req: any, res: any) => {
    res.json({header: "Access Reports"})
}