import { app } from './http'
import { log } from './utils'
import './app'

const PORT = 3000

app.listen(PORT, () => log(`Running Server on port ${PORT}`))
