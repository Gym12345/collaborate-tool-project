const router=require("express").Router();
const contributionCtrl=require("../controller/contribution_controller");

router.get("/",contributionCtrl.ContributionView.mainView);


module.exports=router;