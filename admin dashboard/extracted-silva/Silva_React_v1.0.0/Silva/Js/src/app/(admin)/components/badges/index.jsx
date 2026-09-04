import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Badges from './component/Badges';
const Index = () => {
  return <>
            <PageMeta title="Badges" />
            <PageBreadcrumb title='Badges' SubTitlte='Badges' PageTitle='Components' />
            <Badges />
        </>;
};
export default Index;