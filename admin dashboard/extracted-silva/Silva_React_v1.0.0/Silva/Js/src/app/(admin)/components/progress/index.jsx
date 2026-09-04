import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Progress from './component/Progress';
const Index = () => {
  return <>
            <PageMeta title="Progress" />
            <PageBreadcrumb title='Progress' SubTitlte='progress' PageTitle='Components' />
            <Progress />
        </>;
};
export default Index;