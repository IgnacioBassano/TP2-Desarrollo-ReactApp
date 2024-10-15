// PasswordInput.js
import React from 'react';

const PasswordInput = ({ password, isPasswordVisible, onPasswordChange }) => {
  return (
    <input
      type={isPasswordVisible ? 'text' : 'password'}
      className="input"
      value={password}
      placeholder="Ingrese una contraseña"
      onChange={(e) => onPasswordChange(e.target.value)} 
    />
  );
};

export default PasswordInput;