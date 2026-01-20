import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DEFAULT_FOLDERS, STORAGE_KEYS, CATEGORIES } from './utils/constants';
import { filterTodosByCategory } from './utils/dateUtils';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import CategoryTabs from './components/CategoryTabs';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
  // 로컬 스토리지와 연동된 상태
  const [todos, setTodos] = useLocalStorage(STORAGE_KEYS.TODOS, []);
  const [folders, setFolders] = useLocalStorage(STORAGE_KEYS.FOLDERS, DEFAULT_FOLDERS);
  
  // UI 상태
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.TODAY);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 할일 추가
  const addTodo = (todo) => {
    const newTodo = {
      ...todo,
      id: Date.now().toString(),
      completed: false,
      createdAt: Date.now()
    };
    setTodos([...todos, newTodo]);
    setIsFormOpen(false);
  };

  // 할일 수정
  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  // 할일 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 할일 완료 토글
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 폴더 추가
  const addFolder = (folder) => {
    const newFolder = {
      ...folder,
      id: Date.now().toString()
    };
    setFolders([...folders, newFolder]);
  };

  // 폴더 삭제
  const deleteFolder = (id) => {
    setFolders(folders.filter(folder => folder.id !== id));
    // 해당 폴더의 할일들을 기타 폴더로 이동
    setTodos(todos.map(todo =>
      todo.folderId === id ? { ...todo, folderId: 'other' } : todo
    ));
  };

  // 할일 수정 시작
  const startEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  // 필터링된 할일 목록
  const getFilteredTodos = () => {
    let filtered = todos;
    
    // 폴더 필터
    if (selectedFolder) {
      filtered = filtered.filter(todo => todo.folderId === selectedFolder);
    }
    
    // 카테고리 필터
    filtered = filterTodosByCategory(filtered, selectedCategory);
    
    return filtered;
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="app">
      {/* 헤더 */}
      <header className="app-header">
        <button 
          className="hamburger-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="메뉴 토글"
        >
          ☰
        </button>
        <h1 className="app-title">할일 관리</h1>
        <button 
          className="add-btn"
          onClick={() => {
            setEditingTodo(null);
            setIsFormOpen(true);
          }}
        >
          + 새 할일
        </button>
      </header>

      <div className="app-container">
        {/* 사이드바 */}
        <Sidebar
          folders={folders}
          todos={todos}
          selectedFolder={selectedFolder}
          onSelectFolder={setSelectedFolder}
          onAddFolder={addFolder}
          onDeleteFolder={deleteFolder}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* 메인 콘텐츠 */}
        <main className="main-content">
          {/* 대시보드 */}
          <Dashboard todos={todos} folders={folders} />

          {/* 카테고리 탭 */}
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            todos={todos}
          />

          {/* 할일 목록 */}
          <TodoList
            todos={filteredTodos}
            folders={folders}
            onToggle={toggleTodo}
            onEdit={startEditTodo}
            onDelete={deleteTodo}
          />
        </main>
      </div>

      {/* 할일 추가/수정 폼 모달 */}
      {isFormOpen && (
        <TodoForm
          todo={editingTodo}
          folders={folders}
          onSave={editingTodo ? updateTodo : addTodo}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTodo(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
