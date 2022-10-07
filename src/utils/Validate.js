export default function validate(errors,name,value){
    switch(name){
        case "email": {
            let emailError = 
            value.indexOf('@') === -1 ? "Email does not contain @":"";
            errors.email = emailError;
            break;
         }
        case "password": {
            let passwordError;
            
            if(value.length < 7){
                passwordError = "Passsword can't be less than 6 characters";
            }
            let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
            if(!re.test(value)){
                passwordError = "Password must be contain characters and numbers";
            }
            errors.password = passwordError;
            break;
        }
        case "username":{
            let usernameError = 
            value.length >= 6 ? "" : "Username can't be less than 6 characters!"
            errors.username = usernameError;
            break;
        }
        default:
            return errors;
    }
}