exports.processStatus = (status) => {


    // Perform any necessary operations here

    
    return new Promise((resolve, reject) => {
      // Simulate asynchronous operation
      setTimeout(() => {
        resolve({ status: status });
      }, 1000);
    });
  };
  