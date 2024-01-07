import { useEffect } from "react"
import { RouteObject, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom"
import CustomerLayout from "@pages/customer/CustomerLayout"
import AppLayout from "@pages/app/AppLayout"
import CustomerMain from "@pages/customer/main/CustomerMain"
import ListVehicles from "@pages/customer/main/ListVehicles"

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
        element: <CustomerMain />
    },
    {
        path: '/discover',
        element: <CustomerLayout />,
        children: [
            {
                path: '',
                element: <ListVehicles />
            }
        ]
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
