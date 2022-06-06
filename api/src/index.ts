import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import dotenv from "dotenv"
dotenv.config();

const app = express();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Routers declarations
app.use('/api', usersRoutes);
app.use('/api/login', authRoutes);

app.listen(2000, () => {
    console.log(`Server running on port ${2000}`
    )
});