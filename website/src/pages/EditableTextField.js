import React, { useState } from 'react';

function EditableTextField() {
  const [value, setValue] = useState('Speaker1');
  const [isEditable, setIsEditable] = useState(false);
  const [tempValue, setTempValue] = useState('');

  const handleDoubleClick = () => {
    setTempValue(value);
    setIsEditable(true);
  };

  const handleSave = () => {
    setValue(tempValue);
    setIsEditable(false);
  };

  const handleCancel = () => {
    setIsEditable(false);
    setTempValue(value);
  };

  const handleTempValueChange = (event) => {
    setTempValue(event.target.value);
  };

  return (
    <div>
      {isEditable ? (
        <div>
          <input
            type="text"
            value={tempValue}
            onChange={handleTempValueChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <span onDoubleClick={handleDoubleClick}>{value}</span>
      )}
    </div>
  );
}

export default EditableTextField