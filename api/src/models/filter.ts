export default {
    dates: `SELECT * FROM T_Incomes WHERE Date BETWEEN @iniDate AND @endDate`,
    datesDesc: `SELECT * FROM T_Incomes WHERE Date BETWEEN @iniDate AND @endDate ORDER BY Date DESC`,
    datesAsc: `SELECT * FROM T_Incomes WHERE Date BETWEEN @iniDate AND @endDate ORDER BY Date`,
    despDesc: `SELECT * FROM T_Incomes ORDER BY Description DESC`,
    despAsc: `SELECT * FROM T_Incomes ORDER BY Description`,
    dateDesc: `SELECT * FROM T_Incomes ORDER BY Date DESC`,
    dateAsc: `SELECT * FROM T_Incomes ORDER BY Date`
}