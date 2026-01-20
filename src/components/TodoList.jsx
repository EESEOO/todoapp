import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, folders, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <div className="empty-icon">📝</div>
        <p className="empty-message">할일이 없습니다</p>
        <p className="empty-hint">새 할일을 추가해보세요</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          folders={folders}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
