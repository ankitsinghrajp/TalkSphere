export const errorMiddleware = (err,req,res,next)=>{

    //default values
    const statusCode = err.statusCode || 500;
      
    if(err.code===11000){
        const error = Object.keys(err.keyPattern).join(",");
        err.message = `Duplicate field - ${error}`;
        err.statusCode = 400;
    }

    if(err.name === "CastError"){
        const errorPath = err.path;
        err.message = `Invalid format of - ${errorPath}`
        err.statusCode = 400;
    }

    return res.status(statusCode).json({
        success:false,
        message:err.message
    })
}

