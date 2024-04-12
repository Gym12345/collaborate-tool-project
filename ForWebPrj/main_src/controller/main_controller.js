// controller.js
const service = require('../service/main_service');
const fs = require('fs');
const path = require('path');
const mainAjax ={
  updateStatus: async (req,res) =>{
    const status = req.body.status;
    
    service.processStatus(status)
    .then(result => {
      console.log("result:"+result.status);
      req.session.result.status = result.status;// left result an right result is not same  
      
      res.status(200).json({ message: 'Status updated successfully', data: req.session });
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal server error' });
    });
    
  },




  fetchGlobalSession: async(req,res) =>{
   

      // Function to read all session files from the session directory
      function getAllSessionData(sessionDirectory) {
          return new Promise((resolve, reject) => {  //promise object resolve fulfills the promise and called when async operation is successful,
            // and when its called  the Promise transitions to the resolved (or fulfilled) state, and any value passed to resolve is treated as the fulfillment value 
              // reject: This function is used to reject the Promise and is typically called when an error or failure occurs during the asynchronous operation. When reject is called, the Promise transitions to the rejected state, and any value passed to reject is treated as the rejection reason (an error object).
              fs.readdir(sessionDirectory, (err, files) => {// Read all files in the session directory
                  if (err) {
                      reject(err);
                      return;
                  }

                  // Array to store session data
                  const sessionData = [];

                  // Iterate through each file
                  files.forEach(file => {
                      // Read the contents of each file
                      const filePath = path.join(sessionDirectory, file);
                      const fileContent = fs.readFileSync(filePath, 'utf8');

                      // Parse the JSON data (assuming it's stored as JSON)
                      try {
                          const data = JSON.parse(fileContent);
                          sessionData.push(data);
                      } catch (error) {
                          console.error('Error parsing session file:', error);
                      }
                  });

                  // Resolve with the array of session data
                  resolve(sessionData);
              });
          });
      }

      sessionDirectory="./sessions";
     // Function to fetch and log session data
    const fetchAllSessionData = () => {
      const currentTime = new Date().toLocaleTimeString();

          getAllSessionData(sessionDirectory)
              .then(sessionData => {
                console.log(`----currentTime: [${currentTime}]-----`);
                sessionData.forEach((d) => {
                console.log(`Session ${d.result.name}:`, d.result.status);
                });
              })  
            .catch(error => {
                console.error(' there is session that is not defined yet ');
                });
        }
          fetchAllSessionData(); //initial launch
          setInterval(fetchAllSessionData, 1000);
          
          res.render("testSession");

       


    }


}


module.exports={mainAjax};