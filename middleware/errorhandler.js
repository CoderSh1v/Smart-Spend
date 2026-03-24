export const  errorhandler= (error,req,res,next)=>{
    if(error){
        res.json({error: error.message})
    }
}