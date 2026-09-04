import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Hero from './components/Hero';
import TabContainers from './components/TabContainer';
const Index = () => {
  return <>
            <PageMeta title='Profile' />
            <PageBreadcrumb title='Profile' PageTitle='Components' SubTitlte='Profile' />
            <Hero />
            <TabContainers />
        </>;
};
export default Index;