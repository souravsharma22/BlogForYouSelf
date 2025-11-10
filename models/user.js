import mongoose from "mongoose";
import { createHmac , hash, randomBytes} from 'node:crypto'
import { createTokenForUser } from "../services/authentication.js";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type : String,
        required: true,
        unique: true
    },
    salt:{
        type : String,
        // required: true
    },
    password:{
        type : String,
        required :true
    },
    profileImage:{
        type :String,
        default : '/images/defaultProfile.png'
    },
    role:{
        type:String,
        enum : ['USER' , 'ADMIN'],
        default : 'USER'
    }
    
} , { timestamps : true});

userSchema.pre("save" , function (next){
    const user = this;
    
    if(!user.isModified("password")) return next();

    const salt = randomBytes(16).toString('hex');

    const hashedPassword = createHmac('sha256' , salt)
    .update(user.password)
    .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static("matchPasswordAndGenerateToken" , async function (email , password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User NOT FOUND");

    console.log('user is found');
    // console.log(user)
    const hashedPassword = user.password;
    const salt = user.salt;
    const givenHashedPassword = createHmac('sha256', salt)
    .update(password)
    .digest('hex')

    // console.log(givenHashedPassword)
    // console.log(hashedPassword);
    if(hashedPassword !== givenHashedPassword)
    {
        console.log("this is tgrowing error ,,,,, the password mathching");
        throw new Error("INCORRECT PASSWORD.!!!!!")
    }
        

    // return user;
    // console.log("creating token...........")
    const token = createTokenForUser(user);
    // console.log("Token Created Successfully!!!!!!!!!!!!!!!!!!!!11");

    return token;


})

const user = mongoose.model('user' , userSchema)

export {user}