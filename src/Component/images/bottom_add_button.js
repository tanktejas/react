import React from "react";
import "./button.css";
import { useAuth0 } from "@auth0/auth0-react"; 

function Navbar({ state, setstate }) { 

  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <>
      <div 
        className="button1"
        onClick={() => {
          if (isAuthenticated) {
            setstate(true);
          } else {
            loginWithRedirect();  
          }
        }}                           
      >  
        ADD IMAGE
      </div>
    </>
  );
}

export default Navbar;
