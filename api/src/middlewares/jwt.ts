import jwt from "jsonwebtoken";
import { NextFunction } from "express-serve-static-core";
import { readRole } from "../controllers/auth";

export function generateAccessToken(payload: any) {
    return jwt.sign(payload, "secret", { expiresIn: '30m' }); // , { expiresIn: '5m'}
}

export function validateToken(req: any, res: any, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization'] || req.query.accessToken; // Lo busca || puede ir en browser
        const tkn = authHeader.split(' ')[1]
    
        if (tkn == null) return res.sendStatus(401);
    
        jwt.verify(tkn, "secret", (err: any, user: any) => {
    
            if (err) return res.sendStatus(403);
    
            req.email = user.email;
            req.password = user.password;
            
            next();
    
        });
        
    } catch (error) {
        res.sendStatus(401);
    }

}

export function validateSA(req: any, res: any, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization'] || req.query.accessToken;
        const tkn = authHeader.split(' ')[1]
    
        if (tkn == null) return res.sendStatus(401);
    
        jwt.verify(tkn, "secret", (err: any, user: any) => {
    
            if (err) return res.sendStatus(403);
    
            req.email = user.email;
            req.password = user.password;
            
            if (readRole == "Super Administrator") {
                console.log(readRole + " allowed");
                next();
            } else{
                console.log(readRole + " not allowed here");
                return res.send("");
            }
            
    
        });
        
    } catch (error) {
        res.sendStatus(401);
    }


}