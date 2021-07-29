import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import { setErrorAC } from '../../app/app-reducer'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

// const useStyles = makeStyles((theme: Theme) => ({
//     root: {
//         width: '100%',
//         '& > * + *': {
//             marginTop: theme.spacing(2),
//         },
//     },
// }));

export function ErrorSnackBar() {
  // const classes = useStyles();
  // const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //     setOpen(true);
  // };
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  )
  const dispatch = useDispatch()
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setErrorAC(null))
    //setOpen(false);
  }

  const isOpen = error !== null
  return (
    // // <div className={classes.root}>
    // //     <Button variant="outlined" onClick={handleClick}>
    // //         Open success snackbar
    //     {/*</Button>*/}
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>

    // </div>
  )
}
