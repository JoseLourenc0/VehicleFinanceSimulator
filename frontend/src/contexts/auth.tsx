import React, { createContext, useContext, useState } from 'react'
import { authRequest } from '@services/auth'
import { SnackBarContext } from './SnackBar'
import { waitTimeInSeconds } from '@services/utils'

interface IAuthContext {
    signed: boolean,
    signIn(username: string, password: string): Promise<void>,
    error: string,
    signOut(): void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [signed, setSigned] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const { errorSnack, successSnack } = useContext(SnackBarContext)

    const signIn = async (username: string, password: string) => {
        const { token } = await authRequest.login(username, password)
        if (token) {
            localStorage.setItem('user_token', token)
            setSigned(true)
            successSnack('Sucesso ao realizar login')
            await waitTimeInSeconds(2)
        } else {
            setError('Login failed')
            setSigned(false)
            errorSnack('Erro ao fazer o login')
        }
    }

    const signOut = () => {
        localStorage.clear()
    }

    return <AuthContext.Provider value={{
        signed,
        signIn,
        signOut,
        error
    }}>
        {children}
    </AuthContext.Provider>
}

export {
    AuthContext,
    AuthProvider
}
