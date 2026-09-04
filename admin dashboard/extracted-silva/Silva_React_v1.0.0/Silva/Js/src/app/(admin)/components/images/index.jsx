import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Images from './component/Images';
const Index = () => {
  return <>
            <PageMeta title='Images' />
            <PageBreadcrumb title='Images' SubTitlte='Images' PageTitle='Components' />
            <Images />
        </>;
};
export default Index;