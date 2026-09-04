import Accordions from './component/Accordions'
import PageBreadcrumb from '@/component/PageBreadcrumb'
import PageMeta from '@/component/PageMeta';

const Index = () => {
    return (
        <>
            <PageMeta title='Accordion' />
            <PageBreadcrumb title='Accordions' PageTitle='Components' SubTitlte='Accordions' />
            <Accordions />
        </>
    )
}

export default Index