export const MENU_ITEMS = [{
  key: "menu",
  label: "Menu",
  isTitle: true
}, {
  key: "Dashboards",
  label: "Dashboard",
  icon: "feather:home",
  children: [{
    key: "dashboard-crm",
    label: "CRM",
    url: "/dashboard/index"
  }, {
    key: "dashboard-analytics",
    label: "Analytics",
    url: "/dashboard/analytics"
  }, {
    key: "dashboard-ecommerce",
    label: "eCommerce",
    url: "/dashboard/ecommerce"
  }]
}, {
  key: "pages",
  label: "Pages",
  isTitle: true
}, {
  key: "authentication",
  label: "Authentication",
  icon: "feather:users",
  children: [{
    key: "login",
    label: "Log In",
    url: "/auth/login"
  }, {
    key: "register",
    label: "Register",
    url: "/auth/register"
  }, {
    key: "recover-password",
    label: "Recover Password",
    url: "/auth/recover-password"
  }, {
    key: "lock-screen",
    label: "Lock Screen",
    url: "/auth/lock-screen"
  }, {
    key: "confirm-mail",
    label: "Confirm Mail",
    url: "/auth/confirm-mail"
  }, {
    key: "email-verification",
    label: "Email Verification",
    url: "/auth/email-verification"
  }, {
    key: "logout",
    label: "Logout",
    url: "/auth/logout"
  }]
}, {
  key: "error-pages",
  label: "Error Pages",
  icon: "feather:alert-octagon",
  children: [{
    key: "404-error",
    label: "Error 404",
    url: "/error/404"
  }, {
    key: "500-error",
    label: "Error 500",
    url: "/error/500"
  }, {
    key: "503-error",
    label: "Error 503",
    url: "/error/503"
  }, {
    key: "429-error",
    label: "Error 429",
    url: "/error/429"
  }, {
    key: "offline-page",
    label: "Offline Page",
    url: "/error/offline-page"
  }]
}, {
  key: "utility",
  label: "Utility",
  icon: "feather:file-text",
  children: [{
    key: "starter",
    label: "Starter",
    url: "/utility/pages-starter"
  }, {
    key: "profile",
    label: "Profile",
    url: "/utility/profile"
  }, {
    key: "pricing",
    label: "Pricing",
    url: "/utility/pricing"
  }, {
    key: "timeline",
    label: "Timeline",
    url: "/utility/timeline"
  }, {
    key: "invoice",
    label: "Invoice",
    url: "/utility/invoice"
  }, {
    key: "faq",
    label: "Faqs",
    url: "/utility/faqs"
  }, {
    key: "gallery",
    label: "Gallery",
    url: "/utility/gallery"
  }, {
    key: "maintenace",
    label: "Maintenace",
    url: "/maintenance"
  }, {
    key: "coming-soon",
    label: "Coming Soon",
    url: "/coming-soon"
  }]
}, {
  key: "apps",
  label: "Apps",
  isTitle: true
}, {
  key: "todo-list",
  label: "Todo List",
  icon: "feather:columns",
  url: "/apps/todolist"
}, {
  key: "contacts",
  label: "Contacts",
  icon: "feather:map-pin",
  url: "/apps/contacts"
}, {
  key: "calendar",
  label: "Calendar",
  icon: "feather:calendar",
  url: "/apps/calendar"
}, {
  key: "General",
  label: "Apps",
  isTitle: true
}, {
  key: "components",
  label: "Components",
  icon: "feather:package",
  children: [{
    key: "accordions",
    label: "Accordions",
    url: "/components/accordions"
  }, {
    key: "alerts",
    label: "Alerts",
    url: "/components/alerts"
  }, {
    key: "badges",
    label: "Badges",
    url: "/components/badges"
  }, {
    key: "breadcrumb",
    label: "Breadcrumb",
    url: "/components/breadcrumb"
  }, {
    key: "buttons",
    label: "Buttons",
    url: "/components/buttons"
  }, {
    key: "cards",
    label: "Cards",
    url: "/components/cards"
  }, {
    key: "collapse",
    label: "Collapse",
    url: "/components/collapse"
  }, {
    key: "dropdowns",
    label: "Dropdowns",
    url: "/components/dropdown"
  }, {
    key: "embed-video",
    label: "Embed Video",
    url: "/components/video"
  }, {
    key: "grid",
    label: "Grid",
    url: "/components/grid"
  }, {
    key: "img",
    label: "Images",
    url: "/components/images"
  }, {
    key: "list",
    label: "List Group",
    url: "/components/list"
  }, {
    key: "modal",
    label: "Modal",
    url: "/components/modals"
  }, {
    key: "placeholders",
    label: "Placeholders",
    url: "/components/placeholders"
  }, {
    key: "pagination",
    label: "Pagination",
    url: "/components/pagination"
  }, {
    key: "popovers",
    label: "Popovers",
    url: "/components/popovers"
  }, {
    key: "progress",
    label: "Progress",
    url: "/components/progress"
  }, {
    key: "scrollspy",
    label: "Scrollspy",
    url: "/components/scrollspy"
  }, {
    key: "spinners",
    label: "Spinners",
    url: "/components/spinners"
  }, {
    key: "tabs",
    label: "Tabs",
    url: "/components/tabs"
  }, {
    key: "tooltips",
    label: "Tooltips",
    url: "/components/tooltips"
  }, {
    key: "typography",
    label: "Typography",
    url: "/components/typography"
  }]
}, {
  key: "widgets",
  label: "Widgets",
  icon: "feather:aperture",
  url: "/apps/widgets"
}, {
  key: "extendedui",
  label: "Extended Ui",
  icon: "feather:cpu",
  children: [{
    key: "carousel",
    label: "Carousel",
    url: "/extended-ui/carousel"
  }, {
    key: "notifications",
    label: "Notifications",
    url: "/extended-ui/notifications"
  }, {
    key: "offcanvas",
    label: "Offcanvas",
    url: "/extended-ui/offcanvas"
  }, {
    key: "rangeslider",
    label: "Range Slider",
    url: "/extended-ui/range-slider"
  }]
}, {
  key: "icon",
  label: "Icons",
  icon: "feather:award",
  children: [{
    key: "FeatherIcons",
    label: "Feather Icons",
    url: "/icons/feather"
  }, {
    key: "mdiIcons",
    label: "Material Design Icons",
    url: "/icons/mdi-Icon"
  }]
}, {
  key: "form",
  label: "Forms",
  icon: "feather:briefcase",
  children: [{
    key: "GeneralElements",
    label: "General Elements",
    url: "/forms/elements"
  }, {
    key: "validation",
    label: "Validation",
    url: "/forms/validation"
  }, {
    key: "quilljs",
    label: "Quilljs Editor",
    url: "/forms/quilljs"
  }, {
    key: "pickers",
    label: "Pickers",
    url: "/forms/pickers"
  }]
}, {
  key: "tabel",
  label: "Tabels",
  icon: "feather:table",
  children: [{
    key: "basictabel",
    label: "Basic Tables",
    url: "/tables/basic"
  }, {
    key: "datatabel",
    label: "Data Tables",
    url: "/tables/datatables"
  }]
}, {
  key: "chart",
  label: "Apex Charts",
  icon: "feather:pie-chart",
  children: [{
    key: "line",
    label: "Line",
    url: "/apex-charts/line"
  }, {
    key: "area",
    label: "Area",
    url: "/apex-charts/area"
  }, {
    key: "column",
    label: "Column",
    url: "/apex-charts/column"
  }, {
    key: "bar",
    label: "Bar",
    url: "/apex-charts/bar"
  }, {
    key: "mixed",
    label: "Mixed",
    url: "/apex-charts/mixed"
  }, {
    key: "timeline",
    label: "Timeline",
    url: "/apex-charts/timeline"
  }, {
    key: "range",
    label: "Range Area",
    url: "/apex-charts/rangearea"
  }, {
    key: "funnel",
    label: "Funnel",
    url: "/apex-charts/funnel"
  }, {
    key: "candlestick",
    label: "Candlestick",
    url: "/apex-charts/candlestick"
  }, {
    key: "boxplot",
    label: "Boxplot",
    url: "/apex-charts/boxplot"
  }, {
    key: "bubble",
    label: "Bubble Charts",
    url: "/apex-charts/bubble"
  }, {
    key: "scatter",
    label: "Scatter",
    url: "/apex-charts/scatter"
  }, {
    key: "heatmap",
    label: "Heatmap",
    url: "/apex-charts/heatmap"
  }, {
    key: "treemap",
    label: "Treemap",
    url: "/apex-charts/treemap"
  }, {
    key: "pie",
    label: "Pie",
    url: "/apex-charts/pie"
  }, {
    key: "radialbar",
    label: "Radialbar",
    url: "/apex-charts/radialbar"
  }, {
    key: "radar",
    label: "Radar",
    url: "/apex-charts/radar"
  }, {
    key: "polararea",
    label: "Polararea",
    url: "/apex-charts/polararea"
  }]
}, {
  key: "maps",
  label: "Maps",
  icon: "feather:map",
  children: [{
    key: "maps-google",
    label: "Google Map",
    url: "/maps/google"
  }, {
    key: "vector",
    label: "Vector Map",
    url: "/maps/vector"
  }]
}];