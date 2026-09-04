import PageBreadcrumb from '@/component/PageBreadcrumb';
import Calendar from './component/Calendar';
import PageMeta from '@/component/PageMeta';
const Index = () => {
  return <>
    <PageMeta title="Calendar" />
    <PageBreadcrumb title='Calendar' PageTitle='Maps' SubTitlte='Calendar' />
    <Calendar />
  </>;
};
export default Index;