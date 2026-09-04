import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import QuillJs from './component/QuillJs';

const Index = () => {
    return (
        <>
            <PageMeta title='QuillJS Editor' />
            <PageBreadcrumb title='Quill JS Editor' SubTitlte='Quill JS Editor' PageTitle='Forms' />
            <QuillJs />
        </>
    )
}

export default Index