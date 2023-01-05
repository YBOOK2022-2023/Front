import React, { useContext, useState } from "react";
import { AccountContext } from "../../hooks/Global/context/LoginContext";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import ValidationCodeDialog from "../../components/Login/Modal";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  SpanAlert,
} from "./common";
import { UserPool } from "../../hooks/Global/UserPool";
import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
interface MyFields {
  name: string;
  given_name: string;
  email: string;
  password: string;
  comfirmPassword: string;
}

//*** schema de validation FORM
const schema = yup.object().shape({
  name: yup.string().required("Veuillez saisir un nom"),
  given_name: yup.string().required("Veuillez saisir un prénom"),
  email: yup.string().email().required("Veuillez saisir un email"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      " Au moins 6 Caratères,1 majuscule,1 minuscule, 1 chiffre et 1 caractère spécial"
    )
    .required("Veuillez saisir un mot de passe"),
  comfirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas"
    )
    .required("Veuillez confirmer votre mot de passe"),
});
//schema de validation  FORM***

export function RegisterForm(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyFields>({
    resolver: yupResolver(schema),
  });

  const { switchToLogin, switchToForgotPassword } = useContext(AccountContext);
  //***hooks

  const [isError, setisError] = useState(false);
  const [name] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [given_name] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [openToast, setOpenToast] = React.useState(true);
  const [isErrorMessage, setisErrorMessage] = React.useState("");

  //setisError("test");
  //TODO:Exporter les hooks dans un fichier dans gloabal contexte
  //hooks***
  const onSubmit = (data: MyFields) => {
    console.log(name, given_name, email);
    setOpen(true);
    setEmail(data.email);
    const user_name = new CognitoUserAttribute({
      Name: "name",
      Value: data.name,
    });
    const user_given_name = new CognitoUserAttribute({
      Name: "given_name",
      Value: data.given_name,
    });
    const user_email = new CognitoUserAttribute({
      Name: "email",
      Value: data.email,
    });

    UserPool.signUp(
      data.email,
      data.password,
      [user_name, user_given_name, user_email],
      [],
      (err, data) => {
        if (err) console.error(err);
        console.log(data);
      }
    );
  };
  const sendVerif = () => {
    const userData = {
      Username: email,
      Pool: UserPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (result === "SUCCESS") {
        const toast_success = "Votre compte a été créé avec succès";
        setisErrorMessage(toast_success);
        setOpenToast(true);
        setisError(false);
        setOpen(false);
      }
      if (err) {
        const toast_error = (err.message =
          "Code de vérification incorrect ou expiré");
        setisErrorMessage(toast_error);
        setOpenToast(true);
        setisError(true);
      }
    });
  };

  const resendVerif = () => {
    const userData = {
      Username: email,
      Pool: UserPool,
    };
    console.log(userData);
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function (err, result) {
      console.log(err, result);
      if (err) {
        console.log(err);
        return;
      } else {
      }
    });
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <ValidationCodeDialog
          open={open}
          setOpen={setOpen}
          sendVerif={sendVerif}
          setCode={setCode}
          resendCode={resendVerif}
          code={code}
          resendCodeText='RENVOYER'
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
              {isErrorMessage}
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
              {isErrorMessage}
            </Alert>
          </Snackbar>
        )}

        <Input type='text' placeholder='Nom' {...register("name")} />
        <Input
          type='text'
          placeholder='Prénom'
          {...register("given_name")}
          //value={given_name}
          /* onChange={(e)=>setGiven_name(e.target.value)} */
        />
        <Input
          type='email'
          placeholder='Email'
          {...register("email")}
          //value={email}
          /* onChange={(e)=>setEmail(e.target.value)} */
        />
        <Input
          type='password'
          placeholder='Mot de passe'
          {...register("password")}
          //value={password}
          /* onChange={(e)=>CheckValidation(e)} */
        />
        <Input
          type='password'
          placeholder='Confirmer mot de passe'
          {...register("comfirmPassword")}
        />

        {errors.name?.message && (
          <SpanAlert>
            <HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>
            {errors.name?.message}
          </SpanAlert>
        )}
        {errors.given_name?.message && (
          <SpanAlert>
            <HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>
            {errors.given_name?.message}
          </SpanAlert>
        )}
        {errors.email?.message && (
          <SpanAlert>
            <HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>
            {errors.email?.message}
          </SpanAlert>
        )}
        {errors.password?.message && (
          <SpanAlert>
            <HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>
            {errors.password?.message}
          </SpanAlert>
        )}
        {errors.comfirmPassword?.message && (
          <SpanAlert>
            <HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>
            {errors.comfirmPassword?.message}
          </SpanAlert>
        )}
        <BoldLink className='my-2' onClick={switchToForgotPassword}>
          Mot de passe oublié?
        </BoldLink>

        <SubmitButton type='submit'>S'enregistrer</SubmitButton>
      </FormContainer>
      <MutedLink className='my-2'>
        Vous avez déjà un compte ?
        <BoldLink onClick={switchToLogin}>Se connecter</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
