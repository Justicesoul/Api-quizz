import axios from 'axios';
import { useState } from 'react';
import Button from '../Button/Button';
import './QuizzForm.scss';

interface QuizzFormProps {
  setMainView: (arr: string) => void;
}

const QuizzForm: React.FC<QuizzFormProps> = ({ setMainView }) => {
  const [quizzTitle, setQuizzTitle] = useState('');
  const [quizzQuestion, setQuizzQuestion] = useState('');
  const [quizzAnswer, setQuizzAnswer] = useState('');
  const [quizzImageURL, setQuizzImageURL] = useState(
    'https://www.beano.com/wp-content/uploads/2019/08/COMPUTER-SCREEN-1.jpg?w=977&strip=all&quality=76'
  );

  const onSendButton = () => {
    setMainView('loading');
    const quizz = {
      title: quizzTitle,
      timeLimit: 'PT5S',
      questions: [
        {
          content: quizzQuestion,
          imageUrl: quizzImageURL,
          points: 1,
          answers: [
            {
              content: quizzAnswer,
              correct: true,
            },
          ],
        },
      ],
    };
    axios
      .put('/account-api/quizzes', quizz)
      .then(() => {
        alert('Data sent');
      })
      .catch((error) => {
        alert(`${error.response.status} (${error.response.statusText})`);
      })
      .finally(() => setMainView('main'));
  };

  return (
    <form
      className="form"
      onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault}
    >
      <>
        <div className="form__control">
          <h2>Create a question</h2>
        </div>
        <label>
          Title
          <input
            className="form__label"
            type="text"
            placeholder="Enter quizz title"
            value={quizzTitle}
            onChange={(e) => {
              setQuizzTitle(e.target.value);
            }}
          />
        </label>
        <label>
          Question
          <input
            className="form__label"
            type="text"
            placeholder="Enter your question"
            value={quizzQuestion}
            onChange={(e) => {
              setQuizzQuestion(e.target.value);
            }}
          />
        </label>
        <label>
          Answer
          <input
            className="form__label"
            type="text"
            placeholder="Enter answer"
            value={quizzAnswer}
            onChange={(e) => {
              setQuizzAnswer(e.target.value);
            }}
          />
        </label>
        <label>
          Add image URL
          <input
            className="form__label"
            type="text"
            placeholder="Enter image URL"
            value={quizzImageURL}
            onChange={(e) => {
              setQuizzImageURL(e.target.value);
            }}
          />
        </label>
        <Button onClick={onSendButton}>Send</Button>
      </>
    </form>
  );
};

export default QuizzForm;
