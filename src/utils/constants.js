// 기본 폴더 정의
export const DEFAULT_FOLDERS = [
  { id: 'work', name: '업무', color: '#FFB4B4' },
  { id: 'personal', name: '개인', color: '#B4D4FF' },
  { id: 'study', name: '공부', color: '#C4FAC4' },
  { id: 'other', name: '기타', color: '#FFE4B4' }
];

// 카테고리 상수
export const CATEGORIES = {
  TODAY: 'today',
  THIS_WEEK: 'thisWeek',
  LATER: 'later'
};

// 카테고리 라벨
export const CATEGORY_LABELS = {
  [CATEGORIES.TODAY]: '오늘',
  [CATEGORIES.THIS_WEEK]: '이번주',
  [CATEGORIES.LATER]: '나중에'
};

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  TODOS: 'todo_manager_todos',
  FOLDERS: 'todo_manager_folders'
};
