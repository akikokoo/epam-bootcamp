import { useEffect } from 'react'

interface Props {
  onClose: () => void
}

const shortcuts = [
  { keys: ['N'], description: 'New task' },
  { keys: ['?'], description: 'Show/hide shortcuts' },
  { keys: ['Esc'], description: 'Close modal / panel' },
  { keys: ['Enter'], description: 'Confirm / submit form' },
]

export function ShortcutsPanel({ onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === '?') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="shortcuts-backdrop" onClick={onClose}>
      <div className="shortcuts-panel" onClick={e => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h3>Keyboard Shortcuts</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <ul className="shortcuts-list">
          {shortcuts.map(({ keys, description }) => (
            <li key={description} className="shortcut-row">
              <div className="shortcut-keys">
                {keys.map(k => <kbd key={k}>{k}</kbd>)}
              </div>
              <span className="shortcut-desc">{description}</span>
            </li>
          ))}
        </ul>
        <p className="shortcuts-hint">Press <kbd>?</kbd> or <kbd>Esc</kbd> to close</p>
      </div>
    </div>
  )
}
