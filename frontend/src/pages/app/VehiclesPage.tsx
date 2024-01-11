/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDataGrid from "@components/CustomDataGrid"
import Title from "@components/Title"
import { SnackBarContext } from "@contexts/SnackBar"
import { SpinnerContext } from "@contexts/Spinner"
import { Vehicle } from "@models/vehicle.model"
import { IconButton } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import { getVehicles } from "@services/app"
import moment from "moment"
import ImageIcon from '@mui/icons-material/Image';
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import VehicleForm from "./components/VehicleForm"

const VehiclesPage = () => {

    const [vehiclesGrid, setVehiclesGrid] = useState<{ cols: GridColDef[], rows: Vehicle[] }>()
    const { dismiss, show, visible } = useContext(SpinnerContext)
    const { errorSnack } = useContext(SnackBarContext)

    useEffect(() => {
        fetchVehicles()
    }, [])

    const formatVehiclesGrid = (vehicles: Vehicle[]) => {
        const cols: GridColDef[] = [
            { field: 'id', headerName: 'ID', flex: 1 },
            { field: 'brand', headerName: 'Marca', flex: 1 },
            { field: 'model', headerName: 'Modelo', flex: 1 },
            { field: 'color', headerName: 'Cor', flex: 1 },
            {
                field: 'image', headerName: 'Imagem', flex: 1, renderCell: params =>
                    <Link hidden={!params.row.image} target="_blank" to={params.row.image}>
                        <IconButton>
                            <ImageIcon />
                        </IconButton>
                    </Link>
            },
            { field: 'createdAt', headerName: 'Criado em', flex: 1, renderCell: params => moment(params.row.dateCreated).format('DD/MM/YYYY HH:mm:ss') },
        ]

        const rows = vehicles
        setVehiclesGrid({ cols, rows })
    }

    const fetchVehicles = async () => {
        show()
        const { data, error } = await getVehicles()
        dismiss()

        if (!data || error) return errorSnack((error as any).toString() || 'Falha ao buscar veículos')
        formatVehiclesGrid(data)
    }

    const createdNewVehicle = () => {
        fetchVehicles()
    }

    return (
        <>
            <Title>Veículos</Title>
            {!visible && <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '8px 0' }}>
                <VehicleForm updated={createdNewVehicle} />
            </div>}
            {vehiclesGrid && <CustomDataGrid rows={vehiclesGrid?.rows} cols={vehiclesGrid?.cols} />}
        </>
    )
}
export default VehiclesPage
