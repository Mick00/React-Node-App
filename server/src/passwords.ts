import {config} from "./Config";

export const assertPasswordPolitics = (password) =>{
    const specialChar = ["!","@","#","$","%","^","&","*","-","_"];
    if (password.length >= config.passwordMinLength){
        if (!config.passwordNeedsSpecial){
            return true;
        } else {
            const hasSpecialChar = !!specialChar.find(char => password.includes(char));
            if ( hasSpecialChar) {
                return hasSpecialChar;
            } else {
                throw new Error("Password needs to contain one of the following char: "+specialChar.join());
            }
        }
    }
    throw new Error("Minimum length for password is "+config.passwordMinLength);
}
