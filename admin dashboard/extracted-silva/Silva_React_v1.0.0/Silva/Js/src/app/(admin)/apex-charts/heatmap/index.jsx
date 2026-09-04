import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Heatmap from './component/Heatmap';
const Index = () => {
  return <>
            <PageMeta title='Heatmap Charts' />
            <PageBreadcrumb title='Heatmap Charts' PageTitle='Heatmap Charts' SubTitlte='Charts' />
            <Heatmap />

        </>;
};
export default Index;