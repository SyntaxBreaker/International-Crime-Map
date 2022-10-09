import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Dialog } from "./Dialog";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setIsOpen } from "../features/dialogSlice";
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "../firebase";
import { setCrimes } from "../features/crimeSlice";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map } from "./Map";

export interface Crimes {
    id: string;
    title: string;
    description: string;
    location: string;
}

export function Homepage() {
    const crimes = useAppSelector((state) => state.crimes);
    const dispatch = useAppDispatch();
    const [crimeIdToRemove, setCrimeIdToRemove] = useState<
        string | null | undefined
    >();
    const defaultPosition: LatLngExpression = [48.864716, 2.349];

    useEffect(() => {
        document.title = "Homepage";

        async function getCrimes() {
            try {
                const data = await getDocs(collection(db, "crimes"));
                const crimes: Crimes[] = [];
                data.docs.forEach((crime) => {
                    const { id } = crime;
                    const { title, location, description } = crime.data();
                    crimes.push({ id, title, description, location });
                });

                dispatch(setCrimes(crimes));
            } catch (err) {
                console.log(err);
            }
        }

        getCrimes();
    }, [dispatch, crimes]);

    const handleRemove = (id: string | undefined): void => {
        dispatch(setIsOpen());
        setCrimeIdToRemove(id);
    };

    return (
        <>
            <Grid container>
                <MapContainer
                    center={defaultPosition}
                    zoom={2}
                    style={{ height: "94vh", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {crimes.map((crime) => (
                        <Map
                            handleRemove={(id) => handleRemove(id)}
                            crime={crime}
                            key={crime.id}
                        />
                    ))}
                </MapContainer>
            </Grid>
            <Dialog crimeId={crimeIdToRemove} />
        </>
    );
}
