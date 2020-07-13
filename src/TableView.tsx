import * as React from "react";

interface IHeadingsProps {
  item: any;
  hiddenColumns: string[];
}

export const Headings: React.SFC<IHeadingsProps> = ({
  item,
  hiddenColumns,
}) => (
  <div className="headings" test-element="headings">
    {Object.keys(item).map(
      (key, idx) =>
        !hiddenColumns.includes(key) && (
          <div key={idx} className="heading" test-element="heading">
            {key.toUpperCase()}
          </div>
        )
    )}
  </div>
);

interface IDataRowProps {
  item: any;
  hiddenColumns: string[];
  rowClass: string;
}

export const DataRow: React.SFC<IDataRowProps> = ({
  item,
  hiddenColumns,
  rowClass,
}) => (
  <React.Fragment>
    {Object.keys(item).map(
      (key, idx) =>
        !hiddenColumns.includes(key) && (
          <div className={rowClass} key={idx} test-element={rowClass}>
            {item[key]}
          </div>
        )
    )}
  </React.Fragment>
);
