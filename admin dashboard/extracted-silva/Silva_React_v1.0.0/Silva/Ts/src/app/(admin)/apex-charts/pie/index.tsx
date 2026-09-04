import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import PieCharts from './component/PieCharts';

const Index = () => {
    return (
        <>
            <PageMeta title='Pie Chart' />
            <PageBreadcrumb title='Pie Chart' PageTitle='Charts' SubTitlte='Pie Chart' />
            <PieCharts />
        </>
    )
}

export default Index