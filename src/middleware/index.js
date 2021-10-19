const admin = require("../config/firebase-config")

class middleware{
      async decodeToken(req,res,next){
        try {
            const token = req.headers.authorization.split(" ")[1];

            const decodeValue = await admin.auth().verifyIdToken(token);
            console.log(decodeValue)
    
            if (decodeValue){
               return  next();
            }
            return res.json({
                message:"unauthorized"
            })
    
            
        } catch (err) {
            console.log(err);
           return res.json({
               message : " internal error"
           })
            
        }
       

    }
}



module.exports =new  middleware;