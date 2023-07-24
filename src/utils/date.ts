// 获取常用时间
import dayjs from 'dayjs';

export const LAST_7_DAYS = [
  dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
];

export const LAST_30_DAYS = [
  dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
  dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
];

export const LAST_3_MONTHS = [
  dayjs().subtract(3, 'months').format('YYYY-MM-DD'),
  dayjs().format('YYYY-MM-DD'),
];

export const LAST_6_MONTHS = [
  dayjs().subtract(6, 'months').format('YYYY-MM-DD'),
  dayjs().format('YYYY-MM-DD'),
];

export const LAST_12_MONTHS = [
  dayjs().subtract(12, 'months').format('YYYY-MM-DD'),
  dayjs().format('YYYY-MM-DD'),
];

export const YESTERDAY = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

export const CURRENT_DAY = dayjs().format('YYYY-MM-DD');

export const CURRENT_MONTH_FIRST_DAY = dayjs().startOf('month').format('YYYY-MM-DD');

// 获取当前月份包含的天数
export const MONTH_DAY = dayjs().daysInMonth();