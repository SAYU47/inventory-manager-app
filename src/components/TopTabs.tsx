import React from "react";
import { 
  Tabs, 
  Tab, 
  AppBar, 
  Toolbar, 
  Box, 
  useTheme, 
  useMediaQuery 
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate, useLocation } from "react-router-dom";
import { APP_BAR_STYLES, TABS_STYLES, TOOLBAR_STYLES } from "../utils/ToolbarStyle";

export default function TopTabs() {
  const types = useSelector((state: RootState) => state.types);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getActiveTabValue = (): string => {
    const { pathname } = location;

    if (pathname === "/manage") return "manage";
    if (pathname === "/") return "all";
    if (pathname.startsWith("/type/")) {
      return pathname.split("/type/")[1];
    }
    
    return "all";
  };

  const handleTabChange = (
    event: React.SyntheticEvent, 
    newValue: string
  ): void => {
    switch (newValue) {
      case "all":
        navigate("/");
        break;
      case "manage":
        navigate("/manage");
        break;
      default:
        navigate(`/type/${newValue}`);
        break;
    }
  };

  const tabItems = [
    <Tab value="all" key="all" label="All" />,
    ...types.map((type) => (
      <Tab value={type.id} key={type.id} label={type.name} />
    )),
    <Tab value="manage" key="manage" label="Manage Types" />,
  ];

  const activeTabValue = getActiveTabValue();

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={1}
      sx={APP_BAR_STYLES}
    >
      <Toolbar 
        variant={isMobile ? "dense" : "regular"}
        sx={TOOLBAR_STYLES}
      >
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={activeTabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons={true}
            allowScrollButtonsMobile={true}
            sx={TABS_STYLES}
          >
            {tabItems}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}