import rootReducer from './reducers'
import { createStore } from 'redux'


const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      console.log('abcde')
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };
  
  const peristedState = loadState();
  
  
  const store = createStore(rootReducer,loadState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

    store.subscribe(() => {
      saveState(store.getState());
    });
    
export default store

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()