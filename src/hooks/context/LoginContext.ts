import { createContext } from "react";

type AccountContextType = {
  switchToLogin: () => void;
  switchToRegister: () => void;
  switchToForgotPassword: () => void;
};

export const AccountContext = createContext<AccountContextType>(null as any);
