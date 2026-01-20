import { getToday, formatDateReadable, isToday } from '../utils/dateUtils';
import './Dashboard.css';

function Dashboard({ todos, folders }) {
  const today = getToday();
  const todayTodos = todos.filter(todo => isToday(todo.dueDate));
  const completedToday = todayTodos.filter(todo => todo.completed).length;
  const totalToday = todayTodos.length;
  const pendingToday = totalToday - completedToday;

  const completionRate = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  // 폴더별 통계
  const getFolderStats = () => {
    return folders.map(folder => {
      const folderTodos = todos.filter(todo => todo.folderId === folder.id);
      const completed = folderTodos.filter(todo => todo.completed).length;
      const total = folderTodos.length;
      return {
        ...folder,
        total,
        completed,
        pending: total - completed
      };
    }).filter(folder => folder.total > 0);
  };

  const folderStats = getFolderStats();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">오늘의 일정</h2>
          <p className="dashboard-date">{formatDateReadable(today)}</p>
        </div>
        <div className="dashboard-greeting">
          {pendingToday === 0 && totalToday > 0 ? (
            <span className="greeting-emoji">🎉</span>
          ) : (
            <span className="greeting-emoji">💪</span>
          )}
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card stat-total">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <div className="stat-value">{totalToday}</div>
            <div className="stat-label">전체</div>
          </div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon">⏰</div>
          <div className="stat-info">
            <div className="stat-value">{pendingToday}</div>
            <div className="stat-label">진행중</div>
          </div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-value">{completedToday}</div>
            <div className="stat-label">완료</div>
          </div>
        </div>

        <div className="stat-card stat-rate">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <div className="stat-value">{completionRate}%</div>
            <div className="stat-label">달성률</div>
          </div>
        </div>
      </div>

      {folderStats.length > 0 && (
        <div className="dashboard-folders">
          <h3 className="section-title">폴더별 현황</h3>
          <div className="folder-stats">
            {folderStats.map(folder => (
              <div key={folder.id} className="folder-stat">
                <div 
                  className="folder-stat-color"
                  style={{ backgroundColor: folder.color }}
                />
                <div className="folder-stat-info">
                  <div className="folder-stat-name">{folder.name}</div>
                  <div className="folder-stat-progress">
                    <div 
                      className="folder-stat-bar"
                      style={{ 
                        width: `${folder.total > 0 ? (folder.completed / folder.total) * 100 : 0}%`,
                        backgroundColor: folder.color
                      }}
                    />
                  </div>
                </div>
                <div className="folder-stat-count">
                  {folder.completed}/{folder.total}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalToday === 0 && (
        <div className="dashboard-empty">
          <div className="empty-icon">📅</div>
          <p>오늘 예정된 할일이 없습니다</p>
        </div>
      )}

      {pendingToday === 0 && totalToday > 0 && (
        <div className="dashboard-congratulation">
          <div className="congrats-icon">🎉</div>
          <h3>완료했습니다!</h3>
          <p>오늘의 모든 할일을 완료했어요</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
