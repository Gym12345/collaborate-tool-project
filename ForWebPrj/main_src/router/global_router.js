module.exports=(app)=>{
   
    const router =require("express").Router();
   

    


    router.get("/",(req,res)=>{
        res.render("welcomePage.ejs")
    })

   
    const authRouter=require("../../src/auth/router/auth_router");
    app.use("/auth",authRouter);

    const mainController = require("../controller/main_controller");
    router.post("/update-status", mainController.mainAjax.updateStatus);

    return router;
}