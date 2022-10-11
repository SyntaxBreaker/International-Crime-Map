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
import { ChangeView } from "./ChangeView";

export interface Crimes {
    id: string;
    title: string;
    description: string;
    latitude: string;
    longitude: string;
}

export function Homepage() {
    const crimes = useAppSelector((state) => state.crimes);
    const dispatch = useAppDispatch();
    const [crimeIdToRemove, setCrimeIdToRemove] = useState<
        string | null | undefined
    >();
    const [defaultPosition, setDefaultPosition] = useState<LatLngExpression | null>(null);

    useEffect(() => {
        document.title = "Homepage";

        if(navigator?.geolocation) {
            navigator.geolocation.getCurrentPosition(location => {
                const {latitude, longitude} = location.coords;
                setDefaultPosition([latitude, longitude]);
            }) 
        }

        async function getCrimes() {
            try {
                const data = await getDocs(collection(db, "crimes"));
                const crimes: Crimes[] = [];
                data.docs.forEach((crime) => {
                    const { id } = crime;
                    const { title, description, latitude, longitude } = crime.data();
                    crimes.push({ id, title, description, latitude, longitude });
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
                    style={{ height: "94vh", width: "100%" }}
                >
                    <ChangeView center={defaultPosition} zoom={12} />
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
