import PageBreadcrumb from '@/component/PageBreadcrumb';
import { Row } from 'react-bootstrap';
import AverageRevenue from './components/AverageRevenue';
import Boarding from './components/Boarding';
import EarningsReports from './components/EarningsReports';
import LatestTransaction from './components/LatestTransaction';
import MoneyFlow from './components/MoneyFlow';
import Rating from './components/Rating';
import SalesByRegion from './components/SalesByRegion';
import Tasks from './components/Tasks';
import TrafficSummary from './components/TrafficSummary';
import UpcomingEvents from './components/UpcomingEvents';
import WebAnalytics from './components/WebAnalytics';
import WebsiteVisitors from './components/WebsiteVisitors';
import WidgetsCard from './components/WidgetsCard';
const Index = () => {
  return <>
            <PageBreadcrumb title='Widgets' SubTitlte='Widgets' PageTitle='General' />
            <Row>
                <WidgetsCard />
            </Row>
            <Row>
                <Boarding />
                <MoneyFlow />
            </Row>
            <Row>
                <LatestTransaction />
                <Rating />
            </Row>
            <Row>
                <AverageRevenue />
                <EarningsReports />
            </Row>
            <Row>
                <SalesByRegion />
                <UpcomingEvents />
                <WebsiteVisitors />
            </Row>
            <Row>
                <WebAnalytics />
                <TrafficSummary />
            </Row>
            <Row>
                <Tasks />
            </Row>
        </>;
};
export default Index;