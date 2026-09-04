import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Notifications from './component/Notifications';
const Index = () => {
  return <>
            <PageMeta title='Notifications' />
            <PageBreadcrumb title='Notifications' SubTitlte='Notifications' PageTitle='Extended UI' />
            <Notifications />
        </>;
};
export default Index;