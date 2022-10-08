import {
    Button,
    Dialog as Dial,
    DialogActions,
    DialogTitle,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setIsOpen } from "../features/dialogSlice";
import { doc, deleteDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { remove } from "../features/crimeSlice";

export function Dialog({ crimeId }: { crimeId: string | null | undefined }) {
    const isOpen = useAppSelector((state) => state.dialog.isOpen);
    const dispatch = useAppDispatch();

    const removeCrime = (event: React.SyntheticEvent): void => {
        async function deleteCrime() {
            await deleteDoc(doc(db, "crimes", `${crimeId}`));
            dispatch(remove({ id: crimeId }));
            dispatch(setIsOpen());
        }

        deleteCrime();
    };

    return (
        <Dial open={isOpen}>
            <DialogTitle id="alert-dialog-title">
                Do you want to remove the crime?
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => dispatch(setIsOpen())}>Disagree</Button>
                <Button onClick={removeCrime}>Agree</Button>
            </DialogActions>
        </Dial>
    );
}
