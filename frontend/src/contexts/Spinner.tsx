import { CircularProgress } from "@mui/material"
import React, { createContext, useState } from "react"

interface ISpinner {
    show(): void
    dismiss(): void
    visible?: boolean
}

const SpinnerContext = createContext<ISpinner>({} as ISpinner)

const SpinnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [visible, setVisible] = useState(false)

    const show = () => {
        setVisible(true)
    }

    const dismiss = () => {
        setVisible(false)
    }

    return (
        <SpinnerContext.Provider value={{
            show,
            dismiss,
            visible
        }}>
            {visible && <CircularProgress />}
            {children}
        </SpinnerContext.Provider>
    )
}

export { SpinnerContext, SpinnerProvider }
