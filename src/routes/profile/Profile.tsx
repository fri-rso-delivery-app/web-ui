import { useQuery } from "react-query";

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

import LogoutIcon from '@mui/icons-material/Logout';
import { UserRead } from "../../schemas/auth/Api";
import FontAwesomeSvgIcon from "../../components/util/FontAwesomeSvgIcon";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {

  const { data: user, isLoading, isError } = useQuery<UserRead>('auth/users/my_profile');

  if (isLoading) return (<CircularProgress/>);

  if (isError || user == null) return (<h1>err loading data</h1>);

  return(
    <>
      <Typography variant="h2" sx={{ m: 4 }}>
        {user.full_name ?? user.username}
      </Typography>

      <TableContainer component={Paper} sx={{ width: 'max-content', margin: 'auto' }}>
        <Table sx={{ minWidth: 320 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row"> username </TableCell>
              <TableCell>{user.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"> email </TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"> id </TableCell>
              <TableCell>{user._id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"> customer? </TableCell>
              <TableCell>{user.is_customer ? (<FontAwesomeSvgIcon icon={faCheck}/>) : (<FontAwesomeSvgIcon icon={faXmark}/>)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"> delivery? </TableCell>
              <TableCell>{user.is_delivery_person ? (<FontAwesomeSvgIcon icon={faCheck}/>) : (<FontAwesomeSvgIcon icon={faXmark}/>)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={() => {
          localStorage.setItem('jwt_token', '');
          window.location.reload();
        }}
        variant="contained"
        sx={{ m: 2, background: 'red' }}
      >
        <LogoutIcon sx={{ mr: 2 }}/>
        logout
      </Button>
      
    </>
  )
}

export default ProfilePage;