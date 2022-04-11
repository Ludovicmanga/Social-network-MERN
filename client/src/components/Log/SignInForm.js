import React, { useState } from 'react';
import axios from 'axios';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailError = document.querySelector('.email.error');
  const passwordError = document.querySelector('.password.error');


  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      "method": "post",
      "url": `${process.env.REACT_APP_API_URL}/api/user/login`,
      withCredentials: true,
      data: {
        email,
        password
      }
    })
      .then(res => {
        if(res.data.formattedErrors) {
          emailError.innerHTML = res.data.formattedErrors.email;
          passwordError.innerHTML = res.data.formattedErrors.password;
        } else {
          window.location = "/";
        }
      })
      .catch(error => { console.log(error) })
  }

  return (
    <form action='' onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor='email'>Email</label>
      <br />
      <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
      <br />
      <div className='email error'></div>
      <label htmlFor='password'>Password</label>
      <br />
      <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
      <br />
      <div className='password error'></div>

      <input type="submit" value="Se connecter" />
    </form>
  )
}
