import { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { doc, setDoc, addDoc, collection } from "firebase/firestore/lite";
import { db } from "../firebase";

interface FormData {
    title: string;
    description: string;
    latitude: string;
    longitude: string;
}

export function Form({ data }: { data?: FormData }) {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        latitude: "",
        longitude: "",
    });

    const { crimeId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!data) return;
        setFormData(data);
    }, [data]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        if(/^\s/gm.test(value)) return;
        if(name === 'latitude' || name === 'longitude') {
            if(/[^-0-9.]/g.test(value) || value.charAt(0) === '.') return;
        }
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
                    inputProps={{maxLength: 32}}
                    required
                    error={formData.title === ''}
                    helperText={formData.title === '' ? "title: can't be blank" : ''}
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
                    inputProps={{maxLength: 128}}
                    required
                    error={formData.description === ''}
                    helperText={formData.description === '' ? "description: can't be blank" : ''}
                />
            </Grid>
            <Grid item xs={12} lg={5} style={{ margin: "0 auto" }}>
                <TextField
                    id="latitude"
                    name="latitude"
                    label="Crime latitude"
                    variant="outlined"
                    margin="dense"
                    sx={{ width: "80%" }}
                    onChange={handleChange}
                    value={formData.latitude}
                    required
                    error={formData.latitude === ''}
                    helperText={formData.latitude === '' ? "latitude: can't be blank" : ''}
                />
            </Grid>
            <Grid item xs={12} lg={5} style={{ margin: "0 auto" }}>
                <TextField
                    id="long"
                    name="longitude"
                    label="Crime longitude"
                    variant="outlined"
                    margin="dense"
                    sx={{ width: "80%" }}
                    onChange={handleChange}
                    value={formData.longitude}
                    required
                    error={formData.longitude === ''}
                    helperText={formData.longitude === '' ? "longitude: can't be blank" : ''}
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
