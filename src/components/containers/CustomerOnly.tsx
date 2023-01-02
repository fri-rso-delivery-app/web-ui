import { useQuery } from "react-query";

import {
  CircularProgress,
} from "@mui/material";

import { UserRead } from "../../schemas/auth/Api";

type CustomerOnlyProps = {
  children: JSX.Element;
};

export default function CustomerOnly({children}: CustomerOnlyProps) {

  const { data: user, isLoading, isError } = useQuery<UserRead>('auth/users/my_profile');

  if (isLoading) return (<CircularProgress/>);

  if (isError || user == null) return (<h1>err loading data</h1>);

  if (user.is_customer) return children

  return ( <> </> )
}
