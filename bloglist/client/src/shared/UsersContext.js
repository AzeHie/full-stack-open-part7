import { createContext, useReducer } from 'react';

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

const UsersContext = createContext();

export const UsersContextProvider = (props) => {
  const [user, userDispatch] = useReducer(usersReducer, null);

  return (
    <UsersContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
