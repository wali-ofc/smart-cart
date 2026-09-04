import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Scrollspy from './component/Scrollspy';
const Index = () => {
  return <>
            <PageMeta title='Scrollspy' />
            <PageBreadcrumb title='Scrollspy' SubTitlte='Scrollspy' PageTitle='Components' />
            <Scrollspy />
        </>;
};
export default Index;