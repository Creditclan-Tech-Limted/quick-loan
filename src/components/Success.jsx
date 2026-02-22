import React from "react";
import Drawer from "./global/Drawer";

const Success = () => {
  return (
    <>
      <Drawer>
        <div className="pt-70">
          <img
            style={{
              width: "350px",
              marginLeft: "-5rem",
              marginBottom: "-3rem",
            }}
            src="/assets/images/Young and happy-bro.svg"
            alt=""
          />
          <p className="redirect-text font-30 text-deep-blue font-weight-bold">
            Congratulations, <br />
            We are good to go
          </p>
        </div>
        <button onClick={onDone} className="call-number btn btn-blue-full mt-5">
          Proceed to eligibility
        </button>
      </Drawer>
    </>
  );
};

export default Success;
