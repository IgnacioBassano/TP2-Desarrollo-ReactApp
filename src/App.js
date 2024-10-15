import React, { useState } from 'react';
import './App.css';
import PasswordInput from './Components/PasswordInput';
import PasswordStrength from './Components/PasswordStrength';
import AdvancedPanel from './Components/AdvancedPanel';

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
    
    if (password.length <= 8) return 'poco-segura'; 
    if (password.length >= 8 && password.length <= 11) return 'segura'; 
    if (password.length >= 12) {
     
      const hasNumbers = /\d/.test(password);
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);

      if (hasNumbers && hasSpecialChars && hasUpperCase && hasLowerCase) {
        return 'muy-segura';
      }
      return 'segura'; 
    }
    return 'poco-segura'; 
  };

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    setPasswordStrength(evaluatePasswordStrength(newPassword)); 
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
      <PasswordInput
        password={password}
        isPasswordVisible={isPasswordVisible}
        onPasswordChange={handlePasswordChange}
      />
      <div className="buttons">
        <button className="toggle-password" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? 'Ocultar' : 'Mostrar'} Contraseña
        </button>
        <button className="generate-password" onClick={generateRandomPassword}>
          Generar Contraseña Aleatoria
        </button>
        <button className="copy-password" onClick={copyToClipboard}>
          Copiar Contraseña
        </button>
      </div>

      {showCopiedMessage && <p className="success-message">¡Contraseña copiada al portapapeles!</p>}
      <PasswordStrength strength={passwordStrength} />

      <button className="toggle-advanced-panel" onClick={() => setShowAdvancedPanel(!showAdvancedPanel)}>
        {showAdvancedPanel ? 'Ocultar' : 'Mostrar'} Panel Avanzado
      </button>

      {showAdvancedPanel && (
        <AdvancedPanel
          passwordLength={passwordLength}
          includeUppercase={includeUppercase}
          includeLowercase={includeLowercase}
          includeNumbers={includeNumbers}
          includeSpecialChars={includeSpecialChars}
          onPasswordLengthChange={setPasswordLength}
          onIncludeUppercaseChange={setIncludeUppercase}
          onIncludeLowercaseChange={setIncludeLowercase}
          onIncludeNumbersChange={setIncludeNumbers}
          onIncludeSpecialCharsChange={setIncludeSpecialChars}
        />
      )}
    </div>
  );
}

export default App;