import { SnackBarProvider } from '@contexts/SnackBar'
import Routes from './routes'

function App() {

  return (
    <div className="App">
      <SnackBarProvider>
        <Routes />
      </SnackBarProvider>
    </div>
  )
}

export default App
