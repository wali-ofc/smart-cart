import PageBreadcrumb from '@/component/PageBreadcrumb';
import BoxplotCharts from './component/BoxplotCharts';
import PageMeta from '@/component/PageMeta';
const Index = () => {
  return <>
    <PageMeta title='Boxplot Charts' />
    <PageBreadcrumb title='Boxplot Charts' PageTitle='Charts' SubTitlte='Boxplot Charts' />
    <BoxplotCharts />
  </>;
};
export default Index;