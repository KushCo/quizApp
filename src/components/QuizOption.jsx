import { Button } from 'react-bootstrap';

const QuizOption = ({ option, isSelected, onSelect }) => {
  return (
    <Button
      variant="light"
      className={`option-btn w-100 ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="radio-circle"></div>
      <span className="option-label">{option.text}</span>
    </Button>
  );
};

export default QuizOption;