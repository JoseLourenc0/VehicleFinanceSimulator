import { ThemeProvider } from "@emotion/react"
import { CssBaseline, Grid, Paper, createTheme } from "@mui/material"
import SignInForm from "./components/SignInForm"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AuthContext } from "@contexts/auth"

const defaultTheme = createTheme()

const SignInPage = () => {
    const { madeAuthentication } = useContext(AuthContext)
    const token = localStorage.getItem('user_token')
    const navigate = useNavigate()

    useEffect(() => {
        if (madeAuthentication || token) navigate('/app')
    }, [madeAuthentication])

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <SignInForm />
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}
export default SignInPage
