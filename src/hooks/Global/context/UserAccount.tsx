import React,{createContext} from "react"
import { CognitoUserPool,AuthenticationDetails, CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js"
import {UserPool} from "../UserPool"
import { resolve } from "path"
import axios from "axios"

type UserAccountContextType = {
  authenticate(email: string, password: string): Promise<{data:CognitoUserSession}>
    getSession(): Promise<{session:CognitoUserSession}>
    logout(): void
    
}

const UserAccountContext = createContext<UserAccountContextType>(null as any)


const UserAccountProvider: React.FC<{children?: React.ReactElement|React.ReactElement[]}> = (props) => {
    const getSession = async () => {
        return await new Promise<{session:CognitoUserSession}>((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.getSession((err:any, session:CognitoUserSession) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    
                    } else {
                       console.log("session" +session.isValid()) ;
                        resolve({session});
                        return session;
                    }
                });
            }else{
                console.log("no user")
                reject();
            }

        })
    }
   

    const authenticate = async (Username:string,Password:string)=>{
        return await new Promise<{data:CognitoUserSession}>((resolve,reject)=>{
            const user = new CognitoUser({Username, Pool: UserPool})
            const authDetails = new AuthenticationDetails({Username,Password})
            console.log(Username,Password);
            user.authenticateUser(authDetails,{
                
                onSuccess:(data)=>{
                    const accessToken = data.getAccessToken().getJwtToken();
                    const idToken = data.getIdToken().getJwtToken();
                    console.log("Connexion reussie ! accessToken:",accessToken)
                    resolve({data})
                    return idToken;
                },
                onFailure:(err)=>{
                    console.log("onFailure:",err)
                    reject(err)
                    
                    
                },
                newPasswordRequired:(data)=>{
                    console.log("newPasswordRequired:",data)
                    resolve(data)
                }
            });
        })
    }
    
    const logout = () => {
        const user = UserPool.getCurrentUser();
        if (user) {
            user.signOut();
            console.log("logout")
        }
    }
    
    return <UserAccountContext.Provider value={{authenticate,getSession,logout}}>{props.children}</UserAccountContext.Provider>;
};


export {UserAccountProvider,UserAccountContext}
;
   