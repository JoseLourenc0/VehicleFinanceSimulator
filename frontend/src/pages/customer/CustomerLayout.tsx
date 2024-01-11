import CssBaseline from '@mui/material/CssBaseline';
import { Copyright } from '@components/Copyright';
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SpinnerProvider } from '@contexts/Spinner';

const defaultTheme = createTheme();

const CustomerLayout = () => {
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
                    <SpinnerProvider>
                        <Outlet />
                        <Box sx={{ p: 6 }} component="footer">
                            <Copyright />
                        </Box>
                    </SpinnerProvider>
                </main>
            </ThemeProvider>
        </>
    )
}

export default CustomerLayout
