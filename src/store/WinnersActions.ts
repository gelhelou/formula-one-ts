import { ActionCreator, AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { API_BASE } from "../config";
import {
  WinnersActionTypes,
  IWinnersLoadingAction,
  IWinnersGetAllAction,
  IWinnersState,
} from "./WinnersTypes";

export const loading: ActionCreator<IWinnersLoadingAction> = () => ({
  type: WinnersActionTypes.LOADING,
});

const getWinnersFromAPI = (season: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_BASE}/${season}/results/1.json`);
      const resPromise = response.json();
      const rawData = await resPromise;
      const winners = rawData.MRData.RaceTable.Races.map((race: any) => ({
        driver: `${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`,
        circuit: race.Circuit.circuitName,
        driverId: race.Results[0].Driver.driverId,
      }));
      resolve(winners);
    } catch (err) {
      reject({ message: "Could not fetch season winners data!" });
    }
  });
};

export const getWinners: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IWinnersState,
  null,
  IWinnersGetAllAction
>> = (season: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loading());
    try {
      const winners = await getWinnersFromAPI(season);
      return dispatch({
        winners,
        type: WinnersActionTypes.GETALL,
      });
    } catch (err) {
      throw err;
    }
  };
};
