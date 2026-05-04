import { useState } from 'react';
import { authApi } from './api';
import { PasswordStrength } from './components/PasswordStrength';

type Tab = 'login' | 'register' | 'reset';

const TAB_LABELS: Record<Tab, string> = { login: 'Login', register: 'Register', reset: 'Reset Password' };

export default function App() {
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const switchTab = (t: Tab) => { setTab(t); setMessage(''); setError(''); setEmail(''); setPassword(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); setError('');
    setLoading(true);
    try {
      let res;
      if (tab === 'login') res = await authApi.login(email, password);
      else if (tab === 'register') res = await authApi.register(email, password);
      else res = await authApi.resetPassword(email, password);

      if (res.success) {
        if (res.data && 'token' in res.data) localStorage.setItem('token', res.data.token);
        setMessage(tab === 'reset' ? 'Password updated successfully!' : `${TAB_LABELS[tab]} successful!`);
        setEmail(''); setPassword('');
      } else {
        setError(res.error?.message ?? 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const card: React.CSSProperties = {
    background: 'white', padding: '2.5rem', borderRadius: '12px',
    width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  };
  const input: React.CSSProperties = {
    display: 'block', width: '100%', padding: '12px',
    marginBottom: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '15px'
  };

  return (
    <div style={card}>
      <h2 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '22px' }}>Auth System</h2>
      <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px', marginBottom: '1.5rem' }}>Round 3 — Maximum Precision</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        {(['login', 'register', 'reset'] as Tab[]).map(t => (
          <button key={t} onClick={() => switchTab(t)}
            style={{ flex: 1, padding: '8px 4px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #e5e7eb',
              background: tab === t ? '#4f46e5' : '#f9fafb', color: tab === t ? 'white' : '#374151', fontSize: '12px', fontWeight: tab === t ? 600 : 400 }}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input style={input} type="email" placeholder="Email address" value={email}
          onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        <input style={input} type="password" placeholder={tab === 'reset' ? 'New password' : 'Password'}
          value={password} onChange={e => setPassword(e.target.value)} required autoComplete={tab === 'login' ? 'current-password' : 'new-password'} />

        {tab !== 'login' && <PasswordStrength password={password} />}

        <button type="submit" disabled={loading}
          style={{ width: '100%', padding: '12px', background: loading ? '#a5b4fc' : '#4f46e5',
            color: 'white', border: 'none', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '15px', fontWeight: 600 }}>
          {loading ? 'Loading...' : TAB_LABELS[tab]}
        </button>
      </form>

      {message && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '6px', color: '#15803d', fontSize: '14px' }}>
          {message}
        </div>
      )}
      {error && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '6px', color: '#dc2626', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {tab === 'login' && (
        <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px', color: '#6b7280' }}>
          Note: 5 failed attempts locks the account for 1 hour
        </p>
      )}
    </div>
  );
}
