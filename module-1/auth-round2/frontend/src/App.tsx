import { useState } from 'react';
import { authApi } from './api';

type Tab = 'login' | 'register' | 'reset';

export default function App() {
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => { setMessage(''); setError(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    setLoading(true);
    try {
      let res;
      if (tab === 'login') res = await authApi.login(email, password);
      else if (tab === 'register') res = await authApi.register(email, password);
      else res = await authApi.resetPassword(email, password);

      if (res.success) {
        if (res.data?.token) localStorage.setItem('token', res.data.token);
        setMessage(tab === 'reset' ? 'Password updated successfully!' : `${tab === 'login' ? 'Login' : 'Registration'} successful!`);
      } else {
        setError(res.error?.message || 'Something went wrong');
      }
    } catch {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabs: Tab[] = ['login', 'register', 'reset'];
  const labels = { login: 'Login', register: 'Register', reset: 'Reset Password' };

  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '400px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Auth System — Round 2</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => { setTab(t); reset(); }}
            style={{ flex: 1, padding: '8px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc', background: tab === t ? '#333' : '#f5f5f5', color: tab === t ? 'white' : '#333', fontSize: '13px' }}>
            {labels[t]}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input type="password" placeholder={tab === 'reset' ? 'New Password' : 'Password'} value={password} onChange={e => setPassword(e.target.value)} required
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
        {tab !== 'login' && (
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
            Password: min 8 chars, 1 uppercase, 1 number
          </p>
        )}
        <button type="submit" disabled={loading}
          style={{ width: '100%', padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '15px' }}>
          {loading ? 'Loading...' : labels[tab]}
        </button>
      </form>
      {message && <p style={{ marginTop: '12px', color: 'green', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ marginTop: '12px', color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}
