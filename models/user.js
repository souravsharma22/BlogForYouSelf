import mongoose from "mongoose";
import { createHmac , randomBytes} from 'node:crypto'

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
    
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac('sha256' , salt)
    .update(user.password)
    .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static("matchPassword" , async function (email , password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User NOT FOUND");

    const hashedPassword = user.password;
    const salt = user.salt;
    const givenHashedPassword = createHmac('sha256', salt)
    .update(password)
    .digest('hex')

    if(hashedPassword !== givenHashedPassword)
        throw new Error("INCORRECT PASSWORD.!!!!!")

    return user;


})

const user = mongoose.model('user' , userSchema)

export {user}