import PageBreadcrumb from '@/component/PageBreadcrumb'
import PageMeta from '@/component/PageMeta'
import Modals from './component/Modals'


const Page = () => {
    return (
        <>
            <PageMeta title="Modals" />
            <PageBreadcrumb title='Modals' SubTitlte='Modals' PageTitle='Components' />
            <Modals />
        </>
    )
}

export default Page