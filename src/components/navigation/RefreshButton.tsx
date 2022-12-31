import { IconButton } from "@mui/material";

import FontAwesomeSvgIcon from "../util/FontAwesomeSvgIcon";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { queryClient } from "../../util/server";


export default function RefreshButton() {

  return (
    <IconButton
      onClick={() => queryClient.invalidateQueries()}
      color="inherit"
    >
      <FontAwesomeSvgIcon icon={faArrowRotateRight}/>
    </IconButton>
  );
}
