// PasswordStrength.js
import React from 'react';

const PasswordStrength = ({ strength }) => {
  return (
    <p className={`password-strength ${strength}`}>
      {strength === 'poco-segura' ? 'Poco segura' : 
       strength === 'segura' ? 'Segura' : 
       'Muy segura'}
    </p>
  );
};

export default PasswordStrength;