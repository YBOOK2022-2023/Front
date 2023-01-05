import React from "react";
import { createContext,useContext } from "react";
import { LoginForm } from "../../../views/login/Login";

type AccountContextType = {
    switchToLogin: () => void;
    switchToRegister: () => void;
    switchToForgotPassword: () => void;
}

export const AccountContext = createContext<AccountContextType>( null as any);



