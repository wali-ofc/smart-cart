import PageBreadcrumb from '@/component/PageBreadcrumb';
import { Row } from 'react-bootstrap';
import LeadsReport from './components/LeadsReport';
import Perfomance from './components/Perfomance';
import ProductActivity from './components/ProductActivity';
import SalesCard from './components/SalesCard';
import SalesOverviewChart from './components/SalesOverviewChart';
import Statistics from './components/Statistics';
import Transactions from './components/Transactions';
const Dashboard = () => {
  return <>
      <PageBreadcrumb title="Dashboard" />
      <Row>
        <SalesOverviewChart />
        <SalesCard />
      </Row>
      <Row>
        <Transactions />
        <Statistics />
        <Perfomance />
      </Row>
      <Row>
        <ProductActivity />
        <LeadsReport />
      </Row>
    </>;
};
export default Dashboard;