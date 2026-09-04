import PageBreadcrumb from '@/component/PageBreadcrumb'
import Pagination from './component/Pagination'
import PageMeta from '@/component/PageMeta'



const Index = () => {
    return (
        <>
            <PageMeta title="Pagination" />
            <PageBreadcrumb title='Pagination' SubTitlte='Pagination' PageTitle='Components' />
            <Pagination />
        </>
    )
}

export default Index