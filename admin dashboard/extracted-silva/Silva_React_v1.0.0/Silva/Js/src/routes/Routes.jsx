import { lazy } from "react";
const DashboardInedx = lazy(() => import("@/app/(admin)/dashboard/index/Index"));
const DashboardAnalytics = lazy(() => import("@/app/(admin)/dashboard/analytics"));
const DashboardEcommerce = lazy(() => import("@/app/(admin)/dashboard/ecommerce"));
const AreaChart = lazy(() => import("@/app/(admin)/apex-charts/area"));
const BarChart = lazy(() => import("@/app/(admin)/apex-charts/bar"));
const BoxPlotChart = lazy(() => import("@/app/(admin)/apex-charts/boxplot"));
const BubbleChart = lazy(() => import("@/app/(admin)/apex-charts/bubble"));
const CandlestickChart = lazy(() => import("@/app/(admin)/apex-charts/candlestick"));
const ColumnChart = lazy(() => import("@/app/(admin)/apex-charts/column"));
const FunnelChart = lazy(() => import("@/app/(admin)/apex-charts/funnel"));
const HeatmapChart = lazy(() => import("@/app/(admin)/apex-charts/heatmap"));
const LineChart = lazy(() => import("@/app/(admin)/apex-charts/line"));
const MixedChart = lazy(() => import("@/app/(admin)/apex-charts/mixed"));
const PieChart = lazy(() => import("@/app/(admin)/apex-charts/pie"));
const PolarChart = lazy(() => import("@/app/(admin)/apex-charts/polararea"));
const RadarChart = lazy(() => import("@/app/(admin)/apex-charts/radar"));
const RadialbarChart = lazy(() => import("@/app/(admin)/apex-charts/radialbar"));
const RangeChart = lazy(() => import("@/app/(admin)/apex-charts/rangearea"));
const ScatterChart = lazy(() => import("@/app/(admin)/apex-charts/scatter"));
const TimeLineChart = lazy(() => import("@/app/(admin)/apex-charts/timeline"));
const TreeMapChart = lazy(() => import("@/app/(admin)/apex-charts/treemap"));
const Calendar = lazy(() => import("@/app/(admin)/apps/calendar"));
const Contacts = lazy(() => import("@/app/(admin)/apps/contacts"));
const Widgets = lazy(() => import("@/app/(admin)/apps/widgets"));
const TodoList = lazy(() => import("@/app/(admin)/apps/todolist"));
const Accordions = lazy(() => import("@/app/(admin)/components/accordions"));
const Alerts = lazy(() => import("@/app/(admin)/components/alerts"));
const Badges = lazy(() => import("@/app/(admin)/components/badges"));
const Breadcrumb = lazy(() => import("@/app/(admin)/components/breadcrumb"));
const Buttons = lazy(() => import("@/app/(admin)/components/buttons"));
const Cards = lazy(() => import("@/app/(admin)/components/cards"));
const Collapse = lazy(() => import("@/app/(admin)/components/collapse"));
const Dropdown = lazy(() => import("@/app/(admin)/components/dropdown"));
const Grid = lazy(() => import("@/app/(admin)/components/grid"));
const Images = lazy(() => import("@/app/(admin)/components/images"));
const List = lazy(() => import("@/app/(admin)/components/list"));
const Modals = lazy(() => import("@/app/(admin)/components/modals"));
const Pagination = lazy(() => import("@/app/(admin)/components/pagination"));
const Placeholders = lazy(() => import("@/app/(admin)/components/placeholders"));
const Popovers = lazy(() => import("@/app/(admin)/components/popovers"));
const Progress = lazy(() => import("@/app/(admin)/components/progress"));
const Scrollspy = lazy(() => import("@/app/(admin)/components/scrollspy"));
const Spinners = lazy(() => import("@/app/(admin)/components/spinners"));
const Tabs = lazy(() => import("@/app/(admin)/components/tabs"));
const Tooltips = lazy(() => import("@/app/(admin)/components/tooltips"));
const Typography = lazy(() => import("@/app/(admin)/components/typography"));
const Video = lazy(() => import("@/app/(admin)/components/video"));
const Carousel = lazy(() => import("@/app/(admin)/extended-ui/carousel"));
const Notifications = lazy(() => import("@/app/(admin)/extended-ui/notifications"));
const Offcanvas = lazy(() => import("@/app/(admin)/extended-ui/offcanvas"));
const RangeSlider = lazy(() => import("@/app/(admin)/extended-ui/range-slider"));
const FormElement = lazy(() => import("@/app/(admin)/forms/elements"));
const FormPickers = lazy(() => import("@/app/(admin)/forms/pickers"));
const FormQuilljs = lazy(() => import("@/app/(admin)/forms/quilljs"));
const FormValidation = lazy(() => import("@/app/(admin)/forms/validation"));
const FeatherIcon = lazy(() => import("@/app/(admin)/icons/feather"));
const MdiIcon = lazy(() => import("@/app/(admin)/icons/mdi-Icon"));
const GoogleMap = lazy(() => import("@/app/(admin)/maps/google"));
const VectorMap = lazy(() => import("@/app/(admin)/maps/vector"));
const BasicTable = lazy(() => import("@/app/(admin)/tables/basic"));
const DataTable = lazy(() => import("@/app/(admin)/tables/datatables"));
const Faqs = lazy(() => import("@/app/(admin)/utility/faqs"));
const Gallery = lazy(() => import("@/app/(admin)/utility/gallery"));
const Invoice = lazy(() => import("@/app/(admin)/utility/invoice"));
const PagesStarter = lazy(() => import("@/app/(admin)/utility/pages-starter"));
const Pricing = lazy(() => import("@/app/(admin)/utility/pricing"));
const Profile = lazy(() => import("@/app/(admin)/utility/profile"));
const Timeline = lazy(() => import("@/app/(admin)/utility/timeline"));
const ConfirmMail = lazy(() => import("@/app/(pages)/auth/confirm-mail"));
const EmailVerification = lazy(() => import("@/app/(pages)/auth/email-verification"));
const LockScreen = lazy(() => import("@/app/(pages)/auth/lock-screen"));
const Login = lazy(() => import("@/app/(pages)/auth/login"));
const LogOut = lazy(() => import("@/app/(pages)/auth/logout"));
const RecoverPassword = lazy(() => import("@/app/(pages)/auth/recover-password"));
const Register = lazy(() => import("@/app/(pages)/auth/register"));
const CommingSoon = lazy(() => import("@/app/(pages)/coming-soon"));
const Error404 = lazy(() => import("@/app/(pages)/error/404"));
const Error429 = lazy(() => import("@/app/(pages)/error/429"));
const Error500 = lazy(() => import("@/app/(pages)/error/500"));
const Error503 = lazy(() => import("@/app/(pages)/error/503"));
const OffinePage = lazy(() => import("@/app/(pages)/error/offline-page"));
const Maintenance = lazy(() => import("@/app/(pages)/maintenance"));
export const initialRoutes = [{
  path: '/dashboard/index',
  name: 'Dashboard',
  element: <DashboardInedx />
}, {
  path: '/dashboard/analytics',
  name: 'analytics',
  element: <DashboardAnalytics />
}, {
  path: '/dashboard/ecommerce',
  name: 'ecommerce',
  element: <DashboardEcommerce />
}, {
  path: '/apex-charts/area',
  name: 'areachart',
  element: <AreaChart />
}, {
  path: '/apex-charts/bar',
  name: 'barchart',
  element: <BarChart />
}, {
  path: '/apex-charts/boxplot',
  name: 'boxplot',
  element: <BoxPlotChart />
}, {
  path: '/apex-charts/bubble',
  name: 'bubble',
  element: <BubbleChart />
}, {
  path: '/apex-charts/candlestick',
  name: 'candlestick',
  element: <CandlestickChart />
}, {
  path: '/apex-charts/column',
  name: 'column',
  element: <ColumnChart />
}, {
  path: '/apex-charts/funnel',
  name: 'funnel',
  element: <FunnelChart />
}, {
  path: '/apex-charts/heatmap',
  name: 'heatmap',
  element: <HeatmapChart />
}, {
  path: '/apex-charts/line',
  name: 'line',
  element: <LineChart />
}, {
  path: '/apex-charts/mixed',
  name: 'mixed',
  element: <MixedChart />
}, {
  path: '/apex-charts/pie',
  name: 'pie',
  element: <PieChart />
}, {
  path: '/apex-charts/polararea',
  name: 'polararea',
  element: <PolarChart />
}, {
  path: '/apex-charts/radar',
  name: 'radar',
  element: <RadarChart />
}, {
  path: '/apex-charts/radialbar',
  name: 'radialbar',
  element: <RadialbarChart />
}, {
  path: '/apex-charts/rangearea',
  name: 'rangearea',
  element: <RangeChart />
}, {
  path: '/apex-charts/scatter',
  name: 'scatter',
  element: <ScatterChart />
}, {
  path: '/apex-charts/timeline',
  name: 'timeline',
  element: <TimeLineChart />
}, {
  path: '/apex-charts/treemap',
  name: 'treemap',
  element: <TreeMapChart />
}, {
  path: '/apps/calendar',
  name: 'calendar',
  element: <Calendar />
}, {
  path: '/apps/contacts',
  name: 'contacts',
  element: <Contacts />
}, {
  path: '/apps/widgets',
  name: 'widgets',
  element: <Widgets />
}, {
  path: '/apps/todolist',
  name: 'todolist',
  element: <TodoList />
}, {
  path: '/components/accordions',
  name: 'accordions',
  element: <Accordions />
}, {
  path: '/components/alerts',
  name: 'alerts',
  element: <Alerts />
}, {
  path: '/components/badges',
  name: 'badges',
  element: <Badges />
}, {
  path: '/components/breadcrumb',
  name: 'breadcrumb',
  element: <Breadcrumb />
}, {
  path: '/components/buttons',
  name: 'buttons',
  element: <Buttons />
}, {
  path: '/components/cards',
  name: 'cards',
  element: <Cards />
}, {
  path: '/components/collapse',
  name: 'collapse',
  element: <Collapse />
}, {
  path: '/components/dropdown',
  name: 'dropdown',
  element: <Dropdown />
}, {
  path: '/components/grid',
  name: 'grid',
  element: <Grid />
}, {
  path: '/components/images',
  name: 'images',
  element: <Images />
}, {
  path: '/components/list',
  name: 'images',
  element: <List />
}, {
  path: '/components/modals',
  name: 'modal',
  element: <Modals />
}, {
  path: '/components/pagination',
  name: 'pagination',
  element: <Pagination />
}, {
  path: '/components/placeholders',
  name: 'placeholders',
  element: <Placeholders />
}, {
  path: '/components/popovers',
  name: 'popovers',
  element: <Popovers />
}, {
  path: '/components/progress',
  name: 'Progress',
  element: <Progress />
}, {
  path: '/components/scrollspy',
  name: 'scrollspy',
  element: <Scrollspy />
}, {
  path: '/components/spinners',
  name: 'spinners',
  element: <Spinners />
}, {
  path: '/components/tabs',
  name: 'tab',
  element: <Tabs />
}, {
  path: '/components/tooltips',
  name: 'tooltips',
  element: <Tooltips />
}, {
  path: '/components/typography',
  name: 'typography',
  element: <Typography />
}, {
  path: '/components/video',
  name: 'video',
  element: <Video />
}, {
  path: '/extended-ui/carousel',
  name: 'carousel',
  element: <Carousel />
}, {
  path: '/extended-ui/notifications',
  name: 'notifications',
  element: <Notifications />
}, {
  path: '/extended-ui/offcanvas',
  name: 'offcanvas',
  element: <Offcanvas />
}, {
  path: '/extended-ui/range-slider',
  name: 'rangeSlider',
  element: <RangeSlider />
}, {
  path: '/forms/elements',
  name: 'elements',
  element: <FormElement />
}, {
  path: '/forms/pickers',
  name: 'pickers',
  element: <FormPickers />
}, {
  path: '/forms/quilljs',
  name: 'quilljs',
  element: <FormQuilljs />
}, {
  path: '/forms/validation',
  name: 'validation',
  element: <FormValidation />
}, {
  path: '/icons/feather',
  name: 'feather',
  element: <FeatherIcon />
}, {
  path: '/icons/mdi-icon',
  name: 'mdi-icon',
  element: <MdiIcon />
}, {
  path: '/maps/google',
  name: 'google',
  element: <GoogleMap />
}, {
  path: '/maps/vector',
  name: 'vector',
  element: <VectorMap />
}, {
  path: '/tables/basic',
  name: 'basic',
  element: <BasicTable />
}, {
  path: '/tables/datatables',
  name: 'datatables',
  element: <DataTable />
}, {
  path: '/utility/faqs',
  name: 'faqs',
  element: <Faqs />
}, {
  path: '/utility/gallery',
  name: 'gallery',
  element: <Gallery />
}, {
  path: '/utility/invoice',
  name: 'invoice',
  element: <Invoice />
}, {
  path: '/utility/pages-starter',
  name: 'pages-starter',
  element: <PagesStarter />
}, {
  path: '/utility/pricing',
  name: 'pricing',
  element: <Pricing />
}, {
  path: '/utility/profile',
  name: 'profile',
  element: <Profile />
}, {
  path: '/utility/timeline',
  name: 'timeline',
  element: <Timeline />
}];
export const pages = [{
  path: '/auth/confirm-mail',
  name: 'confirm-mail',
  element: <ConfirmMail />
}, {
  path: '/auth/email-verification',
  name: 'email-verification',
  element: <EmailVerification />
}, {
  path: '/auth/lock-screen',
  name: 'lock-screen',
  element: <LockScreen />
}, {
  path: '/auth/login',
  name: 'login',
  element: <Login />
}, {
  path: '/auth/logout',
  name: 'logout',
  element: <LogOut />
}, {
  path: '/auth/recover-password',
  name: 'recover-password',
  element: <RecoverPassword />
}, {
  path: '/auth/register',
  name: 'register',
  element: <Register />
}, {
  path: '/coming-soon',
  name: 'commingSoon',
  element: <CommingSoon />
}, {
  path: '/error/404',
  name: '404',
  element: <Error404 />
}, {
  path: '/error/429',
  name: '429',
  element: <Error429 />
}, {
  path: '/error/500',
  name: '500',
  element: <Error500 />
}, {
  path: '/error/503',
  name: '503',
  element: <Error503 />
}, {
  path: '/error/offline-page',
  name: 'offline-page',
  element: <OffinePage />
}, {
  path: '/maintenance',
  name: 'maintenance',
  element: <Maintenance />
}];