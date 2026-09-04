import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Collapses from './component/Collapses';

const Index = () => {
    return (
        <>
            <PageMeta title='Collapse' />
            <PageBreadcrumb title='Collapse' SubTitlte='Collapse' PageTitle='Components' />
            <Collapses />
        </>
    )
}

export default Index