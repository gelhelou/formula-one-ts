import { Reducer } from "redux";
import {
  IChampionsState,
  ChampionsActions,
  ChampionsActionTypes,
} from "./ChampionsTypes";

const intialChampionsState: IChampionsState = {
  champions: [],
  championsLoading: false,
  error: "",
};

export const championsReducer: Reducer<IChampionsState, ChampionsActions> = (
  state = intialChampionsState,
  action
) => {
  switch (action.type) {
    case ChampionsActionTypes.GETALL:
      return {
        ...state,
        championsLoading: false,
        champions: action.champions,
      };
    case ChampionsActionTypes.LOADING:
      return {
        ...state,
        championsLoading: true,
      };
    case ChampionsActionTypes.GETFAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
