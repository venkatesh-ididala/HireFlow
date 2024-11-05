const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const jobRoutes =require('./routes/job.routes');

const bodyParser=require('body-parser');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database connected successfully");
}).catch((err)=>{
  console.log(err);
});

//accepts the json data on requests and response  --whether express.jsson( also valid)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use('/api/jobs',jobRoutes);





















app.listen(process.env.PORT || 3000 ,()=> console.log(`app listening on the port ${process.env.PORT} `));


