// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_MOEDA,
  REQUEST_MOEDA_SUCCESS,
  REQUEST_FAIL,
  ADD_EXPENSES,
} from '../actions/index';

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_MOEDA:
    return { ...state, isFetching: true };
  case REQUEST_MOEDA_SUCCESS:
    return { ...state, isFetching: false, currencies: { ...action.success } };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, currencies: { ...action.error } };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
