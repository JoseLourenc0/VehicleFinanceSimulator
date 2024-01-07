import { useEffect } from "react"
import { RouteObject, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom"
import CustomerLayout from "./pages/customer/CustomerLayout"
import AppLayout from "./pages/app/AppLayout"

const RedirectToApp = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/')
    }, [])
    return <></>
}

const routes: RouteObject[] = [
    {
        path: '/',
        element: <CustomerLayout />
    },
    {
        path: '/app',
        element: <AppLayout />
    },
    {
        path: '*',
        element: <RedirectToApp />
    }
]

const router = createBrowserRouter(routes)

const Routes = () => <RouterProvider router={router} />

export default Routes
