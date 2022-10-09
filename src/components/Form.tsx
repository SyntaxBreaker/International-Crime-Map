import { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { doc, setDoc, addDoc, collection } from "firebase/firestore/lite";
import { db } from "../firebase";

interface FormData {
    title: string;
    description: string;
    location: string;
}

export function Form({ data }: { data?: FormData }) {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        location: "",
    });

    const { crimeId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!data) return;
        setFormData(data);
    }, [data]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        async function addCrime() {
            if (crimeId) {
                try {
                    await setDoc(doc(db, "crimes", crimeId), formData);
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    await addDoc(collection(db, "crimes"), formData);
                } catch (err) {
                    console.log(err);
                }
            }
        }

        addCrime();

        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid item xs={12} lg={5} style={{ margin: "0 auto" }}>
                <TextField
                    id="title"
                    name="title"
                    label="Crime title"
                    variant="outlined"
                    margin="dense"
                    sx={{ width: "80%" }}
                    onChange={handleChange}
                    value={formData.title}
                />
            </Grid>
            <Grid item xs={12} lg={5} style={{ margin: "0 auto" }}>
                <TextField
                    id="description"
                    name="description"
                    label="Crime description"
                    variant="outlined"
                    margin="dense"
                    sx={{ width: "80%" }}
                    onChange={handleChange}
                    value={formData.description}
                />
            </Grid>
            <Grid item xs={12} lg={5} style={{ margin: "0 auto" }}>
                <TextField
                    id="location"
                    name="location"
                    label="Crime location"
                    variant="outlined"
                    margin="dense"
                    sx={{ width: "80%" }}
                    onChange={handleChange}
                    value={formData.location}
                />
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: "1rem" }}>
                <Button variant="contained" size="large" type="submit">
                    Submit
                </Button>
            </Grid>
        </form>
    );
}
