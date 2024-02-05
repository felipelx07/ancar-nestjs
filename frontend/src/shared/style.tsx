import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100%',
    },
    form: {
        maxWidth: 500,
        margin: '0 auto',
        padding: theme.spacing(3),
    },
    textField: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(2),
    },
}));

export default useStyles;