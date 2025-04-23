'use client'; // VERY IMPORTANT for hooks to work

import { Provider } from 'react-redux';
import { store } from './store/store';
export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}