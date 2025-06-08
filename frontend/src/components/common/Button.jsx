// src/components/common/Button.jsx
const Button = ({ children, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export default Button;
