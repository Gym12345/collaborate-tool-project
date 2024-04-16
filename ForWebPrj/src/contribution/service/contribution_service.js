const contributionDAO=require("../dao/contribution_dao");

const contributionProcess = {
    showPerformanceInfo: async()=>{
        let performanceInfo={};
        performanceInfo=await contributionDAO.contributionProcess.byCodeLine();
        
       

        return performanceInfo;
    }

}
module.exports={contributionProcess};