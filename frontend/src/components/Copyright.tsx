/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@mui/material"
import Link from '@mui/material/Link'

export function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/joselourenc0">
                José Lourenço
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
