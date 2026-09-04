import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Scatter from './component/Scatter';
const Index = () => {
  return <>
            <PageMeta title='Bubble Charts' />
            <PageBreadcrumb title='Bubble Charts' PageTitle='Charts' SubTitlte='Bubble Charts' />
            <Scatter />
        </>;
};
export default Index;