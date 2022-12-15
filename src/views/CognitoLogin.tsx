import React from 'react';
import { CognitoUser,AuthenticationDetails } from 'amazon-cognito-identity-js';
import { UserPool } from '../hooks/Global/UserPool';

const CognitoLogin = () => {
    const [email,setEmail] =React.useState(' ');
    const [password,setPassword]=React.useState(' ')
    const [name,setPseudo]=React.useState(' ')

 

    const onSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const user =new CognitoUser({
            Username:email,
            Pool:UserPool
        });
    
        const authDetails = new AuthenticationDetails({
            Username:email,
            Password:password
        });
console.log('user:',authDetails);
        user.authenticateUser(authDetails,{
            onSuccess:(data)=>{
                console.log('User logged in !!! onSuccess:',data);
            },
            onFailure:(err)=>{
                console.error('onFailure:',err);
            },
            newPasswordRequired:(data)=>{
                console.log('newPasswordRequired:',data);
            }
        })
    };
    
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
export default CognitoLogin;