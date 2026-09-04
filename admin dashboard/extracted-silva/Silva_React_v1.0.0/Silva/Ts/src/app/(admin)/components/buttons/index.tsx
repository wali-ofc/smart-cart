import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Buttons from './component/Buttons';

const Index = () => {
    return (
        <>
            <PageMeta  title="Buttons"/>
            <PageBreadcrumb title='Buttons' PageTitle='Components' SubTitlte='Buttons' />
            <Buttons />
        </>
    )
}

export default Index