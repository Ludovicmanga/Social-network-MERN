import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LeftNav() {
  return (
    <div className='left-nav-container'>
      <div className='icons'>
          <div className='icons-bis'>
              <NavLink to='/' exact className={(navData) => (navData.isActive ? 'active-left-nav' : 'none')}>
                  <img src="./img/icons/home.svg" alt="home" />
              </NavLink>
              <br />
              <NavLink to='/trending' exact className={(navData) => (navData.isActive ? 'active-left-nav' : 'none')}>
                  <img src="./img/icons/rocket.svg" alt="trending" />
              </NavLink>
              <br />
              <NavLink to='/profil' exact className={(navData) => (navData.isActive ? 'active-left-nav' : 'none')}>
                  <img src="./img/icons/user.svg" alt="profil" />
              </NavLink>
              <br />
          </div>
      </div>
    </div>
  )
}
