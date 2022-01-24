import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

const SnackbarComponent = ({ open, displayMessage }) => {
    const slideTransition = (props) => {
        return <Slide {...props} direction="down" />;
    };
    return(
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            open={open}
            TransitionComponent={slideTransition}
        >
            <Alert severity="error" sx={{ width: '100%' }}>
                {displayMessage}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComponent;