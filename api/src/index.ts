import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import * as swaggerDoc from "./swagger.json";
import authRoutes from "./routes/auth";
import accountRoutes from "./routes/account";
import dashboardRoutes from "./routes/dashboard";
import housesRoutes from "./routes/houses";
import expensesRoutes from "./routes/expenses";
import usersRoutes from "./routes/users";
import accessRoutes from "./routes/access";
import outcomesRoutes from "./routes/outcomes";
import incomesRoutes from "./routes/incomes";
//import facerecognitionRoutes from "./routes/facerecognition";
import residentials from "./routes/residentials";
import registryRoutes from "./routes/registry";
import imagesRoutes from "./routes/image";

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
//app.use('/facerecognition', facerecognitionRoutes);
app.use('/houses', housesRoutes);
app.use('/incomes', incomesRoutes);
app.use('/login', authRoutes);
app.use('/outcomes', outcomesRoutes);
app.use('/registry', registryRoutes);
app.use('/residentials', residentials);
app.use('/users', usersRoutes);
app.use('/images', imagesRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(PORT, host, () => {
    console.log(`Server running on port ${PORT}`
    )
});