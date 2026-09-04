import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import MixedCharts from './component/MixedCharts';
const Index = () => {
  return <>
            <PageMeta title='Mixed Charts' />
            <PageBreadcrumb title='Mixed Charts' PageTitle='Charts' SubTitlte='Mixed Charts' />
            <MixedCharts />
        </>;
};
export default Index;