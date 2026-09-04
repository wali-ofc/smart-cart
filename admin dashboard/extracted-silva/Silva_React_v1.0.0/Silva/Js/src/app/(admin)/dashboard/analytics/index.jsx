import PageBreadcrumb from '@/component/PageBreadcrumb';
import { Col, Row } from 'react-bootstrap';
import WebsiteTraffic from './components/WebsiteTraffic';
import ConversionRate from './components/ConversionRate';
import SessionDuration from './components/SessionDuration';
import ActiveUsers from './components/ActiveUsers';
import AverageDailySales from './components/AverageDailySales';
import EarningReports from './components/EarningReports';
import TrafficSource from './components/TrafficSource';
import SalesByCountries from './components/SalesByCountries';
import VisitByDevice from './components/VisitByDevice';
import CampaignSource from './components/CampaignSource';
import TopSession from './components/TopSession';
import TopLeads from './components/TopLeads';
import TopPerforming from './components/TopPerforming';
import PageMeta from '@/component/PageMeta';
const Index = () => {
  return <>
      <PageMeta title='Dashboard' />
      <PageBreadcrumb title="Dashboard" />
      <Row>
        <Col md={12} xl={4}>
          <Row className='g-3'>
            <WebsiteTraffic />
            <ConversionRate />
            <SessionDuration />
            <ActiveUsers />
            <AverageDailySales />
          </Row>
        </Col>
        <EarningReports />
      </Row>

      <Row>
        <TrafficSource />
        <SalesByCountries />
        <VisitByDevice />
      </Row>

      <Row>
        <CampaignSource />
        <TopSession />
      </Row>

      <Row>
        <TopLeads />
        <TopPerforming />
      </Row>
    </>;
};
export default Index;