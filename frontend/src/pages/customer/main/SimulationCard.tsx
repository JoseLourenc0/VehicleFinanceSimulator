/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import React, { useContext, useEffect, useState } from 'react'
import { Vehicle } from 'models/vehicle.model'
import { Box, CircularProgress, Typography } from '@mui/material'
import { SnackBarContext } from '@contexts/SnackBar'
import { getCustomerByCPF, regCustomer, regSimulation } from '@services/customer'
import { Customer } from '@models/customer.model'
import { urlOnRoute, waitTimeInSeconds } from '@services/utils'
import InputClipboard from '@components/InputClipboard'
import QRCode from 'qrcode.react'

const SimulationCard = (props: { vehicle: Vehicle }) => {
    const { errorSnack } = useContext(SnackBarContext)
    const [customerAlready, setCustomerAlready] = useState(false)
    const [searchedByCPF, setSearchedByCPF] = useState(false)
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [customerData, setCustomerData] = useState<Customer>()
    const [simulationFinished, setSimulationFinished] = useState(false)
    const [urlToSearch, setUrlToSearch] = useState<string>()

    useEffect(() => {
        if (customerData) submitSimulacao({})
    }, [customerData])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const getCustomerByCPFOnReq = async (cpf: string) => {
        const { data } = await getCustomerByCPF(cpf)
        setSearchedByCPF(true)
        if (data) {
            setCustomerAlready(true)
            setCustomerData(data)
        }
        else setCustomerAlready(false)
    }

    const submitSimulacao: (data?: any) => Promise<void> = async ({ cpf, name, email, phone }) => {
        let customerId = customerData?.id || 0
        const defaultErrorMessage = 'Ocorreu uma falha ao processar simulação. Tente novamente mais tarde'
        if (!customerData) {
            setIsLoading(true)
            const { data, error } = await regCustomer({
                cpf, name, email, phone
            })
            if (error) return errorSnack((error as any)?.toString() || defaultErrorMessage)
            if (!data || !data.customer) return errorSnack(defaultErrorMessage)
            customerId = data.customer
        }

        setIsLoading(true)
        const { data, error } = await regSimulation({ customerId, vehicleId: props.vehicle.id })
        await waitTimeInSeconds(4)
        setIsLoading(false)

        if (error) return errorSnack((error as any).toString())
        if (!data || !data.key) return errorSnack(defaultErrorMessage)

        setSimulationFinished(true)

        const { key, accessKey } = data
        setUrlToSearch(urlOnRoute(`discover/${key}/${accessKey}`))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const [cpf, name, email, phone] = [data.get('cpf'), data.get('name'), data.get('email'), data.get('phone')]
        if (!name && !email && !phone) {
            if (!cpf) return errorSnack('Necessário informar o CPF para continuar')
            return getCustomerByCPFOnReq(cpf as string)
        }
        if (!name || !email || !phone || !cpf) return errorSnack('Necessário informar todos os campos para prosseguir')
        submitSimulacao({ cpf, name, email, phone })
    }

    return (
        <>
            <Button onClick={handleClickOpen}>
                Simular Empréstimo
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
                <DialogTitle>{props.vehicle.brand} {props.vehicle.model}</DialogTitle>
                <DialogContent>
                    {
                        !simulationFinished && (
                            <DialogContentText>
                                {!customerData ? 'Para começarmos a simulação, por favor, nos informe alguns dados necessários' : `Estamos processando sua Simulação`}
                            </DialogContentText>
                        )
                    }
                    {isLoading && <CircularProgress />}
                    {
                        !customerData && (
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    hidden={searchedByCPF && customerAlready}
                                    margin="normal"
                                    required
                                    disabled={isLoading}
                                    fullWidth
                                    id="cpf"
                                    label="CPF"
                                    name="cpf"
                                    autoFocus
                                />
                                {
                                    searchedByCPF && !customerAlready && !simulationFinished && (
                                        <>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                disabled={isLoading}
                                                id="name"
                                                label="Nome"
                                                name="name"
                                            />
                                            <TextField
                                                hidden
                                                margin="normal"
                                                required
                                                fullWidth
                                                disabled={isLoading}
                                                id="email"
                                                label="E-mail"
                                                name="email"
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                disabled={isLoading}
                                                id="phone"
                                                label="Telefone"
                                                name="phone"
                                            />
                                        </>
                                    )
                                }
                                <Box display='flex' justifyContent='flex-end'>
                                    <Button color='error' onClick={handleClose}>Cancelar</Button>
                                    <Button disabled={isLoading} type='submit'>Continuar</Button>
                                </Box>
                            </Box>
                        )
                    }
                    {
                        urlToSearch && (
                            <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                                <Typography variant='body1'>
                                    Sua simulação está sendo processada no momento.
                                    <br />
                                    Você pode consultar o status dela scaneando o QrCode abaixo.
                                </Typography>
                                <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
                                    <QRCode value={urlToSearch} />
                                </Box>
                                <InputClipboard value={urlToSearch} />
                            </Box>
                        )
                    }
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SimulationCard
