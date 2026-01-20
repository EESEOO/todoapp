import { useState } from 'react';
import './Sidebar.css';

function Sidebar({ folders, todos, selectedFolder, onSelectFolder, onAddFolder, onDeleteFolder, isOpen, onClose }) {
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#FFB4B4');

  const getFolderCount = (folderId) => {
    return todos.filter(todo => todo.folderId === folderId && !todo.completed).length;
  };

  const handleAddFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) {
      alert('폴더 이름을 입력해주세요');
      return;
    }

    onAddFolder({
      name: newFolderName.trim(),
      color: newFolderColor
    });

    setNewFolderName('');
    setNewFolderColor('#FFB4B4');
    setIsAddingFolder(false);
  };

  const handleDeleteFolder = (folderId) => {
    if (window.confirm('이 폴더를 삭제하시겠습니까? 폴더의 할일들은 "기타" 폴더로 이동됩니다.')) {
      onDeleteFolder(folderId);
      if (selectedFolder === folderId) {
        onSelectFolder(null);
      }
    }
  };

  const pastelColors = [
    '#FFB4B4', '#FFD4B4', '#FFE4B4', '#FFF4B4',
    '#E4FFB4', '#C4FAC4', '#B4FFD4', '#B4F4FF',
    '#B4D4FF', '#C4B4FF', '#E4B4FF', '#FFB4E4'
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>폴더</h2>
          <button 
            className="sidebar-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          {/* 전체 보기 */}
          <button
            className={`folder-item ${selectedFolder === null ? 'active' : ''}`}
            onClick={() => {
              onSelectFolder(null);
              onClose();
            }}
          >
            <span className="folder-icon" style={{ backgroundColor: '#e9ecef' }}>
              📁
            </span>
            <span className="folder-name">전체</span>
            <span className="folder-count">{todos.filter(t => !t.completed).length}</span>
          </button>

          {/* 폴더 목록 */}
          {folders.map(folder => (
            <div key={folder.id} className="folder-item-wrapper">
              <button
                className={`folder-item ${selectedFolder === folder.id ? 'active' : ''}`}
                onClick={() => {
                  onSelectFolder(folder.id);
                  onClose();
                }}
              >
                <span 
                  className="folder-icon"
                  style={{ backgroundColor: folder.color }}
                />
                <span className="folder-name">{folder.name}</span>
                <span className="folder-count">{getFolderCount(folder.id)}</span>
              </button>
              
              {!['work', 'personal', 'study', 'other'].includes(folder.id) && (
                <button
                  className="folder-delete-btn"
                  onClick={() => handleDeleteFolder(folder.id)}
                  title="폴더 삭제"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* 폴더 추가 */}
          {!isAddingFolder ? (
            <button
              className="add-folder-btn"
              onClick={() => setIsAddingFolder(true)}
            >
              + 새 폴더
            </button>
          ) : (
            <form className="add-folder-form" onSubmit={handleAddFolder}>
              <input
                type="text"
                placeholder="폴더 이름"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
              />
              
              <div className="color-picker">
                {pastelColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`color-option ${newFolderColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewFolderColor(color)}
                  />
                ))}
              </div>

              <div className="form-buttons">
                <button type="submit" className="btn-save">추가</button>
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => {
                    setIsAddingFolder(false);
                    setNewFolderName('');
                    setNewFolderColor('#FFB4B4');
                  }}
                >
                  취소
                </button>
              </div>
            </form>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
