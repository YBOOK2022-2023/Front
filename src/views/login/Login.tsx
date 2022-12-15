import React, { useContext } from "react";
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
  const { switchToRegister } = useContext(AccountContext);
  const { register, handleSubmit, formState: { errors } } = useForm<MyFieldsLogin>({
    resolver: yupResolver(schema),
  });
  //****hooks
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //********/ hooks
  const {authenticate} = useContext(UserAccountContext);
  const onSubmit = (data:MyFieldsLogin) => { 
    console.log(data);
    setEmail(data.email);
    setPassword(data.password);
    authenticate(data.email,data.password)

   
  }
  
  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" placeholder="Email"
        {...register("email")} />
        <Input type="password" placeholder="Mot de passe"
        {...register("password")} />
        {errors.name?.message && (<SpanAlert><HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>{errors.name?.message}</SpanAlert>)}
        {errors.email?.message && (<SpanAlert><HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>{errors.email?.message}</SpanAlert>)}
       <MutedLink className="my-2" href="#">Mot de passe oublié?</MutedLink>
        
      <SubmitButton type="submit">Connexion</SubmitButton>
      </FormContainer>

     
      <MutedLink className="my-2" href="#">
        Pas de compte ?{" "}
        <BoldLink href="#" onClick={switchToRegister}>
          Créer un compte
        </BoldLink>
      </MutedLink>
      </BoxContainer>
  );
}