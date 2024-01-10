/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDataGrid from "@components/CustomDataGrid"
import Title from "@components/Title"
import { SnackBarContext } from "@contexts/SnackBar"
import { SpinnerContext } from "@contexts/Spinner"
import { Customer } from "@models/customer.model"
import { GridColDef } from "@mui/x-data-grid"
import { getCustomers } from "@services/app"
import moment from "moment"
import { useContext, useEffect, useState } from "react"

const CustomersPage = () => {

    const [customersGrid, setCustomersGrid] = useState<{ cols: GridColDef[], rows: Customer[] }>()
    const { dismiss, show } = useContext(SpinnerContext)
    const { errorSnack } = useContext(SnackBarContext)

    useEffect(() => {
        fetchCustomers()
    }, [])

    const formatCustomersGrid = (customers: Customer[]) => {
        const cols: GridColDef[] = [
            { field: 'id', headerName: 'ID', flex: 1 },
            { field: 'name', headerName: 'Nome', flex: 1 },
            { field: 'email', headerName: 'E-mail', flex: 1 },
            { field: 'cpf', headerName: 'CPF', flex: 1 },
            { field: 'phone', headerName: 'Telefone', flex: 1 },
            { field: 'createdAt', headerName: 'Criado em', flex: 1, renderCell: params => moment(params.row.dateCreated).format('DD/MM/YYYY HH:mm:ss') },
        ]

        const rows = customers
        setCustomersGrid({ cols, rows })
    }

    const fetchCustomers = async () => {
        show()
        const { data, error } = await getCustomers()
        dismiss()

        if (!data || error) return errorSnack((error as any).toString() || 'Falha ao buscar clientes')
        formatCustomersGrid(data)
    }

    return (
        <>
            <Title>Clientes</Title>
            {customersGrid && <CustomDataGrid rows={customersGrid?.rows} cols={customersGrid?.cols} />}
        </>
    )
}
export default CustomersPage