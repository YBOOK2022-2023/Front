import React, { createContext } from "react";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { UserPool } from "../hooks/Global/UserPool";
import { useNavigate } from "react-router-dom";

type UserAccountContextType = {
  authenticate(
    email: string,
    password: string
  ): Promise<{ data: CognitoUserSession }>;
  getSession(): Promise<{ session: CognitoUserSession }>;
  getJwt(): Promise<string>;
  logout(): void;
};

const UserAccountContext = createContext<UserAccountContextType>(null as any);

const UserAccountProvider: React.FC<{
  children?: React.ReactElement | React.ReactElement[];
}> = (props) => {
  const getSession = async () => {
    return await new Promise<{ session: CognitoUserSession }>(
      (resolve, reject) => {
        const user = UserPool.getCurrentUser();
        if (user) {
          user.getSession((err: any, session: CognitoUserSession) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log("session" + session.isValid());
              resolve({ session });
              return session;
            }
          });
        } else {
          console.log("no user");
          reject();
        }
      }
    );
  };

  const getJwt = async () => {
    return await new Promise<string>((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err: any, session: CognitoUserSession) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log("session" + session.isValid());
            resolve(session.getIdToken().getJwtToken());
            return session;
          }
        });
      } else {
        console.log("no user");
        reject();
      }
    });
  };

  // async function postToken(route: string, token: string) {
  //   try {
  //     const response = await fetch(route, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ token }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const authenticate = async (Username: string, Password: string) => {
    return await new Promise<{ data: CognitoUserSession }>(
      (resolve, reject) => {
        const user = new CognitoUser({ Username, Pool: UserPool });
        const authDetails = new AuthenticationDetails({ Username, Password });
        console.log(Username, Password);
        user.authenticateUser(authDetails, {
          onSuccess: (data) => {
            const accessToken = data.getAccessToken().getJwtToken();
            const idToken = data.getIdToken().getJwtToken();
            console.log("Connexion reussie ! accessToken:", accessToken);
            resolve({ data });
            return idToken;
          },
          onFailure: (err) => {
            console.log("onFailure:", err);
            reject(err);
          },
          newPasswordRequired: (data) => {
            console.log("newPasswordRequired:", data);
            resolve(data);
          },
        });
      }
    );
  };
  const navigate = useNavigate();
  const logout = () => {
    const user = UserPool.getCurrentUser();

    if (user) {
      user.signOut();
      console.log("logout");
      navigate("/");
    }
  };

  return (
    <UserAccountContext.Provider
      value={{ authenticate, getSession, getJwt, logout }}
    >
      {props.children}
    </UserAccountContext.Provider>
  );
};

export { UserAccountProvider, UserAccountContext };
