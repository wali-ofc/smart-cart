import PageBreadcrumb from '@/component/PageBreadcrumb';
import Tabs from './component/Tabs';
import PageMeta from '@/component/PageMeta';

const Index = () => {
    return (
        <>
            <PageMeta title='Tabs' />
            <PageBreadcrumb title='Tabs' SubTitlte='Tabs' PageTitle='Components' />
            <Tabs />
        </>
    )
}

export default Index