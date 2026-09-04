import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Grid from './component/Grid';
const Index = () => {
  return <>
      <PageMeta title="Grid" />
      <PageBreadcrumb title='Grid' SubTitlte='Grid' PageTitle='Components' />
      <Grid />
    </>;
};
export default Index;