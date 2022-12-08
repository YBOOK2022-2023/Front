import React, { useContext } from "react";
import  {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { AccountContext } from "../../hooks/Global/context/LoginContext";




export function LoginForm(props:any) {
  const { switchToRegister } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Mot de passe" />
      </FormContainer>

      <MutedLink className="my-2" href="#">Mot de passe oublié?</MutedLink>
    
      <SubmitButton type="submit">Connexion</SubmitButton>
      <MutedLink className="my-2" href="#">
        Pas de compte ?{" "}
        <BoldLink href="#" onClick={switchToRegister}>
          Créer un compte
        </BoldLink>
      </MutedLink>
      </BoxContainer>
  );
}