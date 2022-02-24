import axios from 'axios';
import { useState } from 'react';
import Button from '../Button/Button';
import './Form.scss';

interface FormProps {
  setFormOpen: (arg: boolean) => void;
  logInEmail: string;
  setLogInEmail: (arr: string) => void;
  mainView: string;
  setMainView: (arr: string) => void;
}

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

axios.defaults.headers.common['X-CSRF-TOKEN'] =
  localStorage.getItem('csrf') || '';

const Form: React.FC<FormProps> = ({
  setFormOpen,
  logInEmail,
  setLogInEmail,
  mainView,
  setMainView,
}) => {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState('');
  const [logInPassword, setLogInPassword] = useState('');

  const onSignUpButton = () => {
    if (
      regexEmail.test(signUpEmail) &&
      signUpPassword.length > 7 &&
      signUpPassword === signUpPasswordConfirm
    ) {
      setMainView('loading');
      setSignUpOpen(false);
      axios
        .post('/account-api/accounts/sign-up', {
          email: signUpEmail,
          password: signUpPassword,
        })
        .then((res) => {
          localStorage.setItem('csrf', res.headers._csrf);
        })
        .catch((error) => {
          alert(`${error.response.status} (${error.response.statusText})`);
        })
        .finally(() => setMainView('main'));
    }
    if (!regexEmail.test(signUpEmail)) {
      alert('Please, enter valid e-mail');
    }
    if (signUpPassword.length < 8) {
      alert('Password must contain at least 8 characters');
    }
    if (signUpPassword !== signUpPasswordConfirm) {
      alert('Incorrect password confirmation');
    }
  };

  const onLogInButton = () => {
    if (regexEmail.test(logInEmail) && logInPassword.length > 7) {
      setMainView('loading');
      axios
        .post('/account-api/accounts/sign-in', {
          email: logInEmail,
          password: logInPassword,
        })
        .then((res) => {
          localStorage.setItem('csrf', res.headers._csrf);
          setFormOpen(false);
        })
        .catch((error) => {
          alert(
            `${error.response.status} (${error.response.statusText}), try again`
          );
        })
        .finally(() => setMainView('main'));
    }
    if (!regexEmail.test(logInEmail)) {
      alert('Please, enter valid e-mail');
    }
    if (logInPassword.length < 8) {
      alert('Password must contain at least 8 characters');
    }
  };

  return (
    <div className="App">
      <div className="container">
        {mainView !== 'loading' && (
          <form
            className="form"
            onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
              e.preventDefault
            }
          >
            {signUpOpen && (
              <>
                <div className="form__control">
                  <h2>Sing Up or</h2>
                  <button
                    className="form__control-button"
                    onClick={() => setSignUpOpen(false)}
                  >
                    Log In
                  </button>
                </div>
                <label>
                  E-mail
                  <input
                    className="form__label"
                    type="text"
                    placeholder="Enter your e-mail"
                    value={signUpEmail}
                    onChange={(e) => {
                      setSignUpEmail(e.target.value);
                    }}
                  />
                </label>
                <label>
                  Password
                  <input
                    className="form__label"
                    type="password"
                    placeholder="Enter your password"
                    value={signUpPassword}
                    onChange={(e) => {
                      setSignUpPassword(e.target.value);
                    }}
                  />
                </label>
                <label>
                  Confirm password
                  <input
                    className="form__label"
                    type="password"
                    placeholder="Confirm your password"
                    value={signUpPasswordConfirm}
                    onChange={(e) => {
                      setSignUpPasswordConfirm(e.target.value);
                    }}
                  />
                </label>
                <Button onClick={onSignUpButton}>Sign in</Button>
              </>
            )}
            {!signUpOpen && (
              <>
                <div className="form__control">
                  <h2>Log in or</h2>
                  <button
                    className="form__control-button"
                    onClick={() => setSignUpOpen(true)}
                  >
                    Sign Up
                  </button>
                </div>
                <label>
                  E-mail
                  <input
                    className="form__label"
                    type="text"
                    placeholder="Enter your e-mail"
                    value={logInEmail}
                    onChange={(e) => {
                      setLogInEmail(e.target.value);
                    }}
                  />
                </label>
                <label>
                  Password
                  <input
                    className="form__label"
                    type="password"
                    placeholder="Enter your password"
                    value={logInPassword}
                    onChange={(e) => {
                      setLogInPassword(e.target.value);
                    }}
                  />
                </label>
                <Button onClick={onLogInButton}>Log In</Button>
              </>
            )}
          </form>
        )}
        {mainView === 'loading' && (
          <img
            className="loading__image"
            src="https://i.gifer.com/7JXX.gif"
            alt="loading"
          />
        )}
      </div>
    </div>
  );
};

export default Form;

// https://quiz-app-usnl.onrender.com/swagger-ui/index.html#/
