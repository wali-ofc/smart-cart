import PageBreadcrumb from '@/component/PageBreadcrumb'
import GeneralElements from './component/GeneralElements'
import PageMeta from '@/component/PageMeta';


const Index = () => {
    return (
        <>
            <PageMeta title='General Elements' />
            <PageBreadcrumb title='General Elements' SubTitlte='General Elements' PageTitle='Forms' />
            <GeneralElements />
        </>
    )
}

export default Index