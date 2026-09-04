import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import AllGoogleMap from './components/AllGoogleMap';

const Index = () => {
  return (
    <>
      <PageMeta title='Badges' />
      <PageBreadcrumb title='Google' SubTitlte='Google' PageTitle='Maps' />
      <AllGoogleMap />
    </>
  )
}

export default Index