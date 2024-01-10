import { Copyright } from "@components/Copyright"
import { SnackBarContext } from "@contexts/SnackBar"
import { AuthContext } from "@contexts/auth"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, IconButton, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"

const SignInForm = () => {

    const { errorSnack } = useContext(SnackBarContext)
    const { signIn } = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const [user, password] = [data.get("user"), data.get("password")]
        login(user as string, password as string)
    }

    const login = async (username: string, password: string) => {
        if (!username || !password)
            return errorSnack("Necessário informar campos obrigatórios")

        await signIn(username, password)
    }

    return (
        <Box
            sx={{
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: '50%',
                transform: 'translateY(-50%)'
            }}
        >
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userInput"
                    label="Usuário"
                    name="user"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    InputProps={{
                        endAdornment:
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}

                            </IconButton>

                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className='dark-gray'
                >
                    Sign In
                </Button>
                <Copyright />
            </Box>
        </Box>
    )
}

export default SignInForm
