import React, { useState } from "react";
import DropDown from "../../components/DropDown/DropDown";

const Infer = () => {
  const options = ["test", "test23"];
  const [option, setOption] = useState(options[0]);
  
  return (
    <DropDown
      text="Select a pipeline"
      options={options}
      onChange={(event) => setOption(event.target.value)}
    />
  );
};

export default Infer;
