import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // adjust path as needed

const LoginPage = () => {
  const { login, error: authError, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Email and password are required.');
      return;
    }

    try {
      const user = await login(email, password);
      setSuccess(true);
      setTimeout(() => {
        // Navigate is handled inside login, but in case of delay:
        if (user.role === 'admin') navigate('/admin');
        else if (user.role === 'resident') navigate('/resident');
        else navigate('/');
      }, 1200);
    } catch {
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2
          className="text-3xl font-extrabold text-white text-center mb-8 select-none"
          tabIndex={-1}
          aria-live="polite"
        >
          Login
        </h2>

        {(formError || authError) && (
          <div
            className="bg-red-700 bg-opacity-30 text-red-300 px-4 py-3 rounded mb-6 font-semibold text-center select-none"
            role="alert"
          >
            {formError || authError}
          </div>
        )}

        {success && (
          <div
            className="bg-green-700 bg-opacity-40 text-green-300 px-4 py-3 rounded mb-6 font-semibold text-center select-none animate-fadeIn"
            role="alert"
          >
            Login Successful! Redirecting...
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-gray-300 font-medium select-none"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              aria-describedby="emailHelp"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-gray-300 font-medium select-none"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              aria-describedby="passwordHelp"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg transition cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400`}
            aria-busy={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center select-none">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-400 underline transition"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
