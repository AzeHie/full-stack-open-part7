// USEREDUCER OTETTU KÄYTTÖÖN, SIIRRÄ SE OMAAN TIEDOSTOON JA SET UP CONTEXT FOR NOTIFICAION!!

import { createContext, useReducer } from 'react';

const initialNotification = {
  message: null,
  styles: null,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return { ...state, message: action.payload };
    case 'STYLES':
      return { ...state, styles: action.payload };
    case 'CLEAR':
      return { ...state, message: null, styles: null };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialNotification
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
