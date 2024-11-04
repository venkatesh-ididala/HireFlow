const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database connected successfully");
}).catch((err)=>{

    console.log(err);

});




















app.listen(process.env.PORT || 3000 ,()=> console.log(`app listening on the port ${process.env.PORT} `));


