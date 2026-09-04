import PageBreadcrumb from '@/component/PageBreadcrumb';
import PageMeta from '@/component/PageMeta';
import RadarCharts from './component/RadarCharts';


const Index = () => {
    return (
        <>
            <PageMeta title='Radar Charts' />
            <PageBreadcrumb title='Radar Charts' PageTitle='Charts' SubTitlte='Radar Charts' />
            <RadarCharts />

        </>
    )
}

export default Index