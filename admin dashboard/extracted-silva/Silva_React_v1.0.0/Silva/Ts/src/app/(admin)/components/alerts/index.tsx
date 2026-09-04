import PageBreadcrumb from '@/component/PageBreadcrumb';
import Alerts from './component/Alerts';
import PageMeta from '@/component/PageMeta';

const Index = () => {
    return (
        <>
            <PageMeta title="Alerts" />
            <PageBreadcrumb title='Alerts' PageTitle='Components' SubTitlte='Alerts' />
            <Alerts />
        </>
    )
}

export default Index