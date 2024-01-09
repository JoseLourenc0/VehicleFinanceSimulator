import { IconButton, Input, Tooltip } from "@mui/material"
import FileCopyIcon from '@mui/icons-material/FileCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Link } from "react-router-dom"

interface CopyToClipboardProps {
    value: string
}
const InputClipboard: React.FC<CopyToClipboardProps> = ({ value }) => {

    const handleCopyToClipboard = async () => {
        const type = "text/plain"
        const blob = new Blob([value], { type })
        const data = [new ClipboardItem({ [type]: blob })]
        await navigator.clipboard.write(data)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Input
                value={value}
                readOnly
                disabled
            />
            <Tooltip title="Copiar">
                <IconButton color="primary" onClick={handleCopyToClipboard}>
                    <FileCopyIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Abrir em nova guia">
                <Link to={value} target="_blank">
                    <IconButton color="primary">
                        <OpenInNewIcon />
                    </IconButton>
                </Link>
            </Tooltip>
        </div>
    )
}
export default InputClipboard
