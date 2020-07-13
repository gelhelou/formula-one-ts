import * as React from "react";
import { connect } from "react-redux";
import { getChampions } from "./store/ChampionsActions";
import { IApplicationState } from "./store/factory";
import { IChampion } from "./store/ChampionsTypes";
import "./Champions.css";
import Loader from "react-loader-spinner";
import { Headings, DataRow } from "./TableView";
import Winners from "./Winners";

interface IViewProps {
  champions: IChampion[];
  showWinnersIndex: number | null;
  onRowClicked: (idx: number) => void;
}

const ChampionsTable: React.SFC<IViewProps> = ({
  champions,
  showWinnersIndex,
  onRowClicked,
}) => (
  <div className="world-champions-wrapper">
    <div id="world-champions-title">F1 World Champions</div>
    <div className="world-champions-listing">
      <Headings
        item={champions.length > 0 ? champions[0] : {}}
        hiddenColumns={["driverId"]}
      />
      <div className="champions" test-element="champions">
        {champions.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <div
                className="table-row"
                test-element="champion-row"
                onClick={() => onRowClicked(idx)}
              >
                <DataRow
                  item={item}
                  hiddenColumns={["driverId"]}
                  rowClass={"champion-data"}
                />
              </div>
              {showWinnersIndex === idx && (
                <Winners championId={item.driverId} season={item.year} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  </div>
);

interface IProps {
  getChampions: typeof getChampions;
  champions: IChampion[];
  loading: boolean;
  error: string;
}

interface IState {
  showWinnersIndex: number | null;
}

class Champions extends React.Component<IProps, IState> {
  static defaultProps = {
    champions: [],
    loading: false,
    error: "",
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      showWinnersIndex: null,
    };
  }

  componentDidMount() {
    this.props.getChampions();
  }

  handleRowClick = (idx: number) => {
    this.setState({
      showWinnersIndex: this.state.showWinnersIndex === idx ? null : idx,
    });
  };

  render() {
    const { champions, loading } = this.props;
    if (loading)
      return (
        <div className="champions-loader" test-element="champions-loader">
          <Loader type="ThreeDots" color="green" height={80} width={80} />
        </div>
      );

    return (
      <ChampionsTable
        champions={champions}
        onRowClicked={this.handleRowClick}
        showWinnersIndex={this.state.showWinnersIndex}
      />
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    loading: store.champions.championsLoading,
    champions: store.champions.champions,
    error: store.champions.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getChampions: () => dispatch(getChampions()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Champions);
