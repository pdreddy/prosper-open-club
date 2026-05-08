/* eslint-disable no-console */

type LogMeta = Record<string, unknown>;

const formatMeta = (meta?: LogMeta): string => {
  if (!meta) {
    return '';
  }

  try {
    return ` ${JSON.stringify(meta)}`;
  } catch {
    return ' [unserializable-meta]';
  }
};

const log = (level: 'INFO' | 'WARN' | 'ERROR', message: string, meta?: LogMeta): void => {
  const timestamp = new Date().toISOString();
  const formatted = `[${timestamp}] [${level}] ${message}${formatMeta(meta)}`;

  if (level === 'ERROR') {
    console.error(formatted);
    return;
  }

  if (level === 'WARN') {
    console.warn(formatted);
    return;
  }

  console.log(formatted);
};

export const logger = {
  info: (message: string, meta?: LogMeta): void => log('INFO', message, meta),
  warn: (message: string, meta?: LogMeta): void => log('WARN', message, meta),
  error: (message: string, meta?: LogMeta): void => log('ERROR', message, meta),
};
