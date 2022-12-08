
import React, { useContext } from "react";
import { AccountContext } from "../../hooks/Global/context/LoginContext";
import  {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  
} from "./common";



export function RegisterForm(props:any) {
    const { switchToLogin } = useContext(AccountContext);
  
    return (
      <BoxContainer>
        <FormContainer>
            <Input type="text" name="lastname" placeholder="Nom" />
            <Input type="text" name="fristname"placeholder="Prénom" />
            <Input type="email" name="mail" placeholder="Email" />
            <Input type="password" name="password" placeholder="Mot de passe" />
            <Input type="password" name="comfirmPassword" placeholder="Comfirmer mot de passe" />
        </FormContainer>
  
        <MutedLink className="my-2" href="#">Mot de passe oublié?</MutedLink>
      
        <SubmitButton type="submit">S'enregistrer</SubmitButton>
        <MutedLink className="my-2" href="#">
          Vous avez déjà un compte ?{" "}
          <BoldLink href="#" onClick={switchToLogin}>
            Se connecter
          </BoldLink>
        </MutedLink>
        </BoxContainer>
    )
};