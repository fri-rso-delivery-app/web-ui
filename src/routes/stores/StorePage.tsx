import { useMutation, useQuery } from "react-query";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";

import FontAwesomeSvgIcon from "../../components/util/FontAwesomeSvgIcon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { StoreRead } from "../../schemas/packets/Api";
import { queryClient } from "../../util/server";
import DeliveryOnly from "../../components/containers/DeliveryOnly";
import CustomerOnly from "../../components/containers/CustomerOnly";
import AddressWidget from "../../components/util/AddressWidget";

export default function StorePage() {

  let { id } = useParams();

  const navigate = useNavigate();

  const { data: store, isLoading, isError } = useQuery<StoreRead>(`packets/stores/${id}`);

  const deleteMutation = useMutation(() => {
    return axios.delete(`/packets/stores/${id}`);
  }, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('packets/stores');

      navigate(`/stores/`, { replace: true });
    },
  }
);

  if (isLoading) return (<CircularProgress/>);

  if (isError || store == null) return (<h1>err loading data</h1>);

  return(
    <>
      <Typography variant="h2" sx={{ m: 4 }}>
        {store.store_name}
      </Typography>

      <CustomerOnly>
        <Link
          component={RouterLink}
          to={`/packets/new?storeId=${store._id}`}>
            Order Package
        </Link>
      </CustomerOnly>

      <DeliveryOnly>
        <Link
          component={RouterLink}
          to={`/delivery?storeId=${store._id}`}>
            Start delivering
        </Link>
      </DeliveryOnly>

      <TableContainer component={Paper} sx={{ width: 'max-content', margin: 'auto' }}>
        <Table sx={{ minWidth: 320 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row"> location </TableCell>
              <TableCell>{store.location}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"> address </TableCell>
              <TableCell>
                <AddressWidget coords={store.location}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"> id </TableCell>
              <TableCell>{store._id}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <DeliveryOnly>
        <Button
          onClick={() => deleteMutation.mutate()}
          variant="contained"
          sx={{ m: 2, background: 'red' }}
        >
          <FontAwesomeSvgIcon icon={faTrash}/>
          Delete
        </Button>
      </DeliveryOnly>
      
    </>
  )
}
