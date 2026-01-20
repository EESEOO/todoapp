import { formatDateReadable, formatTime } from '../utils/dateUtils';
import './TodoItem.css';

function TodoItem({ todo, folders, onToggle, onEdit, onDelete }) {
  const folder = folders.find(f => f.id === todo.folderId);
  const folderColor = folder ? folder.color : '#FFE4B4';

  return (
    <div 
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      style={{ borderLeftColor: folderColor }}
    >
      <div className="todo-item-main">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        
        <div className="todo-content">
          <h3 className="todo-title">{todo.title}</h3>
          
          {todo.memo && (
            <p className="todo-memo">{todo.memo}</p>
          )}
          
          <div className="todo-meta">
            {folder && (
              <span 
                className="todo-folder"
                style={{ backgroundColor: folderColor }}
              >
                {folder.name}
              </span>
            )}
            
            {todo.dueDate && (
              <span className="todo-date">
                📅 {formatDateReadable(todo.dueDate)}
                {todo.dueTime && ` ${formatTime(todo.dueTime)}`}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="todo-actions">
        <button
          className="todo-btn edit-btn"
          onClick={() => onEdit(todo)}
          title="수정"
        >
          ✏️
        </button>
        <button
          className="todo-btn delete-btn"
          onClick={() => onDelete(todo.id)}
          title="삭제"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
