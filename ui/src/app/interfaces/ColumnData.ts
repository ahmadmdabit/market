import { Column, ColumnApi, GridApi, RowNode } from "ag-grid-community";

export interface ColumnData {
  api: GridApi;
  colDef: any;
  column: Column;
  columnApi: ColumnApi;
  context: any;
  data: any;
  node: RowNode;
  value: any;
}
