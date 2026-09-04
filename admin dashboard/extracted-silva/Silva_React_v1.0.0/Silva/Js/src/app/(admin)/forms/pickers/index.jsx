import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import DatePickers from './component/DatePickers';
const Index = () => {
  return <>
            <PageMeta title='Form Pickers' />
            <PageBreadcrumb title='Form Pickers' SubTitlte='Form Pickers' PageTitle='Forms' />
            <DatePickers />
        </>;
};
export default Index;