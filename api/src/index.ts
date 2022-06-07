import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import dotenv from "dotenv"
import { type } from "os";
dotenv.config();

const app = express();

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
app.use('/api', usersRoutes);
app.use('/api/login', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`
    )
    console.log(typeof (process.env.USER),
        typeof (process.env.PASSWORD),
        typeof (process.env.SERVER),
        typeof (Number(process.env.DBPORT)),
        typeof (process.env.DATABASE));
});