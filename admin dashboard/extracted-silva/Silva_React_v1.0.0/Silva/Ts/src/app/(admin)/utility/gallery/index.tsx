import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Gallery from './components/Gallery';

const Index = () => {
    return (
        <>
            <PageMeta title='Gallery' />
            <PageBreadcrumb title='Gallery' PageTitle='Pages' SubTitlte='Gallery' />
            <Gallery />
        </>
    )
}

export default Index