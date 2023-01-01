import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Form from '@rjsf/mui';
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema } from "@rjsf/utils";

import { Paper } from "@mui/material";
import { queryClient } from "../../util/server";
import { StoreRead } from "../../schemas/packets/Api";

export default function StoresNew() {

  const navigate = useNavigate();

  const createMutation = useMutation((newObj) => {
      return axios.post('/packets/stores/', newObj);
    }, {
      onSuccess: (response) => {
        queryClient.invalidateQueries('packets/stores');

        let newObj = response.data as StoreRead;

        navigate(`/stores/${newObj._id}`, { replace: true });
      },
    }
  );


  const schema: RJSFSchema = {
    title: "New Store",
    type: "object",
    properties: {
      store_name: {type: "string", title: "Name"},
      location: {type: "string", title: "Location"},
    }
  };

  const uiSchema = {
    'ui:submitButtonOptions': {
      'submitText': 'Create Store'
    },
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
