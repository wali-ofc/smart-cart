import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Radialbar from './component/Radialbar';

const Index = () => {
    return (
        <>
            <PageMeta title='s' />
            <PageBreadcrumb title='Radialbar Charts' PageTitle='Charts' SubTitlte='Radialbar Charts' />
            <Radialbar />
        </>
    )
}

export default Index