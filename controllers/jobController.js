const Jobs=require('../models/job');

module.exports={
    createJob: async(req,res)=>{
        const newJob=new Jobs(req.body);

        try{
            await newJob.save();
            res.status(201).json({
                status:"success",
                message: "job created successfully"
            });

        }
        catch(error){
res.status(500).json(error);

        }
    }

}