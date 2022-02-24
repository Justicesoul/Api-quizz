import './Quizzes.scss';

type Quizze = {
  id: number;
  questions: {
    content: string;
    imageUrl: string;
    answers: {
      content: string;
    }[];
  }[];
};

interface QuizzesProps {
  quizzData: Quizze[];
}

const Quizzes: React.FC<QuizzesProps> = ({ quizzData }) => {
  return (
    <div>
      {quizzData.map(({ id, questions }) => {
        return (
          <div key={id} className="quizzes">
            <h2>{`${id}. ${questions[0].content}`}</h2>
            <img
              className="quizzes__image"
              src={questions[0].imageUrl}
              alt="logo"
            />
            <h2>{`Answer: ${questions[0].answers[0].content}`}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Quizzes;
