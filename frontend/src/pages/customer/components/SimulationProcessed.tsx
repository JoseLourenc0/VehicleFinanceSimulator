import RadialBarChart from "@components/RadialBarChart"
import { Simulation } from "@models/Simulation.model"
import { Box, Grid, Typography } from "@mui/material"
import GhostCar from '@assets/images/ghost.png'

const SimulationProcessed = (props: { simulation: Simulation }) => {

    const {
        score,
        vehicle,
        plan
    } = props.simulation

    return (
        <Box display='flex' justifyContent='center' textAlign='center' flexDirection='column' gap='2px'>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <RadialBarChart
                        title="Sua pontuação"
                        intervals={[1 / 1000, 3 / 10, 6 / 10, 8 / 10, 1]}
                        colors={['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF']}
                        name="scoreChart"
                        valInPercentage={score / 1000}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Typography variant="h6" align="center">
                        {plan?.title}
                    </Typography>
                    <Typography variant="body1" align="center">
                        {plan?.text}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Typography variant="h4" gutterBottom>
                        Veículo selecionado
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {vehicle?.brand + ' ' + vehicle?.model} ({vehicle?.color})
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <img
                        src={vehicle?.image || GhostCar}
                        alt={vehicle?.brand + ' ' + vehicle?.model}
                        style={{ maxWidth: '400px', maxHeight: '400px', width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '4px' }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
export default SimulationProcessed
