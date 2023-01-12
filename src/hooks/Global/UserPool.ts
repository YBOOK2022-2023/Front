import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData_user = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID!,
  ClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID!,
};

export const UserPool = new CognitoUserPool(poolData_user);
