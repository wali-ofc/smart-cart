import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import RangeSlider from './component/RangeSlider';
const Index = () => {
  return <>
            <PageMeta title='Range Slider' />
            <PageBreadcrumb title='Range Slider' SubTitlte='Range Slider' PageTitle='Extended UI' />
            <RangeSlider />
        </>;
};
export default Index;