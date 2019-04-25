const errorMessage = require('../config/errorMessages.json');

module.exports = {
    
    getErrorMessage: (errorId)=>{
        var error = {
            "Id": 0,
            "StatusCode": 500,
            "Message": "unknown error"
        };
        errorMessage.requestErrorMessages.forEach(element => {
             if(element.Id = errorId){
                 error = element;
                 
             }
        });
       // console.log('Error Handler: ',error);
        return error;
    },

    getSuccessMessage : (successId)=>{
        var success = {
            Id: Number,
            StatusCode: Number,
            Message: String
        }
        errorMessage.requestSuccessMessages.forEach(element => {
           
            if(element.Id === successId){
                success.Id = element.Id;
                success.StatusCode = 200;
                success.Message = element.Message;
                // console.log(element);
             }

        });
        //console.log('Error Handler: ',success);

        return success;
    }
}