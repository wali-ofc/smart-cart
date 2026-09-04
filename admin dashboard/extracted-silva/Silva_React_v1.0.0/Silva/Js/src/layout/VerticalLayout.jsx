import Footer from '@/component/footer/Footer';
import Sidebar from '@/component/Sidebar';
import Topbar from '@/component/topbar/Topbar';
import { Container } from 'react-bootstrap';
const VerticalLayout = ({
  children
}) => {
  return <>
            <div id="app-layout">
                <Topbar />
                <Sidebar />
                <div className="content-page">
                    <div className="content">
                        <Container fluid>
                            {children}
                        </Container>
                    </div>
                </div>
                <Footer />
            </div>
        </>;
};
export default VerticalLayout;