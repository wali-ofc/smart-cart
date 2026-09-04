import PageBreadcrumb from '@/component/PageBreadcrumb'
import PageMeta from '@/component/PageMeta'
import Popovers from './component/Popovers'


const Index = () => {
    return (
        <>
            <PageMeta title="Popovers"/>
            <PageBreadcrumb title='Popovers' SubTitlte='Popovers' PageTitle='Components' />
            <Popovers />
        </>
    )
}

export default Index