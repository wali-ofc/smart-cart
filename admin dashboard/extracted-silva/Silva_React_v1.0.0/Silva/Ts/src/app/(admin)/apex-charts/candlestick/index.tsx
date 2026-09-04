import PageBreadcrumb from '@/component/PageBreadcrumb';
import CandlestickChart from './component/CandlestickChart';
import PageMeta from '@/component/PageMeta';

const Index = () => {
    return (
        <>
            <PageMeta title='Candle Stick Charts' />
            <PageBreadcrumb title='Candle Stick Charts' PageTitle='Charts' SubTitlte='Candle Stick Charts' />
            <CandlestickChart />
        </>
    )
}

export default Index