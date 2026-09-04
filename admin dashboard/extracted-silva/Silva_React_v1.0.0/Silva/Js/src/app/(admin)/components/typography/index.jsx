import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Typography from './component/Typography';
const Index = () => {
  return <>
            <PageMeta title="Typography" />
            <PageBreadcrumb title='Typography' SubTitlte='Typography' PageTitle='Components' />
            <Typography />
        </>;
};
export default Index;