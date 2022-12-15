
import React, { createRef, useContext ,useState} from "react";
import { AccountContext } from "../../hooks/Global/context/LoginContext";
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import ValidationCodeDialog from "../../components/Login/Modal";

import  {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  SpanAlert
  
} from "./common";
import { UserPool } from "../../hooks/Global/UserPool";
import { CognitoUser, CognitoUserAttribute ,} from "amazon-cognito-identity-js";
import { useForm ,Resolver} from "react-hook-form";
import{yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { render } from "@testing-library/react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

type FormDataType = {
  name: string;
  given_name: string;
  email: string;
  password: string;
  comfirmPassword: string;
};
interface MyFields{
  name:string;
  given_name:string;
  email:string;
  password:string;
  comfirmPassword:string;
}

//*** schema de validation FORM
const schema = yup.object().shape({
  name: yup.string().required("Veuillez saisir un nom"),
  given_name: yup.string().required("Veuillez saisir un prénom"),
  email: yup.string().email().required("Veuillez saisir un email"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        " Au moins 6 Caratères,1 majuscule,1 minuscule, 1 chiffre et 1 caractère spécial"
    )
    .required('Veuillez saisir un mot de passe'),
  comfirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas').required('Veuillez confirmer votre mot de passe'),
});
//schema de validation  FORM***



export function RegisterForm(props:any) {
  
  const { register, handleSubmit, formState: { errors } } = useForm<MyFields>({
    resolver: yupResolver(schema),
  })
  


    const { switchToLogin } = useContext(AccountContext);
    //***hooks
    
    const [isError,setisError] =useState("");
    const [name,setName] =React.useState("");
    const [email,setEmail] =React.useState("");
    const [password,setPassword]=React.useState("")
    const [given_name, setGiven_name] = React.useState('');
    const [comfirmPassword,setComfirmPassword]=React.useState("")
    const [open, setOpen] = React.useState(false);
    const [code,setCode]=React.useState("")
  
    //TODO:Exporter les hooks dans un fichier dans gloabal contexte
    //hooks***
      const onSubmit = (data:MyFields) => {
          setName(data.name);
          setGiven_name(data.given_name);
          setEmail(data.email);
          setPassword(data.password);
          setOpen(true);
          const user_name=new CognitoUserAttribute({Name:"name",Value:name})
          const user_given_name=new CognitoUserAttribute({Name:"given_name",Value:given_name})
          const user_email=new CognitoUserAttribute({Name:"email",Value:email})
          
            UserPool.signUp(email, password, [user_name,user_given_name,user_email], [], (err, data) => {
              if (err) console.error(err);
              console.log(data);
            });
        };
    const sendVerif=()=>{
      const userData = {
        Username: email,
        Pool: UserPool,
      }
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if(result ==='SUCCESS'){
          switchToLogin();
        }
        if (err) {
          console.log(err);
          return;
        }
    });
  }

    const resendVerif=()=>{
      const userData = {
        Username: email,
        Pool: UserPool,
      }
      console.log(userData)
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.resendConfirmationCode(function(err, result) {console.log(err,result)
        if (err) {
          console.log(err);
          return;
        }});
    }
      
    
      
    return (
      <BoxContainer>
        <FormContainer onSubmit={handleSubmit(onSubmit)} >
        
          <ValidationCodeDialog open={open} setOpen={setOpen} sendVerif={sendVerif} setCode={setCode} code={code} resendCode={resendVerif}/>

            <Input type="text"  placeholder="Nom"
            {...register("name")}
            /* onChange={(e)=>setName(e.target.value)} */ />
            <Input type="text"  placeholder="Prénom"
            {...register("given_name")}
            //value={given_name}
            /* onChange={(e)=>setGiven_name(e.target.value)} */
            />
            <Input   type="email"  placeholder="Email" 
            {...register("email")}
             //value={email} 
            /* onChange={(e)=>setEmail(e.target.value)} *//>
            <Input type="password" placeholder="Mot de passe"
            {...register("password")}
            //value={password} 
            /* onChange={(e)=>CheckValidation(e)} *//> 
            <Input type="password" placeholder="Confirmer mot de passe"
            {...register("comfirmPassword")}/>

            {errors.name?.message && (<SpanAlert><HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>{errors.name?.message}</SpanAlert>)}
            {errors.given_name?.message && (<SpanAlert><HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>{errors.given_name?.message}</SpanAlert>)} 
            {errors.email?.message && (<SpanAlert><HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>{errors.email?.message}</SpanAlert>)} 
            {errors.password?.message && (<SpanAlert><HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>{errors.password?.message}</SpanAlert>)} 
            {errors.comfirmPassword?.message && (<SpanAlert><HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>{errors.comfirmPassword?.message}</SpanAlert>)}     
          <MutedLink className="my-2" href="#">Mot de passe oublié?</MutedLink>
        
          <SubmitButton type="submit">S'enregistrer</SubmitButton>
        </FormContainer>
        <MutedLink className="my-2" >
          Vous avez déjà un compte ?
          <BoldLink  onClick={switchToLogin}>
            Se connecter
          </BoldLink>
        </MutedLink>
        </BoxContainer>
    )
};
