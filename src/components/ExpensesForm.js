import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExchange, addExpense } from '../actions';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

      value: '',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Trabalho',
      id: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { handleExpenses } = this.props;
    handleExpenses();
  }

  handleSubmit() {
    const { addExpenses } = this.props;
    this.setState((prevState) => ({ value: '', description: '', currency: '', method: 'Dinheiro', tag: 'Trabalho', id: prevState.id + 1 }));
    addExpenses(this.state);
  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;
    const inputName = target.name;
    this.setState({ [inputName]: value });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div className="walletPanel AddExpenseFormWrapper">
        <form>
          <label htmlFor="value">
            {' '}
            Valor da despesa:
            <input
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            {' '}
            Descrição da despesa
            <input
              data-testid="description-input"
              value={ description }
              name="description"
              onChange={ this.handleChange }
            />
          </label>
          <select
            data-testid="currency-input"
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
          >
            <option value="">Selecione a moeda..</option>
            { currencies.map((key) => (
              <option key={ key } data-testid={ key }>
                {' '}
                {key}
                {' '}
              </option>
            ))}
          </select>
          <select
            data-testid="method-input"
            value={ method }
            name="method"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="button"
            name=""
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </form>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchanges: state.wallet.exchange,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (expense, exchanges) => dispatch(addExpense(expense, exchanges)),
  handleExpenses: () => dispatch(getExchange()),
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleExpenses: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
