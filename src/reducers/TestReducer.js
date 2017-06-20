const TestReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        1
      ]
    default:
      return state;
  }
}

export default TestReducer
