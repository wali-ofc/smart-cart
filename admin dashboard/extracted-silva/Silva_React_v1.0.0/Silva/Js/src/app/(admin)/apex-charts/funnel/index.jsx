import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import FunnelChart from './component/FunnelChart';
const Index = () => {
  return <>
            <PageMeta title='Funnel Charts' />
            <PageBreadcrumb title='Funnel Charts' PageTitle='Charts' SubTitlte='Funnel Charts' />
            <FunnelChart />

        </>;
};
export default Index;