import { validateToken } from "../services/authentication.js";

function cheackForAuthentication(cookieName){
    return (req , res , next)=>{

        const token = req.cookies[cookieName];
        if(!token) return next();

        try {
            const payload = validateToken(token);
            // console.log(payload)
            req.user = payload;
        } catch (error) {}

        return next();
    }
}

export {cheackForAuthentication}