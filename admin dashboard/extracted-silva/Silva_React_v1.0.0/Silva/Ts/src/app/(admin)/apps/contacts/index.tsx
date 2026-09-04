import PageBreadcrumb from '@/component/PageBreadcrumb';
import Contact from './component/Contact';
import PageMeta from '@/component/PageMeta';

const Index = () => {
    return (
        <>
            <PageMeta title="Contacts" />
            <PageBreadcrumb title='Contacts' PageTitle='Apps' SubTitlte='Contacts' />
            <Contact />
        </>
    )
}

export default Index