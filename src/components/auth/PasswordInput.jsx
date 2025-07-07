import { useState } from 'react';

const PasswordInput = ({ value, onChange, error, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`input-group ${error ? 'error' : ''}`}>
      <label htmlFor="password">Password</label>
      <div className="password-wrapper">
        <input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby="password-error"
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>
      {error && (
        <span id="password-error" className="error-text">
          {error}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;