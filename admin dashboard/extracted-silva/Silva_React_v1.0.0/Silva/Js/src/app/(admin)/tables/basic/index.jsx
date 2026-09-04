import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import BasicTabels from './component/BasicTabels';
const Index = () => {
  return <>
            <PageMeta title='Basic Tables' />
            <PageBreadcrumb title='Basic Tables' SubTitlte='Basic Tables' PageTitle='Tables' />
            <BasicTabels />
        </>;
};
export default Index;