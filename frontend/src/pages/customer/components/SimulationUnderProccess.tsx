import { Player } from "@lottiefiles/react-lottie-player"
import { Box, Typography } from "@mui/material"
import Processing from '@assets/lottie/processing.json'

const SimulationUnderProccess = () => {
    return (
        <Box textAlign='center'>
            <Player
                autoplay
                loop
                src={Processing}
                style={{ height: '60%', width: '60%', maxWidth: '600px', maxHeight: '600px' }}
            >

            </Player>
            <Typography variant="body1">
                Aguarde, estamos processando sua simulação...
            </Typography>
        </Box>
    )
}
export default SimulationUnderProccess
