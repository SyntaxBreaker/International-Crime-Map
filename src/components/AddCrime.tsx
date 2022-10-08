import { useEffect } from "react";
import { Grid } from "@mui/material";
import { Form } from "./Form";

export function AddCrime() {
    useEffect(() => {
        document.title = "Add a crime";
    }, []);

    return (
        <Grid container direction="column" style={{ textAlign: "center" }}>
            <h2>Add a crime:</h2>
            <Form />
        </Grid>
    );
}
