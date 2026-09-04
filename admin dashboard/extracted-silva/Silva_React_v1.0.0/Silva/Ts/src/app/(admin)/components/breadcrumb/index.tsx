import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Breadcrumb from './component/Breadcrumb';

const Index = () => {
    return (
        <>
            <PageMeta title="Breadcrumb" />
            <PageBreadcrumb title='Breadcrumb' PageTitle='Components' SubTitlte='Breadcrumb' />
            <Breadcrumb />
        </>
    )
}

export default Index