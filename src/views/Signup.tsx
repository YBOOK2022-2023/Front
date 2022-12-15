import React,{useState} from 'react';

import { UserPool } from '../hooks/Global/UserPool';

const Signup = () => {
    const [email,setEmail] =useState("");
    const [password,setPassword]=useState("")
    const [comfirmPassword,setComfirmPassword]=useState("")
    const [pseudo,setPseudo]=useState("")

    const onSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
      console.log('submit');
      e.preventDefault();
      UserPool.signUp(email,password,[],[],(err,data)=>{
        if(err){
          console.error(err);
        }
        console.log(data);
        console.log('user name is ');
      });

    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}    
                ></input>
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                ></input>
                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}
export default Signup;