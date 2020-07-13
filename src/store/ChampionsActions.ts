import { ActionCreator, AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { START_YEAR, END_YEAR, API_BASE } from "../config";
import { getAge } from "../utils/formatter";
import {
  ChampionsActionTypes,
  IChampionsLoadingAction,
  IChampionsGetAllAction,
  IChampionsGetFailAction,
  IChampionsState,
} from "./ChampionsTypes";

export const loading: ActionCreator<IChampionsLoadingAction> = () => ({
  type: ChampionsActionTypes.LOADING,
});

const getChampionsFromAPI = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentYear = new Date().getFullYear();
      const rawPromises = [];
      for (let i = START_YEAR; i <= Math.min(END_YEAR, currentYear); i++) {
        rawPromises.push(fetch(`${API_BASE}/${i}/driverStandings/1.json`));
      }
      const responses = await Promise.all(rawPromises);
      const resPromises = responses.map((res) => res.json());

      const rawData = await Promise.all(resPromises);

      const data = rawData.map((seasonData) => {
        const driverData =
          seasonData.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
            .Driver;
        return {
          year: seasonData.MRData.StandingsTable.season,
          driver: `${driverData.givenName} ${driverData.familyName}`,
          age: getAge(driverData.dateOfBirth),
          nationality: driverData.nationality,
          points:
            seasonData.MRData.StandingsTable.StandingsLists[0]
              .DriverStandings[0].points,
          driverId: driverData.driverId,
        };
      });
      resolve(data);
    } catch (err) {
      reject({ message: "Could not fetch world champions data!" });
    }
  });
};

export const getChampions: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IChampionsState,
  null,
  IChampionsGetAllAction | IChampionsGetFailAction
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loading());
    try {
      const champions = await getChampionsFromAPI();
      return dispatch({
        champions,
        type: ChampionsActionTypes.GETALL,
      });
    } catch (err) {
      return dispatch({
        error: err.message,
        type: ChampionsActionTypes.GETFAIL,
      });
    }
  };
};
