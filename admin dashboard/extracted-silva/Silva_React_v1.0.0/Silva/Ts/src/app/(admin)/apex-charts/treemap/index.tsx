import PageBreadcrumb from '@/component/PageBreadcrumb';
import TreemapChart from './component/TreemapChart';
import PageMeta from '@/component/PageMeta';

const Index = () => {
    return (
        <>
            <PageMeta title='Treemaps Charts' />
            <PageBreadcrumb title='Treemaps Charts' PageTitle='Charts' SubTitlte='Treemaps Charts' />
            <TreemapChart />

        </>
    )
}

export default Index