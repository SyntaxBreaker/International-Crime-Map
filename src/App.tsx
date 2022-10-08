import { Outlet } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { Navbar } from "./components/Navbar";

function App() {
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{ backgroundColor: "#EEEEEE", minHeight: "100vh" }}
        >
            <Grid container direction="column">
                <Grid item>
                    <Navbar />
                </Grid>
                <Grid item>
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
