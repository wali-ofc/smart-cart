import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import List from './component/List';
const Page = () => {
  return <>
            <PageMeta title="List Group" />
            <PageBreadcrumb title='List Group' SubTitlte='List Group' PageTitle='Components' />
            <List />
        </>;
};
export default Page;