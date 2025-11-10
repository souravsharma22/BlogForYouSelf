import  JWT  from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();


const SECRET_KEY = process.env.SECRET_KEY ;
// console.log(SECRET_KEY);

function createTokenForUser(user){
    // console.log(SECRET_KEY);

    const payload = {
        _id : user._id, 
        email : user.email ,
        name : user.name,
        profileImage : user.profileImage,
        role : user.role
    }

    const token = JWT.sign(payload , SECRET_KEY);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token , SECRET_KEY);
    return payload;
}

export {createTokenForUser , validateToken}  