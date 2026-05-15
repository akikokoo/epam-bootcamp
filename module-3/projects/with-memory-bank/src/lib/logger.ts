// Structured logger — always use this, never console.log in production code
const logger = {
  info: (message: string, meta?: Record<string, unknown>) =>
    console.info(JSON.stringify({ level: 'info', message, ...meta, ts: new Date().toISOString() })),

  warn: (message: string, meta?: Record<string, unknown>) =>
    console.warn(JSON.stringify({ level: 'warn', message, ...meta, ts: new Date().toISOString() })),

  error: (message: string, meta?: Record<string, unknown>) =>
    console.error(JSON.stringify({ level: 'error', message, ...meta, ts: new Date().toISOString() })),

  debug: (message: string, meta?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(JSON.stringify({ level: 'debug', message, ...meta, ts: new Date().toISOString() }));
    }
  },
};

export { logger };
