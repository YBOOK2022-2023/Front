import React, { useState, useContext, useEffect } from "react";
import { UserAccountProvider } from "../../providers/UserAccount";
import Button from "@mui/material/Button";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { UserPool } from "../../hooks/Global/UserPool";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AccountContext } from "../../hooks/context/LoginContext";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SpanAlert,
  SubmitButton,
} from "./common";
import AlertToast from "../../components/Toast";
import ValidationCodeDialog from "../../components/Login/Modal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const schema = yup.object().shape({
  email: yup.string().email().required("Veuillez saisir un email"),
  newpassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      " Au moins 6 Caratères,1 majuscule,1 minuscule, 1 chiffre et 1 caractère spécial"
    )
    .required("Veuillez saisir un mot de passe"),
  comfirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("newpassword"), null],
      "Les mots de passe ne correspondent pas"
    )
    .required("Veuillez confirmer votre mot de passe"),
});

interface MyFieldsForgottenPass {
  email: string;
  newpassword: string;
  comfirmPassword: string;
}

export function ForgotPass(props: any) {
  const { switchToLogin, switchToForgotPassword } = useContext(AccountContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyFieldsForgottenPass>({
    resolver: yupResolver(schema),
  });
  //****hooks
  const [email, setEmail] = React.useState("");
  const [newpassword, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [openToast, setOpenToast] = React.useState(false);
  const [isError, setIsError] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isErrorComfirm, setIsErrorComfirm] = React.useState(false);
  const [errorMessageComfirm, setErrorMessageComfirm] = React.useState("");
  const [openToastComfirm, setOpenToastComfirm] = React.useState(false);

  //********/ hooks
  //onSubmit
  const onSubmit = (data: MyFieldsForgottenPass) => {
    console.log(data);

    setEmail(data.email);
    setPassword(data.newpassword);
    console.warn("email" + email + "password" + newpassword);
    setOpen(true);
  };
  //********* */
  const getUser = () => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });
    return user;
  };
  //sendVerif
  const sendVerifForgotPass = () => {
    getUser().forgotPassword({
      onSuccess: function (result) {
        setIsError(false);
        setErrorMessage("Code envoyé");
        setOpenToast(true);
      },
      onFailure: function (err) {
        console.log("err" + err);
        setIsError(true);
        setErrorMessage(err.message);

        setOpenToast(true);
      },
      inputVerificationCode: function (data) {
        console.log("data" + data);
      },
    });
  };
  //resetPassword recupère le code et le nouveau mot de passe
  const resetPassword = () => {
    setIsError(false);
    getUser().confirmPassword(code, newpassword, {
      onSuccess: function (result) {
        console.log("mot de passe changé" + result);
        setOpen(false);
        setIsErrorComfirm(false);
        setErrorMessageComfirm("Mot de passe changé avec succès");
        setOpenToastComfirm(true);
      },
      onFailure: function (err) {
        if (code === "") {
          setErrorMessageComfirm("Veuillez saisir un code");
        } else if (
          err.message ===
          "ExpiredCodeException: Invalid code provided, please request a code again."
        ) {
          setErrorMessageComfirm(
            "Code invalide ou  expiré, veuillez en demander un nouveau ou resaisir"
          );
        } else if (
          err.message === "Attempt limit exceeded, please try after some time."
        ) {
          setErrorMessageComfirm(
            "Trop de tentatives, veuillez réessayer plus tard"
          );
        }
        setOpenToastComfirm(true);
      },
    });
  };
  const handleCloseToast = () => {
    setOpenToast(false);
  };
  const handleCloseToastComfirm = () => {
    setOpenToastComfirm(false);
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <ValidationCodeDialog
          open={open}
          setOpen={setOpen}
          sendVerif={sendVerifForgotPass}
          setCode={setCode}
          code={code}
          resendCode={resetPassword}
          resendCodeText='Valider'
        />
        {isError ? (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            open={openToast}
            autoHideDuration={6000}
            onClose={handleCloseToast}
          >
            <Alert
              onClose={handleCloseToast}
              severity='error'
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        ) : (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            open={openToast}
            autoHideDuration={6000}
            onClose={handleCloseToast}
          >
            <Alert
              onClose={handleCloseToast}
              severity='success'
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        )}
        {isErrorComfirm ? (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            open={openToastComfirm}
            autoHideDuration={6000}
            onClose={handleCloseToast}
          >
            <Alert
              onClose={handleCloseToastComfirm}
              severity='error'
              sx={{ width: "100%" }}
            >
              {errorMessageComfirm}
            </Alert>
          </Snackbar>
        ) : (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            open={openToastComfirm}
            autoHideDuration={6000}
            onClose={handleCloseToast}
          >
            <Alert
              onClose={handleCloseToastComfirm}
              severity='success'
              sx={{ width: "100%" }}
            >
              {errorMessageComfirm}
            </Alert>
          </Snackbar>
        )}

        <Input type='email' placeholder='Email' {...register("email")} />
        <Input
          type='password'
          placeholder='Nouveau Mot de passe'
          {...register("newpassword")}
        />
        <Input
          type='password'
          placeholder='Confirmer le mot de passe'
          {...register("comfirmPassword")}
        />
        {errors.email?.message && (
          <SpanAlert>
            <HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>
            {errors.email?.message}
          </SpanAlert>
        )}
        {errors.newpassword?.message && (
          <SpanAlert>
            <HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>
            {errors.newpassword?.message}
          </SpanAlert>
        )}
        {errors.comfirmPassword?.message && (
          <SpanAlert>
            <HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>
            {errors.comfirmPassword?.message}
          </SpanAlert>
        )}
        <br />

        <SubmitButton type='submit'>Comfirmer</SubmitButton>
      </FormContainer>
      <MutedLink className='my-2'>
        Vous avez déjà un compte ?
        <BoldLink href='#' onClick={switchToLogin}>
          Se connecter
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

function setOpenToastComfirm(arg0: boolean) {
  throw new Error("Function not implemented.");
}
