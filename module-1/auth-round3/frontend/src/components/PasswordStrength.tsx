interface Props { password: string }

export function PasswordStrength({ password }: Props) {
  const checks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: '1 uppercase letter', ok: /[A-Z]/.test(password) },
    { label: '1 number', ok: /[0-9]/.test(password) }
  ];
  if (!password) return null;
  return (
    <ul style={{ listStyle: 'none', marginBottom: '12px' }}>
      {checks.map(c => (
        <li key={c.label} style={{ fontSize: '12px', color: c.ok ? '#16a34a' : '#dc2626', marginBottom: '2px' }}>
          {c.ok ? '✓' : '✗'} {c.label}
        </li>
      ))}
    </ul>
  );
}
