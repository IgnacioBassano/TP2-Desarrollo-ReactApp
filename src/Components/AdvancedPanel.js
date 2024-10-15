// AdvancedPanel.js
import React from 'react';

const AdvancedPanel = ({
  passwordLength,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSpecialChars,
  onPasswordLengthChange,
  onIncludeUppercaseChange,
  onIncludeLowercaseChange,
  onIncludeNumbersChange,
  onIncludeSpecialCharsChange,
}) => {
  return (
    <div className="advanced-panel">
      <div className="options">
        <label>
          Largo de la contraseña:
          <input
            type="number"
            value={passwordLength}
            onChange={(e) => onPasswordLengthChange(parseInt(e.target.value, 10))}
            min="8"
            max="20"
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => onIncludeUppercaseChange(e.target.checked)}
          />
          Incluir letras mayúsculas
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => onIncludeLowercaseChange(e.target.checked)}
          />
          Incluir letras minúsculas
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => onIncludeNumbersChange(e.target.checked)}
          />
          Incluir números
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={(e) => onIncludeSpecialCharsChange(e.target.checked)}
          />
          Incluir caracteres especiales
        </label>
      </div>
    </div>
  );
};

export default AdvancedPanel;