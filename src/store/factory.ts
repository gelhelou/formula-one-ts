import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { championsReducer } from "./ChampionsReducer";
import { winnersReducer } from "./WinnersReducer";
import { IChampionsState } from "./ChampionsTypes";
import { IWinnersState } from "./WinnersTypes";

export interface IApplicationState {
  champions: IChampionsState;
  winners: IWinnersState;
}

const rootReducer = combineReducers<IApplicationState>({
  champions: championsReducer,
  winners: winnersReducer,
});

export default function configureStore(): Store<IApplicationState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
