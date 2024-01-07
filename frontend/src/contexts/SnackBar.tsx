import React, { createContext, useState } from "react";
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'

interface SnackBarContextProps {
    open?: boolean,
    time?: number,
    severity: AlertColor
    message: string
}

interface ISnackBar {
    showSnack(props: SnackBarContextProps): void
    successSnack(message: string): void
    errorSnack(message: string): void
}

const SnackBarContext = createContext<ISnackBar>({} as ISnackBar)

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const SnackBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [snackBar, setSnackbar] = useState<SnackBarContextProps>({
        open: false,
        time: 4000,
        severity: 'info',
        message: ''
    })

    const validTime = (time?: number) => {
        return time ? time : 4000
    }

    const showSnack = (props: SnackBarContextProps) => {
        setSnackbar({ ...props, time: validTime(props.time), open: true })
    }

    const successSnack = (message: string) => {
        showSnack({ message, time: validTime(), severity: 'success' })
    }

    const errorSnack = (message: string) => {
        showSnack({ message, time: validTime(), severity: 'error' })
    }

    const handleClose = () => {
        setSnackbar(old => ({ ...old, open: false }))
    }

    return (
        <SnackBarContext.Provider value={{
            showSnack,
            successSnack,
            errorSnack
        }}>
            {children}
            <Snackbar open={snackBar.open} autoHideDuration={snackBar.time} onClose={handleClose}>
                <Alert severity={snackBar.severity}>{snackBar.message}</Alert>
            </Snackbar>
        </SnackBarContext.Provider>
    )
}

export { SnackBarContext, SnackBarProvider }
