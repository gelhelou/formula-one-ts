export interface IWinner {
  driver: string;
  circuit: string;
  driverId: string;
}

export enum WinnersActionTypes {
  GETALL = "WINNERS/GETALL",
  LOADING = "WINNERS/LOADING",
}

export interface IWinnersGetAllAction {
  type: WinnersActionTypes.GETALL;
  winners: IWinner[];
}

export interface IWinnersLoadingAction {
  type: WinnersActionTypes.LOADING;
}

export type WinnersActions = IWinnersGetAllAction | IWinnersLoadingAction;

export interface IWinnersState {
  readonly winners: IWinner[];
  readonly winnersLoading: boolean;
}
