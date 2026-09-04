import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Spinners from './component/Spinners';

const Index = () => {
    return (
        <>
            <PageMeta title='Spinners' />
            <PageBreadcrumb title='Spinners' SubTitlte='Spinners' PageTitle='Components' />
            <Spinners />
        </>
    )
}

export default Index