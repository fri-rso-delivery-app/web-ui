import { useQuery } from "react-query";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";

import { StoreRead } from "../../schemas/packets/Api";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import DeliveryOnly from "../../components/containers/DeliveryOnly";
import AddressWidget from "../../components/util/AddressWidget";

export default function StoresList() {

  const navigate = useNavigate();

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
        params.row._id.substring(0, 8),
    },
    { field: 'store_name', headerName: 'Name', width: 130 },
    { field: 'location', headerName: 'Location', width: 130 },
    {
      field: 'address',
      headerName: 'Address',
      sortable: false,
      width: 160,
      renderCell: (params: GridRenderCellParams) =>
        (<AddressWidget coords={params.row.location}/>),
    },
  ];

  return(
    <div style={{ height: 600, width: 900 }}>
      <Typography variant="h2" sx={{ m: 4 }}>
        Stores
      </Typography>

      <DeliveryOnly>
        <Link
          component={RouterLink}
          to="/stores/new">Create Store</Link>
      </DeliveryOnly>

      <DataGrid
        rows={stores}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(params) => params._id}
        disableColumnSelector
        onRowClick={(params) => navigate(`/stores/${params.row._id}`)}
        disableSelectionOnClick
        checkboxSelection
      />
    </div>
  )
}
