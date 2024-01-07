import { Typography } from "@mui/material"
import Link from '@mui/material/Link'

export function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/joselourenc0">
                José Lourenço
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
