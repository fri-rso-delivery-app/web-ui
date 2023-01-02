import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";

export type AddressWidgetProps = {
  coords: string;
};
export default function AddressWidget({coords}: AddressWidgetProps) {

  const { data: address, isLoading, isError } = useQuery<string>(
    `maps/distances/get_address?coord=${encodeURIComponent(coords)}`
  );

  if (isLoading) return (<CircularProgress/>);

  if (isError || address == null) return (<h1>err loading data</h1>);

  return (<> {address} </>)
}
