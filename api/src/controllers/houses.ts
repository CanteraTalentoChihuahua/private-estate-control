// Houses controller
import { getConnection } from "../conf/db";
import sql from "mssql";

export const testHouse = (req: any, res: any) => {
    res.json({header: "Houses"})
}