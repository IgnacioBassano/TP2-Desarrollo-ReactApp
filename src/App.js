import React, { useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showAdvancedPanel, setShowAdvancedPanel] = useState(false);
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  const evaluatePasswordStrength = (password) => {
    if (password.length < 8) return 'poco-segura';

    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (password.length > 12 && hasNumbers && hasSpecialChars && hasUpperCase && hasLowerCase) {
      return 'muy-segura';
    } else if (password.length >= 8 && (hasNumbers || hasSpecialChars || hasUpperCase)) {
      return 'segura';
    } else {
      return 'poco-segura';
    }
  };

  const generateRandomPassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let availableChars = '';
    if (includeUppercase) availableChars += uppercaseChars;
    if (includeLowercase) availableChars += lowercaseChars;
    if (includeNumbers) availableChars += numbers;
    if (includeSpecialChars) availableChars += specialChars;

    if (availableChars.length === 0) return;

    let randomPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      randomPassword += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
    }
    setPassword(randomPassword);
    setPasswordStrength(evaluatePasswordStrength(randomPassword));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 3000);
    });
  };

  return (
    <div className="container">
      <h1>Fortaleza de Contraseña</h1>

      <input
        type={isPasswordVisible ? 'text' : 'password'}
        className="input"
        value={password}
        placeholder="Ingrese una contraseña"
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordStrength(evaluatePasswordStrength(e.target.value));
        }}
      />

      <div className="buttons">
        <button
          className="toggle-password"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? 'Ocultar' : 'Mostrar'} Contraseña
        </button>

        <button
          className="generate-password"
          onClick={generateRandomPassword}
        >
          Generar Contraseña Aleatoria
        </button>

        <button
          className="copy-password"
          onClick={copyToClipboard}
        >
          Copiar Contraseña
        </button>
      </div>

      {showCopiedMessage && (
        <p className="success-message">¡Contraseña copiada al portapapeles!</p>
      )}

      <p className={`password-strength ${passwordStrength}`}>
        {passwordStrength === 'poco-segura' ? 'Poco segura' : 
         passwordStrength === 'segura' ? 'Segura' : 
         'Muy segura'}
      </p>

      <button
        className="toggle-advanced-panel"
        onClick={() => setShowAdvancedPanel(!showAdvancedPanel)}
      >
        {showAdvancedPanel ? 'Ocultar' : 'Mostrar'} Panel Avanzado
      </button>

      <div
        className="advanced-panel"
        style={{ display: showAdvancedPanel ? 'block' : 'none' }}
      >
        <div className="options">
          <label>
            Largo de la contraseña:
            <input
              type="number"
              value={passwordLength}
              onChange={(e) => setPasswordLength(parseInt(e.target.value, 10))}
              min="8"
              max="20"
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Incluir letras mayúsculas
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            Incluir letras minúsculas
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Incluir números
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeSpecialChars}
              onChange={(e) => setIncludeSpecialChars(e.target.checked)}
            />
            Incluir caracteres especiales
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;

