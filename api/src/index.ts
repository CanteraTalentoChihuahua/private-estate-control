import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import accountRoutes from "./routes/account";
import dashboardRoutes from "./routes/dashboard";
import housesRoutes from "./routes/houses";
import expensesRoutes from "./routes/expenses";
import usersRoutes from "./routes/users";
import accessRoutes from "./routes/access";
import dotenv from "dotenv"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 80;
const host = '0.0.0.0';

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Routers declarations
app.use('/login', authRoutes);
app.use('/account', accountRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/houses', housesRoutes);
app.use('/expenses', expensesRoutes);
app.use('/users', usersRoutes);
app.use('/access', accessRoutes);

app.listen(PORT, host, () => {
    console.log(`Server running on port ${process.env.PORT}`
    )
});