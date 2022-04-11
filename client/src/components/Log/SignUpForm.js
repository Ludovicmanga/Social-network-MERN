import React, { useState } from 'react';
import axios from 'axios';

export default function SignUpForm() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById('terms');
    const pseudoError = document.querySelector('.pseudo.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const passwordConfirmError = document.querySelector('.password-confirm.error');
    const termsError = document.querySelector('.terms.error');

    document.querySelectorAll('.error').forEach( error => error.innerHTML = "");

    if (password !== controlPassword || !terms.checked ) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
      
      if(!terms.checked)
      termsError.innerHTML = "Veuillez accepter les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/register`,
        data: {
          pseudo,
          email,
          password
        }
      })
        .then(res => {
          if(res.data.formattedErrors) {
            pseudoError.innerHTML = res.data.formattedErrors.pseudo;
            emailError.innerHTML = res.data.formattedErrors.email;
            passwordError.innerHTML = res.data.formattedErrors.password;
          }
        })
        .catch(error => console.log(error))
    }
  }

  return (
    <form action="" onSubmit={handleRegister} id="sign-up-form">
      <label htmlFor="pseudo">Pseudo</label>
      <br />
      <input
        type="text"
        name="pseudo"
        id="pseudo"
        onChange={ (e) => setPseudo(e.target.value)}
        value={pseudo}
      />
      <div className="pseudo error"></div>
      <br />
      <label htmlFor="email">Email</label>
      <br />
      <input type="text"
        name="email"
        id="mail"
        onChange={ (e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={ (e) => setPassword(e.target.value)}
        value={password}
      />  
      <div className="password error"></div>
      <br />
      <label htmlFor="password-conf">Confirmer le mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password-conf"
        onChange={ (e) => setControlPassword(e.target.value)}
        value={controlPassword} 
      />
      <div className="password-confirm error"></div>
      <br />
      <input type="checkbox" id="terms"/>
      <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
      <div className="terms error"></div>
      <input type="submit" value="valider inscription" />
    </form>
  )
}
