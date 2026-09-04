import PageMeta from '@/component/PageMeta';
import Error503 from './component/Error503';
const Index = () => {
  return <>
            <PageMeta title='Error 503' />
            <Error503 />
        </>;
};
export default Index;