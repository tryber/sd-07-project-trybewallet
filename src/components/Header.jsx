import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { email, totalExpense } = this.props;
    const coinType = 'BRL';
    const initialValue = 0;

    return(
      <header>
        <div>
          <p>
            Email:
            <span data-testid="email-field">
              { email }
            </span>
          </p>
          <p>
            Despesa Total:
            <span data-testid="total-field">
              { !totalExpense ? initialValue.toFixed(2) : totalExpense.toFixed(2) }
            </span>
            <span data-testid="header-currency-field">
              { coinType }
            </span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const email = state.user.email;
  const totalExpense = state.wallet.totalExpense;

  return ({ email, totalExpense });
}

export default connect(mapStateToProps, null)(Header);
