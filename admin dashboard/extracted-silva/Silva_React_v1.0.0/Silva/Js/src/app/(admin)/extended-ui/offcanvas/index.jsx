import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import OffcanvasPage from './component/OffcanvasPage';
const Index = () => {
  return <>
            <PageMeta title='Offcanvas' />
            <PageBreadcrumb title='Offcanvas' SubTitlte='Offcanvas' PageTitle='Extended UI' />
            <OffcanvasPage />
        </>;
};
export default Index;