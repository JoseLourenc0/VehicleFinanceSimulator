/* eslint-disable @typescript-eslint/no-explicit-any */
import { SnackBarContext } from "@contexts/SnackBar"
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { createVehicle } from "@services/app"
import { useContext, useState } from "react"

const VehicleForm = (props: { updated: () => any }) => {
    const { errorSnack } = useContext(SnackBarContext)
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const [brand, color, model, image] = [data.get('brand'), data.get('color'), data.get('model'), data.get('image')]
        if (!brand || !color || !model) {
            return errorSnack('Necessário informar os dados obrigatórios para continuar')
        }

        if (image && (image as string).length > 240) {
            return errorSnack('URL longa demais')
        }

        const payload = {
            brand: (brand as string),
            color: (color as string),
            model: (model as string),
            image: (image as string),
        }

        setIsLoading(true)
        const { data: apiData, error } = await createVehicle(payload)
        setIsLoading(false)

        if (error || !apiData) return errorSnack((error as any).toString() || 'Ocorreu um erro ao registrar novo veículo')
        setOpen(false)
        props.updated()
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Cadastrar Veículo
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
                <DialogTitle>Cadastrar Veículo</DialogTitle>
                <DialogContent>
                    {isLoading && <CircularProgress />}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            disabled={isLoading}
                            fullWidth
                            id="brand"
                            label="Marca"
                            name="brand"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            disabled={isLoading}
                            id="model"
                            label="Modelo"
                            name="model"
                        />
                        <TextField
                            hidden
                            margin="normal"
                            required
                            fullWidth
                            disabled={isLoading}
                            id="color"
                            label="Cor"
                            name="color"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled={isLoading}
                            id="image"
                            label="Imagem (URL)"
                            name="image"
                        />
                        <Box display='flex' justifyContent='flex-end'>
                            <Button color='error' onClick={handleClose}>Cancelar</Button>
                            <Button disabled={isLoading} type='submit'>Continuar</Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default VehicleForm
