import { CATEGORIES } from './constants';

/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 오늘 날짜 가져오기
 */
export const getToday = () => {
  return formatDate(new Date());
};

/**
 * 날짜 문자열이 오늘인지 확인
 */
export const isToday = (dateString) => {
  if (!dateString) return false;
  return dateString === getToday();
};

/**
 * 날짜 문자열이 이번주인지 확인 (오늘부터 7일 이내)
 */
export const isThisWeek = (dateString) => {
  if (!dateString) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays >= 0 && diffDays <= 7;
};

/**
 * 날짜 문자열이 나중인지 확인 (7일 이후 또는 날짜 없음)
 */
export const isLater = (dateString) => {
  if (!dateString) return true;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 7;
};

/**
 * 할일을 카테고리별로 필터링
 */
export const filterTodosByCategory = (todos, category) => {
  switch (category) {
    case CATEGORIES.TODAY:
      return todos.filter(todo => isToday(todo.dueDate));
    case CATEGORIES.THIS_WEEK:
      return todos.filter(todo => isThisWeek(todo.dueDate));
    case CATEGORIES.LATER:
      return todos.filter(todo => isLater(todo.dueDate));
    default:
      return todos;
  }
};

/**
 * 날짜를 읽기 쉬운 형식으로 포맷 (예: 2026년 1월 20일)
 */
export const formatDateReadable = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}년 ${month}월 ${day}일`;
};

/**
 * 시간을 12시간 형식으로 포맷 (예: 오후 2:00)
 */
export const formatTime = (timeString) => {
  if (!timeString) return '';
  
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const period = hour >= 12 ? '오후' : '오전';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  
  return `${period} ${displayHour}:${minutes}`;
};
