import express from 'express'
import path from 'path'

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine' , 'ejs')
app.set('views' , path.resolve("./views"))

app.get("/" , (req , res)=>{
    return res.render("home")
    // console.log("Hi there ,this is sourav's Blog");
})

app.listen(PORT , ()=>{
    console.log("Server running on port" , PORT);
})