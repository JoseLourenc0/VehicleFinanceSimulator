import { SnackBarProvider } from '@contexts/SnackBar'
import Routes from './routes'
import { AuthProvider } from '@contexts/auth'

function App() {

  return (
    <div className="App">
      <SnackBarProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </SnackBarProvider>
    </div>
  )
}

export default App
