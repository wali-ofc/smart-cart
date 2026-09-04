import PageBreadcrumb from '@/component/PageBreadcrumb'
import PageMeta from '@/component/PageMeta'
import { Row } from 'react-bootstrap'
import CustomerRate from './components/CustomerRate'
import OrderReport from './components/OrderReport'
import ProductsStock from './components/ProductsStock'
import RecentOrder from './components/RecentOrder'
import SalesReport from './components/SalesReport'
import SellingProducts from './components/SellingProducts'
import WidgetCards from './components/WidgetCards'


const Index = () => {
    return (
        <>
            <PageMeta title='Dashboard' />
            <PageBreadcrumb title="Ecommerce" />
            <Row>
                <WidgetCards />
            </Row>
            <Row>
                <SalesReport />
            </Row>
            <Row>
                <SellingProducts />
                <CustomerRate />
            </Row>
            <Row>
                <OrderReport />
                <ProductsStock />
            </Row>
            <Row>
                <RecentOrder />
            </Row>
        </>
    )
}

export default Index