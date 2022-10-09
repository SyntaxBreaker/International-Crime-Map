import mark from "../mark.png";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const myIcon = new Icon({
    iconUrl: mark,
    iconSize: [32, 32],
});

export interface Crimes {
    id: string;
    title: string;
    description: string;
    location: string;
}

interface MapProps {
    crime: Crimes;
    handleRemove: (id: string | undefined) => void;
}

export function Map({ handleRemove, crime }: MapProps) {
    return (
        <Marker position={crime["location"]!.split(",") as any} icon={myIcon}>
            <Popup minWidth={250}>
                <Typography variant="h4" align="center">
                    {crime.title}
                </Typography>
                <Typography variant="body1">{crime.description}</Typography>
                <Grid container justifyContent="space-around">
                    <Button
                        component={Link}
                        to={`editCrime/${crime.id}`}
                        variant="contained"
                        sx={{ color: "white!important" }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleRemove(crime.id)}
                    >
                        Remove
                    </Button>
                </Grid>
            </Popup>
        </Marker>
    );
}
