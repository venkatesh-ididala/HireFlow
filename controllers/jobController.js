
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
    },


    updateJob: async(req,res)=>{

        const jobId=req.params.id;

        const updated=req.body;
        try{
           const updatedJob=await Jobs.findByIdAndUpdate(jobId,updated,{new:true});

            if(!updatedJob ){
                return res.status(404).json({
                    status:false,
                    message:'Job not found'
                })
            }
            res.status(200).json({
                status:"success",
                message:"job updated successfully"
            })
        }
        catch(error){
     res.status(500).json(error);

        }
    },

    deleteJob: async(req,res)=>{
        const jobId=req.params.id;

        try{
               await Jobs.findByIdAndDelete(jobId);

               res.status(200).json({
                status:"success",
                message:"job deleted successfully"
               });
        }
        catch(error){
           res.status(500).json(error);

        }
    },


    getJob: async (req, res) => {
        const jobId = req.params.id;
    
        try {
            const job = await Jobs.findById(jobId, { createdAt: 0, updatedAt: 0, __v: 0 });
            if (job) {
                res.status(200).json({ job });
            } else {
                res.status(404).json({ message: "Job not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    

    getAllJobs :async(req,res)=>{
        const recent=req.query.new;

        try{
            let jobs;

            if(recent){
              jobs=  await Jobs.find({},{createdAt:0,updatedAt:0}).sort({createdAt:-1}).limit(2);

            }else{
                jobs=  await Jobs.find({},{createdAt:0,updatedAt:0});

            }


            res.status(200).json(jobs);
        }catch(error){
                    res.status(500).json(error);
        }
    },

    searchJobs: async(req,res)=>{
        try{

                const results=await Jobs.aggregate([
                    [
                        {
                          $search: {
                            index: "jobsearch",
                            text: {
                              query: req.params.key,
                              path: {
                                wildcard: "*"
                              }
                            }
                          }
                        }
                      ]

                ])
                res.status(200).json(results);

        }
        catch(error){
            res.status(500).json(error);
        }
    }

}



