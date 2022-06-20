import React from "react";
import "./Home.css"

const StartEnd = (props) => {
  
  return (
    <div className="container-main" >
      {!props.elStarted ? (
        <>
          {/* start election Again button */}
          {!props.elEnded ? (
            <>
          <div>
                <button type="submit" id="btn">
                  Start Election {props.elEnded ? "Again" : null}
                </button>
              </div>
            </>
          ) : (
            <div className="container-item">
              <center>
                <p>Re-deploy the contract to start election again.</p>
              </center>
            </div>
          )}
          {props.elEnded ? (
            <div className="container-item">
              <center>
                <p>The election ended.</p>
              </center>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div className="container-item">
            <center>
              <p>The election started.</p>
            </center>
          </div>
          <div className="container-item">
            <button
              type="button"
              // onClick={this.endElection}
              onClick={props.endElFn}
              id="btn"
            >
              End
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StartEnd;
