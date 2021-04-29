import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';



// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: '#1a90ff',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

function FacebookCircularProgress(props) {
    const classes = useStylesFacebook();

    return (
        <>
            <div className={classes.root}>

                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    className={classes.top}
                    classes={{
                        circle: classes.circle,
                    }}
                    size={40}
                    thickness={6}
                    {...props}
                />

            </div>
            {/* <p >
                {"Just a sec! Verifying credentials"}

            </p> */}
        </>
    );
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        left: '50%',
        right: '50%'

    },
});

export default function CustomizedProgressBars() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FacebookCircularProgress />
        </div>
    );
}