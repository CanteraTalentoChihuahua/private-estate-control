import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false}));
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

app.listen(port, () => {
    console.log(`Server running on ${port}`
    )
});