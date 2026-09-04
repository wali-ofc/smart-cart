import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import Tooltips from './component/Tooltips';

const Index = () => {
    return (
        <>
            <PageMeta title='Tooltips' />
            <PageBreadcrumb title='Tooltips' SubTitlte='Tooltips' PageTitle='Components' />
            <Tooltips />
        </>
    )
}

export default Index