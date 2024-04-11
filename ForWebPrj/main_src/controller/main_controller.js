// controller.js
const service = require('../service/main_service');

const mainAjax ={
  updateStatus: async (req,res) =>{
    const status = req.body.status;
    
    service.processStatus(status)
    .then(result => {
      console.log("result"+result);

      let curr_status=result.status;
      req.session.status = curr_status;

      res.status(200).json({ message: 'Status updated successfully', data: result });
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal server error' });
    });

  }
}


module.exports={mainAjax};