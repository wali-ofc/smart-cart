import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import ColumnChart from './component/ColumnChart';
const Index = () => {
  return <>
            <PageMeta title='Column Chartjs' />
            <PageBreadcrumb title='Column Chart' SubTitlte='Column Chart' PageTitle='Charts' />
            <ColumnChart />
        </>;
};
export default Index;