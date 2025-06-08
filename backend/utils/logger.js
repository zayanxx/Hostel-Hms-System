// utils/logger.js
const getTimeStamp = () => new Date().toISOString();

export const logger = {
  info: (...args) => {
    console.log(`[INFO] [${getTimeStamp()}]`, ...args);
  },
  warn: (...args) => {
    console.warn(`[WARN] [${getTimeStamp()}]`, ...args);
  },
  error: (...args) => {
    console.error(`[ERROR] [${getTimeStamp()}]`, ...args);
  },
};