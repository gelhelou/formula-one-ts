export interface IChampion {
  year: string;
  driver: string;
  age: number;
  nationality: string;
  points: string;
  driverId: string;
}

export enum ChampionsActionTypes {
  GETALL = "CHAMPIONS/GETALL",
  LOADING = "CHAMPIONS/LOADING",
  GETFAIL = "CHAMPIONS/GETFAIL",
}

export interface IChampionsGetAllAction {
  type: ChampionsActionTypes.GETALL;
  champions: IChampion[];
}

export interface IChampionsLoadingAction {
  type: ChampionsActionTypes.LOADING;
}

export interface IChampionsGetFailAction {
  type: ChampionsActionTypes.GETFAIL;
  error: string;
}

export type ChampionsActions =
  | IChampionsGetAllAction
  | IChampionsLoadingAction
  | IChampionsGetFailAction;

export interface IChampionsState {
  readonly champions: IChampion[];
  readonly championsLoading: boolean;
  readonly error: string;
}
