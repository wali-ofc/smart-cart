import PageBreadcrumb from '@/component/PageBreadcrumb';
import Timeline from './components/Timeline';
import PageMeta from '@/component/PageMeta';

const Index = () => {
    return (
        <>
            <PageMeta title='Timeline' />
            <PageBreadcrumb title='Timeline' PageTitle='Pages' SubTitlte='Timeline' />
            <Timeline />
        </>
    )
}

export default Index