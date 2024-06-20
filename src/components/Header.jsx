import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Countries from "./Countries";
import CountryDetail from "./CountryDetail";
import Vista1 from "../pages/Vista1";
import Vista2 from "../pages/Vista2";
import Search from "../components/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

function Header({ window, searchCountry, setSearchCountry }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setMobileOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <div className="bg-gray-500">
      <div className="rounded-lg bg-gray-300 text-lg text-center text-gray-500 my-3 mx-6 p-2 font-bold">
        Logo
      </div>
      <List sx={{ color: "white" }}>
        {[
          { text: "Home", icon: <HomeIcon />, path: "/" },
          { text: "Vista 1", icon: <SettingsIcon />, path: "/vista1" },
          { text: "Vista 2", icon: <SettingsIcon />, path: "/vista2" },
        ].map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(path)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ mr: 0, display: { sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#cdf5ff",
        }}
      >
        {isMobile && <Toolbar />}
        {location.pathname === "/vista1" ? (
          <Vista1 />
        ) : location.pathname === "/vista2" ? (
          <Vista2 />
        ) : (
          <>
            <Search
              searchCountry={searchCountry}
              setSearchCountry={setSearchCountry}
            />
            <Countries
              searchCountry={searchCountry}
              onCountryClick={handleCountryClick}
            />
            {selectedCountry && (
              <CountryDetail
                country={selectedCountry}
                onClose={() => setSelectedCountry(null)}
              />
            )}
          </>
        )}
        <Outlet />
      </Box>
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
  searchCountry: PropTypes.string.isRequired,
  setSearchCountry: PropTypes.func.isRequired,
};

export default Header;
