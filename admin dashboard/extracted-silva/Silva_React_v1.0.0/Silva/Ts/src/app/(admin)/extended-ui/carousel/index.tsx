import PageBreadcrumb from '@/component/PageBreadcrumb'
import Carousels from './component/Carousels'
import PageMeta from '@/component/PageMeta';

const Index = () => {
    return (
        <>
            <PageMeta title='Carousel' />
            <PageBreadcrumb title='Carousel' SubTitlte='Carousel' PageTitle='Extended UI' />
            <Carousels />
        </>
    )
}

export default Index