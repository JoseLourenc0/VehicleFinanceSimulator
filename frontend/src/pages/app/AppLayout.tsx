import { AuthContext } from '@contexts/auth'
import Grid from '@mui/material/Grid'
import { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Drawer } from '@components/Drawer'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { SideMenu } from '@components/SideMenu'
import { Copyright } from '@components/Copyright'
import { AppBar } from '@components/AppBar'
import { ToolBarMenu } from '@components/ToolBarMenu'

import { SpinnerProvider } from '@contexts/Spinner'
import { Paper } from '@mui/material'

const defaultTheme = createTheme()

const AppLayout = () => {
    const { signed } = useContext(AuthContext)
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        checkIfLogged()
    }, [signed])

    const checkIfLogged = () => {
        if (!signed) navigate('/sign-in')
    }

    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />

                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >

                            </Typography>
                            <ToolBarMenu />
                        </Toolbar>
                    </AppBar>

                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            <SideMenu />
                        </List>
                    </Drawer>

                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                {/* Recent Orders */}
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <SpinnerProvider>
                                            {signed && <Outlet />}
                                        </SpinnerProvider>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Copyright />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default AppLayout
