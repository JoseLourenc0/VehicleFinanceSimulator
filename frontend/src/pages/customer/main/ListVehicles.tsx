import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useEffect, useState } from 'react';
import { getAvailableVehicles } from '@services/customer';
import { Vehicle } from 'models/vehicle.model';
import { SnackBarContext } from '@contexts/SnackBar';

export default function ListVehicles() {

    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const { errorSnack } = useContext(SnackBarContext)

    useEffect(() => {
        fetchVehicles()
    }, [])

    const fetchVehicles = async () => {
        const { data, error } = await getAvailableVehicles()
        if (error) {
            errorSnack(typeof error === 'string' ? error : error.toString())
            return
        }
        if (!data) return
        setVehicles(data.vehicles)
    }

    return (
        <>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {vehicles.length && vehicles.map((vehicle) => (
                        <Grid item key={vehicle.id} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        pt: '56.25%',
                                    }}
                                    image="https://source.unsplash.com/random?cars"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {vehicle.brand} {vehicle.model}
                                    </Typography>
                                    <Typography>
                                        <b>Cor:</b> {vehicle.color}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button>Simular Empréstimo</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}