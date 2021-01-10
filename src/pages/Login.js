import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addUser } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validated: false,
    };
  }

  verifyFields(event) {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const maximiumLength = 6;
    const { email, password } = this.state;
    if (emailRegex.test(email) && password.length >= maximiumLength) {
      this.setState({ validated: true });
      saveData(email, password);
    } else {
      this.setState({ validated: false });
    }
  }

  updateEmail(value) {
    this.setState({
      email: value,
    });
  }

  updatePassword(value) {
    this.setState({
      password: value,
    });
  }

  render() {
    const { validated } = this.state;
    if (validated) return <Redirect to="/carteira" />;
    return (
      <div>
        <form onSubmit={ (event) => this.verifyFields(event) }>
          <input
            type="text"
            data-testid="email-input"
            onChange={ (event) => this.updateEmail(event.target.value) }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ (event) => this.updatePassword(event.target.value) }
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

function dispatcher(dispatch) {
  return {
    saveData: (email, password) => dispatch(addUser(email, password)),
  };
}

export default connect(null, dispatcher)(Login);

// export default Login;
