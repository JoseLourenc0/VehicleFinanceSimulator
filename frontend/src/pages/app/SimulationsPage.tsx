/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDataGrid from "@components/CustomDataGrid"
import Title from "@components/Title"
import { SnackBarContext } from "@contexts/SnackBar"
import { SpinnerContext } from "@contexts/Spinner"
import { GridColDef } from "@mui/x-data-grid"
import { getSimulations } from "@services/app"
import moment from "moment"
import { useContext, useEffect, useState } from "react"
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { Simulation } from "@models/Simulation.model"
import { useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"

const SimulationsPage = () => {

    const [simulationsGrid, setSimulationsGrid] = useState<{ cols: GridColDef[], rows: Simulation[] }>()
    const { dismiss, show } = useContext(SpinnerContext)
    const { errorSnack } = useContext(SnackBarContext)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        fetchSimulations()
    }, [])

    const filterVehicleCustomer = (data: Simulation[]) => {
        const vehicleId = Number(searchParams.get('vehicle'))
        const customerId = Number(searchParams.get('customer'))

        return data.filter(simulation => {
            if (vehicleId && simulation.vehicle?.id !== vehicleId) return false
            if (customerId && simulation.customer?.id !== customerId) return false
            return true
        })
    }

    const formatSimulationsGrid = (simulations: Simulation[]) => {
        const cols: GridColDef[] = [
            { field: 'id', headerName: 'ID', flex: 1 },
            {
                field: 'customer', headerName: 'Cliente', renderCell: params =>
                    <Link to={`/app/customers?customer=${params.row.customer?.id}`}>
                        {params.row.customer?.name}
                    </Link>
            },
            {
                field: 'vehicle', headerName: 'Veículo', renderCell: params =>
                    <Link to={`/app/vehicles?vehicle=${params.row.vehicle?.id}`}>
                        {params.row.vehicle?.model}
                    </Link>
            },
            { field: 'score', headerName: 'Score', flex: 1, },
            { field: 'processed', headerName: 'Processado', flex: 1, renderCell: ({ row }) => row.processed ? <DoneIcon /> : <ClearIcon /> },
            { field: 'createdAt', headerName: 'Criado em', flex: 1, renderCell: params => moment(params.row.dateCreated).format('DD/MM/YYYY HH:mm:ss') },
        ]

        const rows = simulations
        setSimulationsGrid({ cols, rows })
    }

    const fetchSimulations = async () => {
        show()
        const { data, error } = await getSimulations()
        dismiss()

        if (!data || error) return errorSnack((error as any).toString() || 'Falha ao buscar simulações')
        formatSimulationsGrid(filterVehicleCustomer(data))
    }

    return (
        <>
            <Title>Simulações</Title>
            {simulationsGrid && <CustomDataGrid rows={simulationsGrid?.rows} cols={simulationsGrid?.cols} />}
        </>
    )
}
export default SimulationsPage
