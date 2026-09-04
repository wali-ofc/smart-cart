import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Dropdowns from './component/Dropdowns';
const Index = () => {
  return <>
            <PageMeta title='Dropdowns' />
            <PageBreadcrumb title='Dropdowns' SubTitlte='Dropdowns' PageTitle='Components' />
            <Dropdowns />
        </>;
};
export default Index;