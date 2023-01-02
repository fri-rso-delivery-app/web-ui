import { useMutation, useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import Form from '@rjsf/mui';
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema } from "@rjsf/utils";

import { Paper, Typography } from "@mui/material";
import { queryClient } from "../../util/server";
import { PacketCreate, StoreRead } from "../../schemas/packets/Api";
import MultilineText from "../../components/forms/MultilineText";
import { StrPoint } from "../../schemas/maps/Api";

export default function PacketNew() {

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const storeId = searchParams.get('storeId')

  const createMutation = useMutation(async (newObj: PacketCreate) => {
      const res = await axios.get(`/maps/distances/get_coords?address=${encodeURIComponent(newObj.delivery_destination)}`)

      const coords = res.data as StrPoint;

      return axios.post('/packets/packets/', {
        ...newObj,
        store_id: storeId,
        delivery_destination: `${coords.lat};${coords.lng}`
      });
    }, {
      onSuccess: (response) => {
        queryClient.invalidateQueries('packets/packets');

        let newObj = response.data as StoreRead;

        navigate(`/packets/${newObj._id}`, { replace: true });
      },
    }
  );


  const schema: RJSFSchema = {
    title: "New Package",
    type: "object",
    properties: {
      description: {type: "string", title: "Description"},
      delivery_destination: {type: "string", title: "Deliver Location"},
    }
  };

  const uiSchema = {
    'ui:submitButtonOptions': {
      'submitText': 'Create Package'
    },
    delivery_destination: {
      'ui:size': 12,
      'ui:widget': MultilineText,
    },
  }

  if (!storeId) {
    return (
      <Typography variant="h2">
        Missing required param "storeId"!
      </Typography>
    )
  }


  return(
    <Paper variant="outlined" sx={{
      p: 2,
      maxWidth: 700,
      minWidth: 400,
      m: 'auto'
    }}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={({formData}, _) => createMutation.mutate(formData) }
      />
    </Paper>
  )
}
