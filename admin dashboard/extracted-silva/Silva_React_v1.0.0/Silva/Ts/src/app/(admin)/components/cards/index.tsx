import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Cards from './component/Cards';

const Index = () => {
    return (
        <>
            <PageMeta title="Cards" />
            <PageBreadcrumb title='Cards' PageTitle='Components' SubTitlte='Cards' />
            <Cards />
        </>

    )
}

export default Index