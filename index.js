const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app =  express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.gzyxaoe.mongodb.net/registrationFormDB`, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

//Registration Schema
const registrationSchema = new mongoose.Schema(
    {
        name : String,
        email : String,
        password : String
    }); 

//Mode of registration Schema
const Registration = mongoose.model("Registration" , registrationSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/" , (req, res) => {
    res.sendFile(__dirname + "/Pages/index.html")
})


app.post("/register" , async (req , res) =>{
    try{
        const {name , email, password} = req.body;

        const existingUser = await Registration.findOne({email : email});

        if(!existingUser){
            const Registration = new Registration({
                name,
                email,
                password
        });
            await registrationData.save();
            res.redirect("/success");
        }
        else{
            console.log("user already exists");
            res.redirect("/error");
        }

        const registrationData = new registration({
            name,
            email,
            password
        }) ;
        await registrationData.save();
        res.redirect("/success");
    }
    catch(error){
        console.log("error");
        res.redirect("/error");
    }
})

app.get("/success" , (req, res) =>{
     res.sendFile (__dirname + "/Pages/success.html");
})

app.get("/error" , (req, res) =>{
    res.sendFile (__dirname + "/Pages/error.html");
})

app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`);
})
