import axios from 'axios';
import { useState } from 'react';
import './App.scss';
import Button from './components/Button/Button';
import DeleteAccountWarning from './components/DeleteAccountWarning/DeleteAccountWarning';
import Form from './components/Form/Form';
import Quizzes from './components/Quizzes/Quizzes';
import QuizzForm from './components/QuizzForm/QuizzForm';

axios.defaults.headers.common['X-CSRF-TOKEN'] =
  localStorage.getItem('csrf') || '';

const App = () => {
  const [formOpen, setFormOpen] = useState(true);
  const [logInEmail, setLogInEmail] = useState('');
  const [mainView, setMainView] = useState('main');
  const [quizzData, setQuizzData] = useState([]);

  const onDeleteButton = () => {
    setMainView('loading');
    axios
      .delete('/account-api/accounts/me')
      .then(() => {
        setFormOpen(true);
        setLogInEmail('');
      })
      .catch((error) => {
        alert(`${error.response.status} (${error.response.statusText})`);
      })
      .finally(() => setMainView('main'));
  };

  const onLogOutButton = () => {
    setMainView('loading');
    axios
      .post('/account-api/accounts/sign-out')
      .then(() => {
        setFormOpen(true);
      })
      .catch((error) => {
        alert(`${error.response.status} (${error.response.statusText})`);
      })
      .finally(() => setMainView('main'));
  };

  const onGetQuizzesButton = () => {
    setMainView('loading');
    axios
      .get('/account-api/quizzes')
      .then((res) => {
        setQuizzData(res.data.items);
        console.log(res.data.items);
      })
      .catch((error) => {
        alert(`${error.response.status} (${error.response.statusText})`);
      })
      .finally(() => setMainView('quizzes'));
  };

  const onCreateQuizzButton = () => {
    setMainView('new quizz');
  };

  return (
    <div className="main">
      {formOpen && (
        <Form
          setFormOpen={setFormOpen}
          logInEmail={logInEmail}
          setLogInEmail={setLogInEmail}
          mainView={mainView}
          setMainView={setMainView}
        />
      )}
      {!formOpen && (
        <>
          <div className="main__menu">
            <h1>{`Welcome, ${logInEmail}!`}</h1>
            <div>
              <Button onClick={onGetQuizzesButton}>Get quizzes</Button>
              <Button onClick={onCreateQuizzButton}>Create a quiz</Button>
            </div>
          </div>
          {mainView === 'main' && (
            <img
              src="https://www.beano.com/wp-content/uploads/legacy/49548_10.png?w=977&strip=all&quality=76"
              alt=""
            />
          )}
          {mainView === 'new quizz' && <QuizzForm setMainView={setMainView} />}
          {mainView === 'delete' && (
            <DeleteAccountWarning
              setMainView={setMainView}
              onDeleteButton={onDeleteButton}
            />
          )}
          {mainView === 'quizzes' && <Quizzes quizzData={quizzData} />}
          {mainView === 'loading' && (
            <img
              className="loading__image"
              src="https://i.gifer.com/7JXX.gif"
              alt="loading"
            />
          )}
          <div className="main__control">
            {mainView === 'quizzes' && (
              <Button onClick={() => setMainView('main')}>
                Back to the main page
              </Button>
            )}
            <Button onClick={onLogOutButton}>Log out</Button>
            <Button onClick={() => setMainView('delete')}>
              Delete account
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
