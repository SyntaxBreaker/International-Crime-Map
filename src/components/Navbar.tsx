import { Container, Link } from "@mui/material";
import { Link as RRLink } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";

const links = [
    {
        title: "Homepage",
        URL: "/",
        icon: "FaHome",
    },
    {
        title: "Add a crime",
        URL: "/addCrime",
        icon: "FaPlus",
    },
];

export function Navbar() {
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                backgroundColor: "primary.main",
                color: "white",
                display: "flex",
                justifyContent: "end",
            }}
        >
            {links.map((item) => (
                <Link
                    key={item.title}
                    component={RRLink}
                    to={item.URL}
                    sx={{
                        color: "white",
                        display: "block",
                        padding: "1rem",
                        textAlign: "center",
                    }}
                >
                    {item.icon === "FaHome" ? <FaHome /> : <FaPlus />}
                </Link>
            ))}
        </Container>
    );
}
