import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import TimeLine from './component/TimeLine';

const Index = () => {
    return (
        <>
            <PageMeta title='Timeline Charts' />
            <PageBreadcrumb title='Timeline Charts' PageTitle='Charts' SubTitlte='Timeline Charts' />
            <TimeLine />
        </>
    )
}

export default Index