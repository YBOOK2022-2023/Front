import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import  {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SpanAlert,
  SubmitButton,
} from "./common";
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { AccountContext } from "../../hooks/Global/context/LoginContext";
import { useForm ,Resolver} from "react-hook-form";
import{yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CognitoUser ,AuthenticationDetails} from "amazon-cognito-identity-js";
import { UserPool } from "../../hooks/Global/UserPool";
import { UserAccountProvider ,UserAccountContext} from "../../hooks/Global/context/UserAccount";
import { render } from "@testing-library/react";

const schema = yup.object().shape({
  email: yup.string().email().required("Veuillez saisir un email"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        " Au moins 6 Caratères,1 majuscule,1 minuscule, 1 chiffre et 1 caractère spécial"
    )
    .required('Veuillez saisir un mot de passe'),
});
interface MyFieldsLogin{
  name:string;
  given_name:string;
  email:string;
  password:string;
  comfirmPassword:string;
}

export function LoginForm(props:any) {
  const { switchToRegister,switchToForgotPassword } = useContext(AccountContext);
  const { register, handleSubmit, formState: { errors } } = useForm<MyFieldsLogin>({
    resolver: yupResolver(schema),
  });
  //****hooks
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isError,setIsError] = React.useState(true);
  const [openToast,setOpenToast] = React.useState(false);
  const [errorMessage,setErrorMessage] = React.useState("");
  //********/ hooks
  const {authenticate} = useContext(UserAccountContext);
  const {getSession} = useContext(UserAccountContext);
  
  const onSubmit = (data:MyFieldsLogin) => { 
    
    setEmail(data.email);
    setPassword(data.password);
   
      
         authenticate(data.email,data.password)
          .then((data)=>{
            console.log("data:",data)
            setIsError(false);
            setErrorMessage("Connexion réussie");
            setOpenToast(true);
          })
          .catch((error)=>{
            setIsError(true);
            setErrorMessage(error.message);
            setOpenToast(true);
            console.log("error:",error.message)
          })
          
    getSession();
   
   
  }
   const handleCloseToast = () => {
      setOpenToast(false);
    };
    
    
  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {isError ? <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'left' }}  open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
           <Alert onClose={handleCloseToast} severity='error'  sx={{ width: '100%' }} >
               {errorMessage}
           </Alert>
          </Snackbar> : <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'left' }}  open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
              
              <Alert onClose={handleCloseToast} severity='success'  sx={{ width: '100%' }} >
                  {errorMessage}
              </Alert>
          </Snackbar>}
        <Input type="email" placeholder="Email"
        {...register("email")} />
        <Input type="password" placeholder="Mot de passe"
        {...register("password")} />
        {errors.email?.message && (<SpanAlert><HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>{errors.email?.message}</SpanAlert>)}
        {errors.password?.message && (<SpanAlert><HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>{errors.password?.message}</SpanAlert>)}
       <BoldLink className="my-2" href="#" onClick={switchToForgotPassword}>Mot de passe oublié?</BoldLink>
        
      <SubmitButton type="submit">Connexion</SubmitButton>
      </FormContainer>

     
      <MutedLink className="my-2" >
        Pas de compte ? 
      </MutedLink>
        <BoldLink href="#" onClick={switchToRegister}>
          Créer un compte
        </BoldLink>
      
      </BoxContainer>
  );

}