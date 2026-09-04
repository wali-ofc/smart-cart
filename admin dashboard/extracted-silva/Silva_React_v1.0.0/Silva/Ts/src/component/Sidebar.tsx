import logoDark from "@/assets/images/logo-dark.png"
import logoLight from "@/assets/images/logo-light.png"
import logoSm from "@/assets/images/logo-sm.png"
import AppMenu from '@/layout/component/AppMenu'
import { MENU_ITEMS } from '@/layout/data/menu-item'
import { Link } from "react-router-dom"
import SimplebarClient from './SimplebarClient'
import { useEffect } from "react"

const Sidebar = () => {
        useEffect(() => {
        if (typeof window !== 'undefined') {
            import('feather-icons').then(feather => {
                feather.replace();
            });
        }
    }, []);

    return (
        <div className="app-sidebar-menu">
            <SimplebarClient className="h-100">
                <div id="sidebar-menu">
                    <div className="logo-box">
                        <Link to="/dashboard/ecommerce" className="logo logo-light">
                            <span className="logo-sm">
                                <img src={logoSm} alt="logo" height="22" />
                            </span>
                            <span className="logo-lg">
                                <div className="d-flex align-items-center justify-content-center">
                                <img src={logoSm} alt="logo" height="24" />
                                <h4 className="mb-0 ms-2 text-white fw-bold" style={{letterSpacing: '1px'}}>Smart Cart</h4>
                            </div>
                            </span>
                        </Link>
                        <Link to="/dashboard/ecommerce" className="logo logo-dark">
                            <span className="logo-sm">
                                <img src={logoSm} alt="logo" height="22" />
                            </span>
                            <span className="logo-lg">
                                <div className="d-flex align-items-center justify-content-center">
                                <img src={logoSm} alt="logo" height="24" />
                                <h4 className="mb-0 ms-2 text-dark fw-bold" style={{letterSpacing: '1px'}}>Smart Cart</h4>
                            </div>
                            </span>
                        </Link>
                    </div>

                    <AppMenu menuItems={MENU_ITEMS} />
                </div>
                <div className="clearfix"></div>
            </SimplebarClient>
        </div >
    )
}

export default Sidebar