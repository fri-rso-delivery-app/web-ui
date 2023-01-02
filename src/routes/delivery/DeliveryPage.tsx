import { useQuery } from "react-query";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";

import {
  Typography,
  CircularProgress,
  Link,
  Paper,
  Select,
  MenuItem,
  Slider,
  TextField,
} from "@mui/material";

import { StoreRead } from "../../schemas/packets/Api";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import AddressWidget from "../../components/util/AddressWidget";
import { useState } from "react";

export default function DeliveryPage() {

  const navigate = useNavigate();

  const [mode, setMode] = useState('driving');
  const [time, setTime] = useState(2);

  const [searchParams, setSearchParams] = useSearchParams();

  const storeId = searchParams.get('storeId')

  const { data: stores, isLoading, isError } = useQuery<StoreRead[]>(
    `packets/packets/request_route?store_id=${encodeURIComponent(storeId!)}&time_in_minutes=${encodeURIComponent(Math.round(time*60))}&mode=${encodeURIComponent(mode)}`,
    { enabled: storeId != null },
  );

  if (!storeId) {
    return (
      <Typography variant="h2">
        Missing required param "storeId"!
      </Typography>
    )
  }

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
    {
      field: 'address',
      headerName: 'Address',
      sortable: false,
      width: 160,
      renderCell: (params: GridRenderCellParams) =>
        (<AddressWidget coords={params.row.delivery_destination}/>),
    },
  ];

  return(
    <div style={{ height: 600, width: 900 }}>

      <Paper sx={{p: 2}}>
        <Select
          value={mode}
          label="Transportation mode"
          onChange={(event) => setMode(event.target.value)}
        >
          <MenuItem value="driving">Driving</MenuItem>
          <MenuItem value="walking">Walking</MenuItem>
        </Select>

        <TextField
          value={time}
          label="Time H"
          onChange={(event) => setTime(Number(event.target.value))}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
      </Paper>

      <Typography variant="h2" sx={{ m: 4 }}>
        Route instructions
      </Typography>

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
