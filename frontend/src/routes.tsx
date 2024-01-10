import { useEffect } from "react"
import { RouteObject, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom"
import CustomerLayout from "@pages/customer/CustomerLayout"
import AppLayout from "@pages/app/AppLayout"
import CustomerMain from "@pages/customer/main/CustomerMain"
import ListVehicles from "@pages/customer/main/ListVehicles"
import VerifySimulation from "@pages/customer/main/VerifySimulation"
import SignInPage from "@pages/app/SignInPage"
import CustomersPage from "@pages/app/CustomersPage"
import VehiclesPage from "@pages/app/VehiclesPage"

const RedirectTo = (props: { path?: string }) => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(props.path || '/')
    }, [])
    return <></>
}

const RedirectToApp = () => <RedirectTo />

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
            },
            {
                path: ':key/:accessKey',
                element: <VerifySimulation />
            }
        ]
    },
    {
        path: '/app',
        element: <AppLayout />,
        children: [
            {
                path: '',
                element: <CustomersPage />
            },
            {
                path: 'customers',
                element: <CustomersPage />
            },
            {
                path: 'vehicles',
                element: <VehiclesPage />
            },
            {
                path: '*',
                element: <RedirectTo path="/app/customers" />
            },
        ]
    },
    {
        path: '/sign-in',
        element: <SignInPage />
    },
    {
        path: '*',
        element: <RedirectToApp />
    }
]

const router = createBrowserRouter(routes)

const Routes = () => <RouterProvider router={router} />

export default Routes
