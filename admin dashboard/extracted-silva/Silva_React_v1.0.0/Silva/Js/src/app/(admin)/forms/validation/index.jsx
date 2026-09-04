import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Validations from './component/Validations';
const Index = () => {
  return <>
            <PageMeta title='Validation' />
            <PageBreadcrumb title='Form Validation' SubTitlte='Form Validation' PageTitle='Forms' />
            <Validations />
        </>;
};
export default Index;