import { UsageData } from '../types';

const USAGE_KEY = 'title_generator_usage';
const MAX_DAILY_QUERIES = 8;

export const getUsageData = (): UsageData => {
  const stored = localStorage.getItem(USAGE_KEY);
  if (!stored) return { date: new Date().toDateString(), count: 0 };
  return JSON.parse(stored);
};

export const updateUsage = (): boolean => {
  const usage = getUsageData();
  const today = new Date().toDateString();
  
  if (usage.date !== today) {
    const newUsage = { date: today, count: 1 };
    localStorage.setItem(USAGE_KEY, JSON.stringify(newUsage));
    return true;
  }

  if (usage.count >= MAX_DAILY_QUERIES) return false;
  
  const newUsage = { date: today, count: usage.count + 1 };
  localStorage.setItem(USAGE_KEY, JSON.stringify(newUsage));
  return true;
};

export const getRemainingQueries = (): number => {
  const usage = getUsageData();
  const today = new Date().toDateString();
  
  if (usage.date !== today) return MAX_DAILY_QUERIES;
  return Math.max(0, MAX_DAILY_QUERIES - usage.count);
};