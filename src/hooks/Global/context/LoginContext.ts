import React from "react";
import { createContext,useContext } from "react";
import { LoginForm } from "../../../components/login/Login";

type AccountContextType = {
    switchToLogin: () => void;
    switchToRegister: () => void;
}

export const AccountContext = createContext<AccountContextType>( null as any);



