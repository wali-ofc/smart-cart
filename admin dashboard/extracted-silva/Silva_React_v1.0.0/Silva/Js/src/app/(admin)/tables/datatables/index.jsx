import PageBreadcrumb from '@/component/PageBreadcrumb';
import DataTablesWrapper from './component/DataTablesWrapper';
import PageMeta from '@/component/PageMeta';
const Index = () => {
  return <>
            <PageMeta title='Data Tables' />
            <PageBreadcrumb title='Data Tables' SubTitlte='Data Tables' PageTitle='Tables' />
            <DataTablesWrapper />
        </>;
};
export default Index;