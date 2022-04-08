import React, { useState } from 'react'
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';


export default function Log( props ) {

const [signUpModal, setSignUpModal] = useState(props.signup);
const [signInModal, setSignInModal] = useState(props.signin);

const handleModals = (e) => {
  if (e.target.id == 'register') {
    setSignInModal(modal => modal = false);
    setSignUpModal(modal => modal = true);
  } else if (e.target.id == 'login') {
    setSignInModal(modal => modal = true);
    setSignUpModal(modal => modal = false);
  }
}

  return (
    <div>
      <div className='connection-form'>
        <div className='form-container'>
          <ul>
              <li onClick={handleModals} id="register" className={signUpModal ? "active-btn": null}>S'inscrire</li>
              <li onClick={handleModals} id="login" className={signInModal ? "active-btn": null}>Se connecter</li>
          </ul>
          {signUpModal && <SignUpForm />}
          {signInModal && <SignInForm />}
        </div>
      </div>
    </div>
  )
}
