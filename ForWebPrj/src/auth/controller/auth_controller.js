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
    loginCheck : async(req, res) => {   //

       



        console.log(req.body)

        const loginCheckresult = await service.authProcess.loginCheck( req.body );

        // console.log("loginCheckresult.name:"+loginCheckresult.name);
        // console.log("  req.session.result.name:"+  req.session.result.name);
      
   if (req.session.result== null ) { //in case of req.session.result is not existing 
    // if (req.session.result== null ||  loginCheckresult.name !== req.session.result.name) {
       


        req.session.regenerate((err) => { //,by regenerating ,  cleans req.session right before login
            
            if (err) {
                console.error("Error regenerating session:", err);
                res.status(500).send("Error regenerating session");
                return;
            }
            
            req.session.result = loginCheckresult;
            console.log("New session generated:", req.session.result);
            proceedWithLogin();
        });

   
        req.session.regenerate((err) => {
            
            if (err) {
                console.error("Error regenerating session:", err);
                res.status(500).send("Error regenerating session");
                return;
            }
            
            req.session.result = loginCheckresult;
            console.log("New session generated:", req.session.result);
            proceedWithLogin();
        });
    } else {
        // If names are the same, proceed directly
        proceedWithLogin();
    }
    function proceedWithLogin() {
        try {
            if (loginCheckresult.result === 1) { // Success
                loginCheckresult.status = "online";
                req.session.result = loginCheckresult;
                //res.locals.info = req.session.result;
                console.log("req.session.result:", req.session.result);
                res.render("mainView", { session: req.session.result });
            } else {
                console.log(loginCheckresult.msg);
               // res.redirect("/auth/loginForm");
               res.send(loginCheckresult.msg);
            }
        } catch (error) {
            console.log("login error:"+error);
        }
       
    }
   
  
        
        
        
     }, //loginCheck ends




    registerCheck : async (req, res) => {
        
        const registerCheckResult=await service.authProcess.registerCheck(req.body);
     
       
        res.send(registerCheckResult.msg)
     },
   
     logout: (req, res) => {
        console.log("aaaa:", req.session.result.name);
        try {
            if (req.session.result.name) {
                req.session.destroy(function (err) {
                    if (err)
                        console.log(err);
                    else
                        res.redirect('/');
                });
            }
        } catch (e) {
            console.log(e);
        }
        res.render("welcomePage");
    }
    
}





module.exports={authView,authProcess};