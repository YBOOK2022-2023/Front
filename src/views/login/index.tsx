import React from "react";

import { motion } from "framer-motion";
import styled from "styled-components";
import { LoginForm } from "./Login";
import { RegisterForm } from "./Register";
import { AccountContext } from "../../hooks/context/LoginContext";
import { UserAccountProvider } from "../../providers/UserAccount";
import Status from "../../hooks/context/UseLoggedStatus";
import { ForgotPass } from "./ForgotPass";

const BoxContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 18em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;
type ElementProps = {
  children: React.ReactNode;
};

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 400px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -200px;
  left: -100px;
  background: rgb(63, 139, 251);
  background: radial-gradient(
    circle,
    rgba(63, 139, 251, 1) 0%,
    rgba(155, 70, 241, 1) 77%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "250%",
    height: "160vh",
    borderRadius: "30%",
    transform: "rotate(90deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox(props: any) {
  const [isExpanded, setExpanded] = React.useState(false);
  const [active, setActive] = React.useState("login");
  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToRegister = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("register");
    }, 400);
  };
  const switchToLogin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("login");
    }, 400);
  };
  const switchToForgotPassword = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("forgotPassword");
    }, 400);
  };

  const contextValue = {
    switchToRegister,
    switchToLogin,
    switchToForgotPassword,
  };

  return (
    <UserAccountProvider>
      <Status />
      <AccountContext.Provider value={contextValue}>
        <BoxContainer>
          <TopContainer>
            <BackDrop
              initial={false}
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={backdropVariants}
              transition={expandingTransition}
            />
            {active === "login" && (
              <HeaderContainer>
                <HeaderText>Bienvenue</HeaderText>
                <SmallText>Veuillez vous identifier </SmallText>
                <SmallText>pour continuer !</SmallText>
              </HeaderContainer>
            )}

            {active === "register" && (
              <HeaderContainer>
                <HeaderText>Première Visite ?</HeaderText>
                <SmallText>Veuillez vous enregistrer</SmallText>
                <SmallText>pour continuer !</SmallText>
              </HeaderContainer>
            )}
            {active === "forgotPassword" && (
              <HeaderContainer>
                <HeaderText>Mot de passe oublié ?</HeaderText>
                <SmallText>Pas de panique</SmallText>
                <SmallText>
                  Vous pouvez changer votre mot de passe ici !
                </SmallText>
                <SmallText>
                  Il vous suffit d'entrer votre email et un code comfirmation y
                  sera envoyé !
                </SmallText>
              </HeaderContainer>
            )}
          </TopContainer>
          <InnerContainer>
            {active === "login" && <LoginForm />}
            {active === "register" && <RegisterForm />}
            {active === "forgotPassword" && <ForgotPass />}
          </InnerContainer>
        </BoxContainer>
      </AccountContext.Provider>
    </UserAccountProvider>
  );
}
