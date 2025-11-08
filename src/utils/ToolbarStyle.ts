export const APP_BAR_STYLES = {
  backgroundColor: "background.paper",
  borderBottom: 1,
  borderColor: "divider",
};

export const TOOLBAR_STYLES = {
  minHeight: { 
    xs: "48px !important", 
    md: "64px !important" 
  },
  paddingX: { 
    xs: 1, 
    md: 2 
  },
};

export const TABS_STYLES = {
  minHeight: { 
    xs: 48, 
    md: 64 
  },
  "& .MuiTab-root": {
    minHeight: { 
      xs: 48, 
      md: 64 
    },
    fontSize: { 
      xs: "0.75rem", 
      md: "0.875rem" 
    },
    padding: { 
      xs: "12px 16px", 
      md: "16px 20px" 
    },
    minWidth: "auto",
  },
  "& .MuiTabs-scrollButtons": {
    width: { 
      xs: 32, 
      md: 40 
    },
    "&.Mui-disabled": {
      opacity: 0.3,
    },
  },
};