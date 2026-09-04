import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import PricingPlans from './components/PricingPlans';
const Index = () => {
  return <>
            <PageMeta title='Pricing' />
            <PageBreadcrumb title='Pricing' PageTitle='Pages' SubTitlte='Pricing' />
            <PricingPlans />
        </>;
};
export default Index;