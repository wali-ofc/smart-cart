import PageBreadcrumb from '@/component/PageBreadcrumb';
import LineCharts from './component/LineChart';
import PageMeta from '@/component/PageMeta';

const Index = () => {
    return (
        <>
            <PageMeta title='Line Charts' />
            <PageBreadcrumb title='Line Charts' PageTitle='Charts' SubTitlte='Line Charts' />
            <LineCharts />
        </>
    )
}

export default Index