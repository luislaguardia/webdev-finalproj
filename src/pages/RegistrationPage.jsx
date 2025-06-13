import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../services/UserService'; // ✅ adjust path if needed

export default function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      await createUser({ email, password });
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('Email already in use.');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Register</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.inputField}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.inputField}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.inputField}
          />
          <button type="submit" style={styles.submitBtn}>Register</button>
        </form>

        <div style={styles.registerText}>
          <p>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f7f7f7',
    height: '85dvh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '40px 50px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputField: {
    padding: '16px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  submitBtn: {
    padding: '14px',
    fontSize: '18px',
    backgroundColor: '#4A90E2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontWeight: '500',
  },
  registerText: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#4A90E2',
    textDecoration: 'none',
    fontWeight: '500',
    marginTop: '10px',
    display: 'inline-block',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '15px',
  },
};