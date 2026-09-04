import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Faqs from './components/Faqs';

const Index = () => {
    return (
        <>
            <PageMeta title='Faq' />
            <PageBreadcrumb title='FAQ' PageTitle='pages' SubTitlte='FAQ' />
            <Faqs />
        </>
    )
}

export default Index