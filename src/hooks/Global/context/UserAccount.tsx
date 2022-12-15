import React,{createContext} from "react"
import { CognitoUserPool,AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js"
import {UserPool} from "../UserPool"
import { resolve } from "path"

type UserAccountContextType = {
  authenticate(email: string, password: string): unknown
    
}

const UserAccountContext = createContext<UserAccountContextType>(null as any)


const UserAccountProvider: React.FC<{children: React.ReactElement}> = (props) => {
    
    const authenticate =(Username:string,Password:string)=>{
        const user = new CognitoUser({Username, Pool: UserPool})
        const authDetails = new AuthenticationDetails({Username,Password})
        user.authenticateUser(authDetails,{
            onSuccess:(data)=>{
                console.log("onSuccess:",data)
            },
            onFailure:(err)=>{
                console.log("onFailure:",err)
            },
            newPasswordRequired:(data)=>{
                console.log("newPasswordRequired:",data)
            }
        });
    }
    return <UserAccountContext.Provider value={{authenticate}}>{props.children}</UserAccountContext.Provider>;
};

export {UserAccountProvider,UserAccountContext}
;
   