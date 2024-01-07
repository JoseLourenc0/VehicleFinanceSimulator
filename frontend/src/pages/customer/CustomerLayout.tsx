// import AppBar from '@mui/material/AppBar';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
// import Toolbar from '@mui/material/Toolbar';
import { Copyright } from '@components/Copyright';
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

const defaultTheme = createTheme();

const CustomerLayout = () => {
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <main style={{ backgroundColor: 'rgb(236, 237, 242)' }}>
                    <Outlet />
                    <Box sx={{ p: 6 }} component="footer">
                        <Copyright />
                    </Box>
                </main>
            </ThemeProvider>
        </>
    )
}

export default CustomerLayout
