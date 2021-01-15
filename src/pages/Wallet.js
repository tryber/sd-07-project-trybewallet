import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RenderTable from '../components/RenderTable';
import { addExpenses } from '../actions/wallet';
import fetchAPI from '../actions/serviceAPI';
import './Wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: {
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        currency: 'USD',
        value: 0,
        exchangeRates: {},
      },
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
    this.handleForm();
  }

  // componentDidUpdate() {
  //   this.handleForm();
  // }

  async handleFetch() {
    const { apiFetch } = this.props;
    const { expenses } = this.state;
    const exchangeRates = await apiFetch();
    this.setState({
      expenses: { ...expenses, exchangeRates },
    });
  }

  async handleChange(event) {
    event.preventDefault();
    // console.log(this.props);
    const { addExp } = this.props;
    // console.log(this.state);
    const { handleFetch } = this;
    await handleFetch();
    const { expenses } = this.state;
    // console.log('expenses', expenses);
    addExp(expenses);
    this.setState({
      expenses: {
        id: 0,
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        currency: 'USD',
        value: 0,
        exchangeRates: { ...expenses.exchangeRates },
      } });
  }

  handleForm(updateExpense) {
    // const { expenses } = this.state;
    console.log(updateExpense);
    const editExpense = { ...updateExpense };
    console.log(editExpense);
    // this.setState({
    //   expenses: {
    //     id: updateExpense.id,
    //     method: updateExpense.method,
    //     tag: updateExpense.tag,
    //     description: updateExpense.description,
    //     currency: updateExpense.currency,
    //     value: updateExpense.value,
    //     exchangeRates: { ...expenses.exchangeRates },
    //   } });
    // this.setState({ expenses: ...updateExpense });
  }

  handleInput(event) {
    const { target: { name, value } } = event;
    this.setState((state) => ({ ...state,
      expenses:
         { ...state.expenses, [name]: value } }));
  }

  render() {
    const { _Email, currencies, totalExpense } = this.props;
    // console.log(this.props.updateExpense) // consigo recuperar a expense do botão editar
    const { updateExpense } = this.props;
    if (updateExpense.length !== 0) {
      this.handleForm(updateExpense);
    }
    const dez = 10;
    const { expenses } = this.state;
    const { value, method, description, tag, currency } = expenses;
    const filteredCurrencies = Object.keys(currencies).filter((coin) => coin !== 'USDT');
    return (
      <div>
        <div data-testid="email-field" className="Email">
          Email:
          { _Email }
        </div>
        <div className="Despesas-totais">
          Despesas Totais:
          <span
            data-testid="total-field"
            value="0"
          >
            {parseFloat(totalExpense, dez).toFixed(2)}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <form className="form" onSubmit={ this.handleChange }>
          <label htmlFor="valor-despesa">
            Valor da Despesa:
            <input
              type="text"
              data-testid="value-input"
              onChange={ this.handleInput }
              name="value"
              value={ value }
              id="valor-despesa"
              className="input-valor-despesa"
            />
          </label>
          <label htmlFor="despesa" className="idd">
            Descrição da Despesa:
            <input
              type="text"
              data-testid="description-input"
              onChange={ this.handleInput }
              name="description"
              value={ description }
              className="input-descricao-despesa"
            />
          </label>
          <label htmlFor="registro" className="idd">
            Registro da Moeda:
            <select
              data-testid="currency-input"
              onChange={ this.handleInput }
              name="currency"
              value={ currency }
              id="registro"
            >
              {filteredCurrencies.map((curr) => (
                <option
                  value={ curr }
                  key={ curr }
                  data-testid={ curr }
                >
                  {curr}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="pagamento" className="idd">
            <select
              data-testid="method-input"
              onChange={ this.handleInput }
              name="method"
              value={ method }
              id="pagamento"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tipo-despesa" className="idd">
            Categoria de Despesa:
            <select
              data-testid="tag-input"
              onChange={ this.handleInput }
              name="tag"
              value={ tag }
              id="tipo-despesa"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            className="button"
          >
            Adicionar Despesa
          </button>
        </form>
        <RenderTable handleForm={ this.handleForm } />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  apiFetch: () => dispatch(fetchAPI()),
  addExp: (expenses) => dispatch(addExpenses(expenses)),
});
const mapStateToProps = (state) => ({
  _Email: state.user.email,
  currencies: state.wallet.currencies,
  totalExpense: state.wallet.totalExpense,
  updateExpense: state.wallet.updateExpense,
});
Wallet.propTypes = {
  updateExpense: PropTypes.objectOf.isRequired,
  _Email: PropTypes.string.isRequired,
  currencies: PropTypes.objectOf.isRequired,
  apiFetch: PropTypes.func.isRequired,
  totalExpense: PropTypes.number.isRequired,
  addExp: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
