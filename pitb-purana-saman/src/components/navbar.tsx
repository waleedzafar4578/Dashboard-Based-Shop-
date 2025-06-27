import { ReactNode } from "react";
import "../style/navbar.css";
interface navprops{
    tabs?:ReactNode;
    logo?:ReactNode;
    profile?:ReactNode;
}


function Navbar({tabs,logo,profile}:navprops) {
  return(
    <div className="navbar">
        {logo && <div>{logo}</div>}
        {tabs && <div style={{marginTop:'100%'}}>{tabs}</div>}
        {profile && <div>{profile}</div>}
    </div>
  );
}

export default Navbar;