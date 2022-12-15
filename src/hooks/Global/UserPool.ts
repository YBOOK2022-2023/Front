
import {useMemo} from 'react';
import React from "react"
import { CognitoUserPool} from "amazon-cognito-identity-js"


const poolData_user = {
    /* UserPoolId:process.env.REACT_APP_USER_POOL_ID || "",//User Pool   
    ClientId:process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || "" */
    UserPoolId:'eu-west-3_Iekd8jDeb',   
    ClientId:'7llslfb09dtag2h7117og3ku72'
}

export const  UserPool=new CognitoUserPool(poolData_user)
