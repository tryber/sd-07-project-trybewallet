import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, addExpense } from '../../actions';

class WalletForm extends React.Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: '',
      expenseValue: 0,
      description: '',
      method: '',
      expenseType: '',
      currency: '',
    };
  }

  componentDidMount() {
    const { fetchCurrenciesProps } = this.props;
    fetchCurrenciesProps();
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { addExpenseProps } = this.props;
    addExpenseProps(this.state);
  }

  render() {
    const { currenciesProps } = this.props;
    const { expenseValue, description, method, expenseType, currency } = this.state;
    return (
      <header>
        <form>
          <label htmlFor="expenseValue">
            Value:
            <input
              data-testid="value-input"
              type="number"
              id="expenseValue"
              name="expenseValue"
              value={ expenseValue }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              data-testid="description-input"
              type="text"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="currency">
            Currency:
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleInputChange }
            >
              {currenciesProps
                .map((coin) => (
                  <option data-testid={ coin } value={ coin } key={ coin }>
                    { coin }
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="method">
            Payment:
            <select
              data-testid="method-input"
              name="method"
              id="method"
              value={ method }
              onChange={ this.handleInputChange }
            >
              <option value="money">Dinheiro</option>
              <option value="creditcard">Cartão de crédito</option>
              <option value="debitcard">Cartão de débito</option>

            </select>
          </label>
          <label htmlFor="tag">
            Expense:
            <select
              data-testid="tag-input"
              name="expenseType"
              id="expenseType"
              value={ expenseType }
              onChange={ this.handleInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleSubmit }>Adicionar Despesa</button>
        </form>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesProps: state.wallet.currencies });

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesProps: () => dispatch(fetchCurrencies()),
  addExpenseProps: (expense) => dispatch(addExpense(expense)),
});

WalletForm.propTypes = {
  fetchCurrenciesProps: PropTypes.func.isRequired,
  addExpenseProps: PropTypes.func.isRequired,
  currenciesProps: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
