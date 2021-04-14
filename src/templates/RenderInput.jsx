import React, { useState } from "react";

const RenderInput = ({ id, label, type, sendInput }) => {
  const [input, setInput] = useState("");

  const handleOnChange = (e) => {
    setInput(e.target.value);
    sendInput(e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="form-control"
        autoFocus
        type={type}
        onChange={(e) => handleOnChange(e)}
        value={input}
      />
    </div>
  );
};

export default RenderInput;
