import React, { useState } from "react";

const RenderSelection = ({ id, label, list, sendInput }) => {
  const [input, setInput] = useState("");

  const handleOnChange = (e) => {
    setInput(e.target.value);
    sendInput(e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select
        className="form-control"
        id={id}
        name={id}
        onChange={(e) => handleOnChange(e)}
        value={input}
      >
        <option></option>
        {list.map((item) => (
          <option key={id + item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RenderSelection;
