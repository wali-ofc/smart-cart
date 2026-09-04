import PageBreadcrumb from '@/component/PageBreadcrumb';
import VectorMapWrapper from './components/VectorMapWrapper';
import PageMeta from '@/component/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title='Badges' />
      <PageBreadcrumb title='Vector' SubTitlte='Vector' PageTitle='Maps' />
      <VectorMapWrapper />
    </>
  )
}

export default Index