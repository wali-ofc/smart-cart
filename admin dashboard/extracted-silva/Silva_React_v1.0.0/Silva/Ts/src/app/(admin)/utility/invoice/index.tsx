import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Invoice from './components/Invoice';

const Index = () => {
    return (
        <>
            <PageMeta title='Invoice' />
            <PageBreadcrumb title='Invoice' PageTitle='pages' SubTitlte='Invoice' />
            <Invoice />
        </>
    )
}

export default Index