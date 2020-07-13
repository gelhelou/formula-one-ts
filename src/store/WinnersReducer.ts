import { Reducer } from "redux";
import {
  IWinnersState,
  WinnersActions,
  WinnersActionTypes,
} from "./WinnersTypes";

const intialWinnersState: IWinnersState = {
  winners: [],
  winnersLoading: false,
};

export const winnersReducer: Reducer<IWinnersState, WinnersActions> = (
  state = intialWinnersState,
  action
) => {
  switch (action.type) {
    case WinnersActionTypes.GETALL:
      return {
        ...state,
        winnersLoading: false,
        winners: action.winners,
      };
    case WinnersActionTypes.LOADING:
      return {
        ...state,
        winnersLoading: true,
      };
    default:
      return state;
  }
};
