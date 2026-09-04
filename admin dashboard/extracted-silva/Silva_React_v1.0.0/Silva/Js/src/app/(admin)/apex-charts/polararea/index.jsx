import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Polararea from './component/PolarArea';
const Index = () => {
  return <>
            <PageMeta title='Polar Area Charts' />
            <PageBreadcrumb title='Polar Area Charts' PageTitle='Charts' SubTitlte='Polar Area Charts' />
            <Polararea />
        </>;
};
export default Index;