import  JWT  from "jsonwebtoken";


const SECRET_KEY = process.env.SECRET_KEY || "IamBatmanEarth796";
// console.log(SECRET_KEY);

function createTokenForUser(user){
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