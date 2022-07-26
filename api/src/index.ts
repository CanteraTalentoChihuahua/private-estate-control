import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import * as swaggerDoc from "./swagger.json";
import accessRoutes from "./routes/access";
import accountRoutes from "./routes/account";
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import expensesRoutes from "./routes/expenses";
import faceId from "./routes/faceId";
import filterRoutes from "./routes/filter";
import housesRoutes from "./routes/houses";
import incomesRoutes from "./routes/incomes";
import outcomesRoutes from "./routes/outcomes";
import platesRoutes from "./routes/plates";
import residentials from "./routes/residentials";
import registryRoutes from "./routes/registry";
import usersRoutes from "./routes/users";

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
app.use('/access', accessRoutes);
app.use('/account', accountRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/expenses', expensesRoutes);
app.use('/face-id', faceId);
app.use('/filter', filterRoutes);
app.use('/houses', housesRoutes);
app.use('/incomes', incomesRoutes);
app.use('/login', authRoutes);
app.use('/outcomes', outcomesRoutes);
app.use('/plates', platesRoutes);
app.use('/registry', registryRoutes);
app.use('/residentials', residentials);
app.use('/users', usersRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(PORT, host, () => {
    console.log(`Server running on port ${PORT}`
    )
});