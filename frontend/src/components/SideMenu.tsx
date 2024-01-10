import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People'


const pagesList: { route: string, icon: JSX.Element, label: string }[] = [
  {
    route: 'customers',
    label: 'Clientes',
    icon: <PeopleIcon />
  },
  {
    route: 'vehicles',
    label: 'Veículos',
    icon: <DirectionsCarIcon />
  },
  {
    route: 'simulations',
    label: 'Simulações',
    icon: <TrendingUpIcon />
  },
]

export const SideMenu = () => {
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    navigate(`/app/${route}`);
  };

  return (
    <>
      {
        pagesList.map(page =>
          <ListItemButton key={page.route} onClick={() => handleClick(page.route)}>
            <ListItemIcon>
              {page.icon}
            </ListItemIcon>
            <ListItemText primary={page.label} />
          </ListItemButton>
        )
      }
    </>
  );
};
