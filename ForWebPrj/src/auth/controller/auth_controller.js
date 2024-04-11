const service = require("../service/auth_service")

const authView = {
    
    loginForm: (req, res) => {
        
       res.render("loginForm");
    },
    registerForm:(req,res)=>{
        res.render("registerForm");
    }
    
};

const authProcess={
    loginCheck : async(req, res) => {
        console.log(req.body)
        const loginCheckresult = await service.authProcess.loginCheck( req.body );

        console.log("loginCheckresult"+loginCheckresult);
        if( loginCheckresult.result === 1){ //success

            loginCheckresult.status = "online"; // 
            req.session.result = loginCheckresult;  // it holds  name, position ,team
            res.locals.info = req.session.result;
            
            console.log("req.session.result:",req.session.result);
            res.render("mainView",{session:req.session.result})
         }else{
            res.send(loginCheckresult.msg)
        }
        
        
        
     },
    registerCheck : async (req, res) => {
        
        const registerCheckResult=await service.authProcess.registerCheck(req.body);
        // if(registerCheckResult.result==1){
        //     res.send(registerCheckResult.msg)
        // }else{
        //     res.send(registerCheckResult.msg)
        // }
       
        res.send(registerCheckResult.msg)
     },
   
     
}





module.exports={authView,authProcess};