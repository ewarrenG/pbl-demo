import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './Home.css';

function Header(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <ul className="nav nav-pills ml-5 mr-5 w-100">
          <li className="nav-item ">
            <img id="logoUrlNav" src={props.logoUrl} />
          </li>
          <li className="nav-item ml-3">
            <a className="nav-link">{props.companyName}</a>
          </li>
          <li className="nav-item dropdown ml-auto ">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Settings
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <a className="dropdown-item">
                <GoogleLogout
                  clientId={props.clientId}
                  buttonText={props.buttonText}
                  onLogoutSuccess={() => { props.onLogoutSuccess({}) }} //send blank object
                >
                </GoogleLogout>
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;