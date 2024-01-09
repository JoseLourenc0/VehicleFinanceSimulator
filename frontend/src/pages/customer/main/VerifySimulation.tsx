/* eslint-disable @typescript-eslint/no-explicit-any */
import { SnackBarContext } from "@contexts/SnackBar"
import { Simulation } from "@models/Simulation.model"
import { getSimulationByKey } from "@services/customer"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SimulationUnderProccess from "../components/SimulationUnderProccess"
import SimulationProcessed from "../components/SimulationProcessed"
import { waitTimeInSeconds } from "@services/utils"
import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const VerifySimulation = () => {
    const navigate = useNavigate()
    const { key, accessKey } = useParams()
    const { errorSnack } = useContext(SnackBarContext)
    const [simulationData, setSimulationData] = useState<Simulation>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchSimulation()
    }, [])

    const goToListPage = () => {
        navigate('/discover')
    }

    const fetchSimulation = async () => {
        const defaultErrorMessage = 'Falha ao buscar dados da simulação'
        if (!key || !accessKey) {
            goToListPage()
            errorSnack(defaultErrorMessage)
            return
        }

        setIsLoading(true)
        const { data, error } = await getSimulationByKey(key, accessKey)
        setIsLoading(false)

        if (error || !data) {
            errorSnack((error as any).toString() || defaultErrorMessage)
            return
        }

        setSimulationData(data)
        if (!data.processed) {
            await waitTimeInSeconds(10)
            fetchSimulation()
        }
    }

    return (
        <>
            <main style={{ paddingTop: '32px' }}>
                {
                    ((simulationData && !simulationData.processed) || isLoading) && <SimulationUnderProccess />
                }
                {
                    simulationData && simulationData.processed && <SimulationProcessed simulation={simulationData} />
                }
            </main>
            <Box display='flex' justifyContent='center' paddingTop='32px'>
                <Typography>
                    Confira outros de nossos veículos <Link target="_blank" to='/discover'>aqui</Link>.
                </Typography>
            </Box>
        </>
    )
}
export default VerifySimulation
