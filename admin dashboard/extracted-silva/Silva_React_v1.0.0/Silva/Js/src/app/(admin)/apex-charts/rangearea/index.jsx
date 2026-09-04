import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import RangArea from './component/RangArea';
const Index = () => {
  return <>
            <PageMeta title='Range Area Charts' />
            <PageBreadcrumb title='Range Charts' PageTitle='Charts' SubTitlte='Range Charts' />
            <RangArea />
        </>;
};
export default Index;