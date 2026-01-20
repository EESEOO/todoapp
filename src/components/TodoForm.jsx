import { useState, useEffect } from 'react';
import { getToday } from '../utils/dateUtils';
import './TodoForm.css';

function TodoForm({ todo, folders, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    memo: '',
    dueDate: '',
    dueTime: '',
    folderId: 'other'
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        memo: todo.memo || '',
        dueDate: todo.dueDate || '',
        dueTime: todo.dueTime || '',
        folderId: todo.folderId || 'other'
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }

    const todoData = {
      ...formData,
      title: formData.title.trim(),
      memo: formData.memo.trim()
    };

    if (todo) {
      onSave({ ...todo, ...todoData });
    } else {
      onSave(todoData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{todo ? '할일 수정' : '새 할일'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-group">
            <label htmlFor="title">제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="할일 제목을 입력하세요"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="memo">메모</label>
            <textarea
              id="memo"
              name="memo"
              value={formData.memo}
              onChange={handleChange}
              placeholder="메모를 입력하세요 (선택사항)"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate">날짜</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                min={getToday()}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dueTime">시간</label>
              <input
                type="time"
                id="dueTime"
                name="dueTime"
                value={formData.dueTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="folderId">폴더</label>
            <select
              id="folderId"
              name="folderId"
              value={formData.folderId}
              onChange={handleChange}
            >
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              {todo ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
