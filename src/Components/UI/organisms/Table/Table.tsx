import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import React, { ReactNode } from "react";
import JobColumns from "./Jobs/JobColumns";

interface ITable {
  isLoading: boolean;
  isError: boolean;
  cols: JobColumns[];
  children: ReactNode;
}

const Table = ({ isLoading, isError, cols, children }: ITable) => (
  <table className="styled-table">
    <thead>
      <tr>
        {cols.map((col: JobColumns) => (
          <th key={col}>{col}</th>
        ))}
      </tr>
    </thead>
    {(isLoading || isError) && (
      <tbody className="shadow-table rounded">
        {isLoading && (
          <tr>
            <td colSpan={6}>
              <CenteredLoader />
            </td>
          </tr>
        )}
        {isError && (
          <tr>
            <td colSpan={6}>There was an error while fetching data.</td>
          </tr>
        )}
      </tbody>
    )}
    {children && <tbody>{children}</tbody>}
  </table>
);

export default Table;
