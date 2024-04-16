const service = require("../service/contribution_service")

const ContributionView = {
    mainView: async (req,res) =>{
        let performanceInfo=[];
        performanceInfo= await service.contributionProcess.showPerformanceInfo();
        console.log("performanceInfo1:",performanceInfo[0][0].TEAM);

        let teamList=[];
        for (let j=0 ; j< performanceInfo.length;j++){
            if(performanceInfo[j][0]==null){
                teamList.push(" (might be used for client)");
            }
            teamList.push(performanceInfo[j][0].TEAM);
        }

        let contributionsByRound = []; // whole 
        for(let i=0; i<performanceInfo.length;i++){
            let contributionsForRound=[["Employee", "contributions"]];  //each graph     // doesnt matter what to put but its essential the 0 index must be existing ;
            for(let j=0 ; j< performanceInfo[i].length;j++){
                contributionsForRound.push([  performanceInfo[i][j].USER_NAME , performanceInfo[i][j].CODELINE])
                
            }
            
            contributionsByRound.push(contributionsForRound);
            
        }   
       
      
      
       console.log("teamList:"+teamList);
        
       
        res.render("contribution_graph",{ contributionsByRound , teamList});
    }
    
    
};
module.exports={ContributionView};