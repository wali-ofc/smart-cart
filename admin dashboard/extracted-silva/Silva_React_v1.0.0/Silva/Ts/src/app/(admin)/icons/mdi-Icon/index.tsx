import PageBreadcrumb from '@/component/PageBreadcrumb';
import MdiIcons from './component/MdiIcons';
import PageMeta from '@/component/PageMeta';

const Index = () => {
    return (
        <>
            <PageMeta title='Material Design Icons' />
            <PageBreadcrumb title='Material Design Icons' SubTitlte='Material Design Icons' PageTitle='Icons' />
            <MdiIcons />

        </>
    )
}

export default Index