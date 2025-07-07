const RememberMeCheckbox = ({ checked, onChange, disabled }) => {
  return (
    <div className="remember-me">
      <input
        type="checkbox"
        id="remember"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor="remember">Remember me</label>
    </div>
  );
};

export default RememberMeCheckbox;