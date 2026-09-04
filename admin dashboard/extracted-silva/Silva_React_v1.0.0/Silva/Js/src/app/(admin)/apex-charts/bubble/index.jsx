import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import BubbleChart from './component/BubbleChart';
const Index = () => {
  return <>
    <PageMeta title='Bubble Charts' />
    <PageBreadcrumb title='Bubble Charts' PageTitle='Charts' SubTitlte='Bubble Charts' />
    <BubbleChart />
  </>;
};
export default Index;