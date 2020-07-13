import * as React from "react";
import { IWinner } from "./store/WinnersTypes";
import { connect } from "react-redux";
import { IApplicationState } from "./store/factory";
import { getWinners as fetchWinners } from "./store/WinnersActions";
import { Headings, DataRow } from "./TableView";
import Loader from "react-loader-spinner";

import "./Winners.css";

interface IProps {
  championId: string;
  season: string;
  winners: IWinner[];
  loading: boolean;
  getWinners: typeof fetchWinners;
}

const Winners: React.SFC<IProps> = ({
  championId,
  season,
  loading,
  winners,
  getWinners,
}) => {
  React.useEffect(() => {
    getWinners(season);
  }, [getWinners, season]);

  return (
    <React.Fragment>
      {!loading ? (
        <div
          className="season-winners-wrapper"
          test-element="season-winners-wrapper"
        >
          <div
            id="season-winners-title"
            test-element="season-winners-title"
          >{`Season ${season} Winners`}</div>
          <div className="season-winners-listing">
            <Headings
              item={winners.length > 0 ? winners[0] : {}}
              hiddenColumns={["driverId"]}
            />
            <div className="winners" test-element="winners">
              {winners.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={`table-row ${
                      item.driverId === championId ? "champion-highlight" : ""
                    }`}
                    test-element="winner-row"
                  >
                    <DataRow
                      item={item}
                      hiddenColumns={["driverId"]}
                      rowClass={"winner-data"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="winners-loader">
          <Loader type="ThreeDots" color="green" height={40} width={40} />
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (store: IApplicationState) => {
  return {
    loading: store.winners.winnersLoading,
    winners: store.winners.winners,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getWinners: (season: string) => dispatch(fetchWinners(season)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Winners);
