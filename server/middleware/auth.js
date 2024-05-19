const jwt= require('jsonwebtoken');

const verifyToken= async(req,res, next)=> {
    try{
        const token= req.headers.authorization;
        if(!token){
            return  res.json('Invalid/no token!')
        }
           jwt.verify(token,"secret", (err, payload)=> {
            if(err){
                return res.json("JWT verification failed!")
            }
            req.payload= payload;
            next()
          }) 
    }catch(err){
        console.log('Error while generating token');
    }
}


module.exports= verifyToken