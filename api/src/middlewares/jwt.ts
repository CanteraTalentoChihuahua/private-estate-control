import jwt from "jsonwebtoken";
import { NextFunction } from "express-serve-static-core";

export function generateAccessToken(payload: any) {
    return jwt.sign(payload, "secret", { expiresIn: '30m' }); // , { expiresIn: '5m'}
}

export function validateToken(req: any, res: any, next: NextFunction) {
    const authHeader = req.headers['authorization'] || req.query.accessToken; // Lo busca || puede ir en browser
    const tkn = authHeader.split(' ')[1]

    if (tkn == null) return res.sendStatus(401);

    jwt.verify(tkn, "secret", (err: any, user: any) => {

        if (err) return res.sendStatus(403);

        req.email = user.email;
        req.password = user.password;

        next();

    });

}