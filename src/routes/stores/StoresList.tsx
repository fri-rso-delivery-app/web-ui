import { useQuery } from "react-query";

import {
  Typography,
  CircularProgress,
} from "@mui/material";

import { StoreRead } from "../../schemas/packets/Api";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export default function StoresList() {

  const { data: stores, isLoading, isError } = useQuery<StoreRead[]>('packets/stores/');

  if (isLoading) return (<CircularProgress/>);

  if (isError || stores == null) return (<h1>err loading data</h1>);

  const columns: GridColDef<StoreRead>[] = [
    {
      field: '_id',
      headerName: 'ID',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        params.row._id.substring(8),
    },
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'location', headerName: 'Location', width: 130 },
  ];

  return(
    <div style={{ height: 600, width: 900 }}>
      <Typography variant="h2" sx={{ m: 4 }}>
        Stores
      </Typography>

      <DataGrid
        rows={stores}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}
