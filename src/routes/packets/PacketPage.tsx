import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@mui/material";

import FontAwesomeSvgIcon from "../../components/util/FontAwesomeSvgIcon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PacketRead } from "../../schemas/packets/Api";
import { queryClient } from "../../util/server";

export default function PacketPage() {

  let { id } = useParams();

  const navigate = useNavigate();

  const { data: packet, isLoading, isError } = useQuery<PacketRead>(`packets/packets/${id}`);

  const deleteMutation = useMutation(() => {
    return axios.delete(`/packets/packets/${id}`);
  }, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('packets/packets');

      navigate(`/packets/`, { replace: true });
    },
  }
);

  if (isLoading) return (<CircularProgress/>);

  if (isError || packet == null) return (<h1>err loading data</h1>);

  return(
    <>
      <Typography variant="h2" sx={{ m: 4 }}>
        {packet.description}
      </Typography>

      <TableContainer component={Paper} sx={{ width: 'max-content', margin: 'auto' }}>
        <Table sx={{ minWidth: 320 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row"> store_id </TableCell>
              <TableCell>{packet.store_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"> delivery_destination </TableCell>
              <TableCell>{packet.delivery_destination}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"> id </TableCell>
              <TableCell>{packet._id}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={() => deleteMutation.mutate()}
        variant="contained"
        sx={{ m: 2, background: 'red' }}
      >
        <FontAwesomeSvgIcon icon={faTrash}/>
        Delete
      </Button>
      
    </>
  )
}
