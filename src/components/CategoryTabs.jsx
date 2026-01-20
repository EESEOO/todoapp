import { CATEGORIES, CATEGORY_LABELS } from '../utils/constants';
import { filterTodosByCategory } from '../utils/dateUtils';
import './CategoryTabs.css';

function CategoryTabs({ selectedCategory, onSelectCategory, todos }) {
  const getCategoryCount = (category) => {
    return filterTodosByCategory(todos, category).filter(t => !t.completed).length;
  };

  return (
    <div className="category-tabs">
      {Object.values(CATEGORIES).map(category => (
        <button
          key={category}
          className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          <span className="category-label">{CATEGORY_LABELS[category]}</span>
          <span className="category-count">{getCategoryCount(category)}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
