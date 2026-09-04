import PageBreadcrumb from '@/component/PageBreadcrumb';
import BarChart from './component/BarChart';
import PageMeta from '@/component/PageMeta';
const Index = () => {
  return <>
            <PageMeta title='Bar Chart' />
            <PageBreadcrumb title='Bar Charts' SubTitlte='Bar Chart' PageTitle='Charts' />
            <BarChart />
        </>;
};
export default Index;