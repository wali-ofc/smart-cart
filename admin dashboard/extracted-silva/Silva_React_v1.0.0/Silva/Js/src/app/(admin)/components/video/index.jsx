import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Videos from './component/Videos';
const Index = () => {
  return <>
            <PageMeta title='Video' />
            <PageBreadcrumb title='Video' PageTitle='Components' SubTitlte='Video' />
            <Videos />
        </>;
};
export default Index;