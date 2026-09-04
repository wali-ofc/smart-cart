import PageBreadcrumb from '@/component/PageBreadcrumb';
import AreaChart from './component/AreaChart';
import PageMeta from '@/component/PageMeta';
const Index = () => {
  return <>
            <PageMeta title="Area Charts" />
            <PageBreadcrumb title='Area Charts' PageTitle='Charts' SubTitlte='Area Charts' />
            <AreaChart />
        </>;
};
export default Index;