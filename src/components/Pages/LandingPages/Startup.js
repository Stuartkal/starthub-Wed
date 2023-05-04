import React from "react";
import { Metrics, LeanCanvas, OKRs, DiagnosticsTest } from "../../Paths";
const Startup = ({ index, visible }) => {
  return (
    <div style={{ width: "100%" }}>
      {index === 0 ? <Metrics visible={visible} /> : null}
      {index === 1 ? <OKRs /> : null}
      {index === 2 ? <LeanCanvas /> : null}
      {index === 3 ? <DiagnosticsTest /> : null}
    </div>
  );
};

export default Startup;
