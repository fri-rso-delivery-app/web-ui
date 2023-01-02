import { TextField } from "@mui/material";
import { WidgetProps } from "@rjsf/utils";

export default function MultilineText(props: WidgetProps) {
    return (
        <TextField
            label={props.label}
            value={props.value}
            onChange={(event) => props.onChange(event.target.value)}
            required={props.required}
            variant="outlined"
            multiline
            rows={4}
        />
    )
}
