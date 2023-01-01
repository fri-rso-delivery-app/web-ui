import { useQuery } from "react-query";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";

import { StoreRead } from "../../schemas/packets/Api";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export default function PacketsList() {

  const navigate = useNavigate();

  const { data: stores, isLoading, isError } = useQuery<StoreRead[]>('packets/packets/');

  if (isLoading) return (<CircularProgress/>);

  if (isError || stores == null) return (<h1>err loading data</h1>);

  const columns: GridColDef<StoreRead>[] = [
    {
      field: '_id',
      headerName: 'ID',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        params.row._id.substring(0, 8),
    },
    {
      field: 'store_id',
      headerName: 'Store',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.store_id.substring(0, 8),
    },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'delivery_destination', headerName: 'Delivery', width: 130 },
  ];

  return(
    <div style={{ height: 600, width: 900 }}>
      <Typography variant="h2" sx={{ m: 4 }}>
        Packages
      </Typography>

      {
      /*<Link
        component={RouterLink}
        to="/stores/new">Create Package</Link>
      */
      }

      <DataGrid
        rows={stores}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(params) => params._id}
        disableColumnSelector
        onRowClick={(params) => navigate(`/packets/${params.row._id}`)}
        disableSelectionOnClick
        checkboxSelection
      />
    </div>
  )
}
