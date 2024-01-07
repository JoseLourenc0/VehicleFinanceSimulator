import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material"
import './CustomerMain.css'
import { useNavigate } from "react-router-dom"

const CustomerMain = () => {

    const navigate = useNavigate()

    return (
        <Container maxWidth='xl' style={{ padding: 0, height: '100vh' }}>
            <Grid container style={{ height: '100%' }}>
                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            height: '100%',
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                Descubra a Variedade de Veículos
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                Explore nossa seleção de veículos disponíveis para simulação de financiamento. Conheça modelos, marcas e cores diferentes, e descubra as opções de pagamento que se encaixam perfeitamente nas suas necessidades. Encontre o carro dos seus sonhos com facilidade e simplicidade.
                            </Typography>
                            <Stack
                                sx={{ pt: 4 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <Button variant="contained" onClick={() => navigate('/discover')}>Descobrir agora</Button>
                            </Stack>
                        </Container>
                    </Box>
                </Grid>
                <Grid className="main-image" item xs={12} sm={6} />
            </Grid>
        </Container>
    )
}

export default CustomerMain