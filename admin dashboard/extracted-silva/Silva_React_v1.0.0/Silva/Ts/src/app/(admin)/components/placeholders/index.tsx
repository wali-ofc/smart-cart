import PageBreadcrumb from '@/component/PageBreadcrumb'
import PageMeta from '@/component/PageMeta'
import Placeholders from './component/Placeholders'

const Index = () => {
    return (
        <>
            <PageMeta title='Placeholders' />
            <PageBreadcrumb title='Placeholders' SubTitlte='Placeholders' PageTitle='Components' />
            <Placeholders />

        </>
    )
}

export default Index