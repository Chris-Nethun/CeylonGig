import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const dismiss = useCallback((id) => setNotifications((items) => items.filter((item) => item.id !== id)), []);
  const notify = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setNotifications((items) => [...items, { id, message, type }]);
    window.setTimeout(() => dismiss(id), 4500);
  }, [dismiss]);
  const value = useMemo(() => ({ notifications, notify, dismiss }), [notifications, notify, dismiss]);
  return <NotificationContext.Provider value={value}>
    {children}
    <div className="toast-stack" aria-live="polite">
      {notifications.map((item) => <div key={item.id} className={`toast toast-${item.type}`}>
        <span>{item.message}</span><button aria-label="Dismiss" onClick={() => dismiss(item.id)}>×</button>
      </div>)}
    </div>
  </NotificationContext.Provider>;
}

export function useNotifications() {
  const value = useContext(NotificationContext);
  if (!value) throw new Error('useNotifications must be used within NotificationProvider.');
  return value;
}
