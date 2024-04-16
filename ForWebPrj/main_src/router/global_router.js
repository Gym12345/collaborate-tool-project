module.exports=(app)=>{
   
    const router =require("express").Router();
   

    


    router.get("/",(req,res)=>{
        res.render("welcomePage.ejs")
    })
    router.get("/testNewPage",(req,res) =>{
        res.render("testHTML.ejs")

    });
    
    const authRouter=require("../../src/auth/router/auth_router");
    app.use("/auth",authRouter);

    const contributionRouter=require("../../src/contribution/router/contribution_router");
    app.use("/contribution",contributionRouter);


    const mainController = require("../controller/main_controller");
    router.post("/update-status", mainController.mainAjax.updateStatus);


    router.get("/testForSession",mainController.mainAjax.fetchGlobalSession); //


   
    
    return router;
}