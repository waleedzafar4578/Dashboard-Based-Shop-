import '../style/door.css';
import React, { useState } from 'react';

function Door() {
  const [state, setState] = useState(false);
  const [bLogin, setBLogin] = useState(false);
  const toggle = () => {
    setState(!state);
  };
  const login = () => {
    setBLogin(!bLogin);
  };
  return (
    <div className="App">
      <div className="door-container">
        <div class="door-base">
          <div className="door-back">
            <img className="back-img" src={"../../public/flow.png"} alt={"image"}></img>
            <div className="door-base-texture">
              {!state && (
                <div className="login">
                  <input type={"text"} placeholder="UserName" />
                  <input type={"password"} placeholder="Password" />
                  <button
                    onClick={login}
                    style={{ backgound: "transparent", marginLeft: "45%" }}
                  >
                    Login
                  </button>
                </div>
              )}
              <div className={state ? "door-hover" : "door"}>
                <div className="texture">
                  {bLogin && (
                    <div className="handle" onClick={toggle}>
                      <div className="handle-button"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Door;