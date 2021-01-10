import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, totalSum = 0 } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p>
            Despesa Total: R$
            <span data-testid="total-field">{ totalSum.toFixed(0) }</span>
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>

      </div>
    );
  }
}

export default Header;

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalSum: PropTypes.number.isRequired,
};
