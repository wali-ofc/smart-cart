
import React, { useState } from 'react';
import './admin-dashboard.css';
import AdminContent from './AdminContent'; // The scoped CSS

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    React.useEffect(() => {
        const links = [
            '/admin-assets/vendor/perfect-scrollbar.css',
            '/admin-assets/css/vendor-material-icons.css',
            '/admin-assets/css/vendor-fontawesome-free.css'
        ];
        links.forEach(href => {
            if (!document.querySelector(`link[href="${href}"]`)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.className = 'admin-dashboard-asset';
                document.head.appendChild(link);
            }
        });
        
        // Change body background
        const originalBg = document.body.style.backgroundColor;
        document.body.style.backgroundColor = '#f8f9fa';
        return () => {
            document.body.style.backgroundColor = originalBg;
            document.querySelectorAll('.admin-dashboard-asset').forEach(el => el.remove());
        };
    }, []);

    const toggleSidebar = (e) => { e.preventDefault(); setSidebarOpen(!sidebarOpen); };

    return (
        <div id="admin-dashboard-scope">

        <div className="preloader"></div>

        
        <div className="mdk-header-layout js-mdk-header-layout">

            

            <div id="header"
                 className="mdk-header js-mdk-header m-0"
                 data-fixed>
                <div className="mdk-header__content">

                    <div className="navbar navbar-expand-sm navbar-main navbar-dark bg-dark  pr-0"
                         id="navbar"
                         data-primary>
                        <div className="container-fluid p-0">

                            

                            <button className="navbar-toggler navbar-toggler-right d-block d-lg-none"
                                    type="button"
                                    onClick={toggleSidebar}>
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            
                            <a href="index.html"
                               className="navbar-brand ">

                                <svg className="mr-2"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor"
                                     style={{ width: '20px' }}
                                     viewBox="0 0 40 40">
                                    <path d="M40 34.16666667c.01-3.21166667-2.58333333-5.82333334-5.795-5.835-1.94-.00666667-3.75666667.955-4.84166667 2.565-.10166666.155-.295.22333333-.47166666.16666666L11.94 25.66666667c-.19-.06-.31-.245-.28833333-.44333334.01-.07333333.015-.14833333.015-.22333333 0-.06833333-.005-.13833333-.01333334-.20666667-.02166666-.20166666.105-.39.3-.44666666l17.96-5.13c.13833334-.04.28666667-.005.39333334.09166666 1.05.97333334 2.42833333 1.51666667 3.86 1.525C37.38833333 20.83333333 40 18.22166667 40 15s-2.61166667-5.83333333-5.83333333-5.83333333C32.52 9.17166667 30.95333333 9.87833333 29.86 11.11c-.11.12166667-.28.16833333-.43666667.11833333L11.91 5.65333333c-.16-.05-.27333333-.19166666-.28833333-.35833333-.30333334-3.20166667-3.14333334-5.55166667-6.345-5.24833333S-.275 3.19.02833333 6.39166667c.28166667 2.99333333 2.79833334 5.28 5.805 5.275 1.64666667-.005 3.21333334-.71333334 4.30666667-1.945.11-.12166667.28-.16833334.43666667-.11833334l16.57 5.27166667c.22.06833333.34166666.30333333.27166666.52333333-.04166666.13333334-.14833333.23833334-.28333333.275L9.90333333 20.59666667c-.13333333.03833333-.275.00833333-.38166666-.08-1.03333334-.86833334-2.33833334-1.34666667-3.68833334-1.35C2.61166667 19.16666667 0 21.77833333 0 25s2.61166667 5.83333333 5.83333333 5.83333333c1.355-.005 2.665-.485 3.7-1.35833333.10833334-.09166667.25833334-.12.39333334-.07666667l18.29 5.81833334c.14.04333333.24666666.15666666.28.3.75666666 3.13166666 3.90833333 5.05666666 7.04 4.3C38.14833333 39.185 39.99 36.85333333 40 34.16666667z" />
                                </svg>

                                <span>flowdash</span>
                            </a>

                            <form className="search-form d-none d-sm-flex flex"
                                  action="index.html">
                                <button className="btn"
                                        type="submit"><i className="material-icons">search</i></button>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Search" />
                            </form>

                            <ul className="nav navbar-nav ml-auto d-none d-md-flex">
                                <li className="nav-item dropdown">
                                    <a href="#notifications_menu"
                                       className="nav-link dropdown-toggle"
                                       data-toggle="dropdown"
                                       data-caret="false">
                                        <i className="material-icons nav-icon navbar-notifications-indicator">notifications</i>
                                    </a>
                                    <div id="notifications_menu"
                                         className="dropdown-menu dropdown-menu-right navbar-notifications-menu">
                                        <div className="dropdown-item d-flex align-items-center py-2">
                                            <span className="flex navbar-notifications-menu__title m-0">Notifications</span>
                                            <a href="javascript:void(0)"
                                               className="text-muted"><small>Clear all</small></a>
                                        </div>
                                        <div className="navbar-notifications-menu__content"
                                             data-perfect-scrollbar>
                                            <div className="py-2">

                                                <div className="dropdown-item d-flex">
                                                    <div className="mr-3">
                                                        <div className="avatar avatar-sm"
                                                             style={{ width: '32px', height: '32px' }}>
                                                            <img src="/admin-assets/images/256_daniel-gaffey-1060698-unsplash.jpg"
                                                                 alt="Avatar"
                                                                 className="avatar-img rounded-circle" />
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <a href="">A.Demian</a> left a comment on <a href="">FlowDash</a><br />
                                                        <small className="text-muted">1 minute ago</small>
                                                    </div>
                                                </div>
                                                <div className="dropdown-item d-flex">
                                                    <div className="mr-3">
                                                        <a href="#">
                                                            <div className="avatar avatar-xs"
                                                                 style={{ width: '32px', height: '32px' }}>
                                                                <span className="avatar-title bg-purple rounded-circle"><i className="material-icons icon-16pt">person_add</i></span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="flex">
                                                        New user <a href="#">Peter Parker</a> signed up.<br />
                                                        <small className="text-muted">1 hour ago</small>
                                                    </div>
                                                </div>
                                                <div className="dropdown-item d-flex">
                                                    <div className="mr-3">
                                                        <a href="#">
                                                            <div className="avatar avatar-xs"
                                                                 style={{ width: '32px', height: '32px' }}>
                                                                <span className="avatar-title rounded-circle">JD</span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="flex">
                                                        <a href="#">Big Joe</a> <small className="text-muted">wrote:</small><br />
                                                        <div>Hey, how are you? What about our next meeting</div>
                                                        <small className="text-muted">2 minutes ago</small>
                                                    </div>
                                                </div>

                                                <div className="dropdown-item d-flex">
                                                    <div className="mr-3">
                                                        <div className="avatar avatar-sm"
                                                             style={{ width: '32px', height: '32px' }}>
                                                            <img src="/admin-assets/images/256_daniel-gaffey-1060698-unsplash.jpg"
                                                                 alt="Avatar"
                                                                 className="avatar-img rounded-circle" />
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <a href="">A.Demian</a> left a comment on <a href="">FlowDash</a><br />
                                                        <small className="text-muted">1 minute ago</small>
                                                    </div>
                                                </div>
                                                <div className="dropdown-item d-flex">
                                                    <div className="mr-3">
                                                        <a href="#">
                                                            <div className="avatar avatar-xs"
                                                                 style={{ width: '32px', height: '32px' }}>
                                                                <span className="avatar-title bg-purple rounded-circle"><i className="material-icons icon-16pt">person_add</i></span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="flex">
                                                        New user <a href="#">Peter Parker</a> signed up.<br />
                                                        <small className="text-muted">1 hour ago</small>
                                                    </div>
                                                </div>
                                                <div className="dropdown-item d-flex">
                                                    <div className="mr-3">
                                                        <a href="#">
                                                            <div className="avatar avatar-xs"
                                                                 style={{ width: '32px', height: '32px' }}>
                                                                <span className="avatar-title rounded-circle">JD</span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="flex">
                                                        <a href="#">Big Joe</a> <small className="text-muted">wrote:</small><br />
                                                        <div>Hey, how are you? What about our next meeting</div>
                                                        <small className="text-muted">2 minutes ago</small>
                                                    </div>
                                                </div>

                                                <div className="dropdown-item d-flex">
                                                    <div className="mr-3">
                                                        <div className="avatar avatar-sm"
                                                             style={{ width: '32px', height: '32px' }}>
                                                            <img src="/admin-assets/images/256_daniel-gaffey-1060698-unsplash.jpg"
                                                                 alt="Avatar"
                                                                 className="avatar-img rounded-circle" />
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <a href="">A.Demian</a> left a comment on <a href="">FlowDash</a><br />
                                                        <small className="text-muted">1 minute ago</small>
                                                    </div>
                                                </div>
                                                <div className="dropdown-item d-flex">
                                                    <div className="mr-3">
                                                        <a href="#">
                                                            <div className="avatar avatar-xs"
                                                                 style={{ width: '32px', height: '32px' }}>
                                                                <span className="avatar-title bg-purple rounded-circle"><i className="material-icons icon-16pt">person_add</i></span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="flex">
                                                        New user <a href="#">Peter Parker</a> signed up.<br />
                                                        <small className="text-muted">1 hour ago</small>
                                                    </div>
                                                </div>
                                                <div className="dropdown-item d-flex">
                                                    <div className="mr-3">
                                                        <a href="#">
                                                            <div className="avatar avatar-xs"
                                                                 style={{ width: '32px', height: '32px' }}>
                                                                <span className="avatar-title rounded-circle">JD</span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="flex">
                                                        <a href="#">Big Joe</a> <small className="text-muted">wrote:</small><br />
                                                        <div>Hey, how are you? What about our next meeting</div>
                                                        <small className="text-muted">2 minutes ago</small>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <a href="javascript:void(0);"
                                           className="dropdown-item text-center navbar-notifications-menu__footer">View All</a>
                                    </div>
                                </li>
                            </ul>

                            <ul className="nav navbar-nav d-none d-sm-flex border-left navbar-height align-items-center">
                                <li className="nav-item dropdown">
                                    <a href="#account_menu"
                                       className="nav-link dropdown-toggle"
                                       data-toggle="dropdown"
                                       data-caret="false">
                                        <span className="mr-1 d-flex-inline">
                                            <span className="text-light">Adrian D.</span>
                                        </span>
                                        <img src="/admin-assets/images/avatar/demi.png"
                                             className="rounded-circle"
                                             width="32"
                                             alt="Frontted" />
                                    </a>
                                    <div id="account_menu"
                                         className="dropdown-menu dropdown-menu-right">
                                        <div className="dropdown-item-text dropdown-item-text--lh">
                                            <div><strong>Adrian Demian</strong></div>
                                            <div className="text-muted">@adriandemian</div>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item"
                                           href="index.html"><i className="material-icons">dvr</i> Dashboard</a>
                                        <a className="dropdown-item"
                                           href="profile.html"><i className="material-icons">account_circle</i> My profile</a>
                                        <a className="dropdown-item"
                                           href="edit-account.html"><i className="material-icons">edit</i> Edit account</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item"
                                           href="login.html"><i className="material-icons">exit_to_app</i> Logout</a>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>

                </div>
            </div>

            

            
            <div className="mdk-header-layout__content">

                <div className="mdk-drawer-layout js-mdk-drawer-layout"
                     data-push
                     data-responsive-width="992px">
                    <div className="mdk-drawer-layout__content page">

                        <div className="container-fluid page__container">
                            <div className="page__heading d-flex align-items-center">
                                <div className="flex">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb mb-0">
                                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                                            <li className="breadcrumb-item active"
                                                aria-current="page">E-commerce</li>
                                        </ol>
                                    </nav>
                                    <h1 className="m-0">E-commerce</h1>
                                </div>
                                <a href=""
                                   className="btn btn-success ml-3">Add Product</a>
                            </div>
                        </div>

                        <div className="container-fluid page__container">

                            <div className="card-group">
                                <div className="card card-body text-center">

                                    <div className="d-flex flex-row align-items-center">
                                        <div className="card-header__title m-0"> <i className="material-icons icon-muted icon-30pt">assessment</i> Visits</div>
                                        <div className="text-amount ml-auto">3,642</div>
                                    </div>
                                </div>
                                <div className="card card-body text-center">
                                    <div className="d-flex flex-row align-items-center">
                                        <div className="card-header__title m-0"><i className="material-icons icon-muted icon-30pt">shopping_basket</i> Purchases</div>
                                        <div className="text-amount ml-auto">&dollar;12,311</div>
                                    </div>
                                </div>
                                <div className="card card-body text-center">
                                    <div className="d-flex flex-row align-items-center">
                                        <div className="card-header__title m-0"><i className="material-icons  icon-muted icon-30pt">perm_identity</i> Customers</div>
                                        <div className="text-amount ml-auto">78</div>
                                    </div>
                                </div>
                            </div>

                            <div className="card card-form d-flex flex-column flex-sm-row">
                                <div className="card-form__body card-body-form-group flex">
                                    <div className="row">
                                        <div className="col-sm-auto">
                                            <div className="form-group">
                                                <label htmlFor="filter_name">Name</label>
                                                <input id="filter_name"
                                                       type="text"
                                                       className="form-control"
                                                       placeholder="Search by name" />
                                            </div>
                                        </div>
                                        <div className="col-sm-auto">
                                            <div className="form-group">
                                                <label htmlFor="filter_category">Category</label><br />
                                                <select id="filter_category"
                                                        className="custom-select"
                                                        style={{ width: '200px' }}>
                                                    <option value="all">All Categories</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-auto">
                                            <div className="form-group">
                                                <label htmlFor="filter_stock">In stock?</label>
                                                <div className="custom-control custom-checkbox mt-sm-2">
                                                    <input type="checkbox"
                                                           className="custom-control-input"
                                                           id="filter_stock"
                                                           checked="" />
                                                    <label className="custom-control-label"
                                                           htmlFor="filter_stock">Yes</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-auto">
                                            <div className="form-group"
                                                 style={{ width: '200px' }}>
                                                <label htmlFor="filter_date">Order date</label>
                                                <input id="filter_date"
                                                       type="text"
                                                       className="form-control"
                                                       placeholder="Select date ..."
                                                       value="13/03/2018 to 20/03/2018"
                                                       data-toggle="flatpickr"
                                                       data-flatpickr-mode="range"
                                                       data-flatpickr-alt-format="d/m/Y"
                                                       data-flatpickr-date-format="d/m/Y" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn bg-white border-left border-top border-top-sm-0 rounded-top-0 rounded-top-sm rounded-left-sm-0"><i className="material-icons text-primary icon-20pt">refresh</i></button>
                            </div>

                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center text-center mb-4">
                                                <div className="border-right pr-4 mr-4">
                                                    <div className="mb-0">Total Views</div>
                                                    <div className="text-amount">4,412</div>
                                                </div>
                                                <div>
                                                    <div className="mb-0">Conv. Ratio</div>
                                                    <div className="text-amount">4%</div>
                                                </div>
                                                <div className="ml-auto">
                                                    <a href="#"
                                                       className="btn btn-primary">Export Data <i className="material-icons">file_download</i></a>
                                                </div>
                                            </div>
                                            <div className="chart"
                                                 style={{ height: '295px' }}>
                                                <canvas id="viewsChart">
                                                    <span style={{ fontSize: '1rem' }}><strong>Views</strong> area chart goes here.</span>
                                                </canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="card">
                                        <div className="card-header card-header-large bg-white d-flex align-items-center">
                                            <div className="flatpickr-wrapper flex">
                                                <div id="recent_orders_date"
                                                     data-toggle="flatpickr"
                                                     data-flatpickr-wrap="true"
                                                     data-flatpickr-static="true"
                                                     data-flatpickr-mode="range"
                                                     data-flatpickr-alt-format="d/m/Y"
                                                     data-flatpickr-date-format="d/m/Y">
                                                    <h4 className="card-header__title">Recent Orders</h4>
                                                    <a href="javascript:void(0)"
                                                       className="link-date"
                                                       data-toggle>13/03/2018 to 20/03/2018</a>
                                                    <input className="flatpickr-hidden-input"
                                                           type="hidden"
                                                           value="13/03/2018 to 20/03/2018"
                                                           data-input />
                                                </div>
                                            </div>
                                            <i className="material-icons icon-muted">help_outline</i>
                                        </div>
                                        <div className="card-body py-0">
                                            <div className="list-group list-group-small list-group-flush">

                                                <div className="list-group-item d-flex align-items-center px-0">
                                                    <div className="mr-3 flex"> <i className="material-icons icon-18pt icon-muted">contacts</i> Sherri J. Cardenas</div>
                                                    <div className="mr-3 text-dark-gray">3 days ago</div>
                                                    <div><a href="">&dollar;123</a></div>
                                                </div>

                                                <div className="list-group-item d-flex align-items-center px-0">
                                                    <div className="mr-3 flex"> <i className="material-icons icon-18pt icon-muted">contacts</i> Joseph S. Ferland</div>
                                                    <div className="mr-3 text-dark-gray">2 days ago</div>
                                                    <div><a href="">&dollar;246</a></div>
                                                </div>

                                                <div className="list-group-item d-flex align-items-center px-0">
                                                    <div className="mr-3 flex"> <i className="material-icons icon-18pt icon-muted">contacts</i> Bryan K. Davis</div>
                                                    <div className="mr-3 text-dark-gray">1 day ago</div>
                                                    <div><a href="">&dollar;369</a></div>
                                                </div>

                                                <div className="list-group-item d-flex align-items-center px-0">
                                                    <div className="mr-3 flex"> <i className="material-icons icon-18pt icon-muted">contacts</i> Elizabeth J. Ohara</div>
                                                    <div className="mr-3 text-dark-gray">4 hours ago</div>
                                                    <div><a href="">&dollar;492</a></div>
                                                </div>

                                                <div className="list-group-item d-flex align-items-center px-0">
                                                    <div className="mr-3 flex"> <i className="material-icons icon-18pt icon-muted">contacts</i> Kaci M. Langston</div>
                                                    <div className="mr-3 text-dark-gray">just now</div>
                                                    <div><a href="">&dollar;615</a></div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="card-footer text-center">
                                            <a className="text-muted"
                                               href="">View All (54)</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    

                    <div className={`mdk-drawer js-mdk-drawer ${sidebarOpen ? 'mdk-drawer--open' : ''}`}
                         id="default-drawer"
                         data-align="start">
                        <div className="mdk-drawer__content">
                            <div className="sidebar sidebar-light sidebar-left sidebar-p-t"
                                 data-perfect-scrollbar>
                                <div className="sidebar-heading">Menu</div>
                                <ul className="sidebar-menu">
                                    <li className="sidebar-menu-item active open">
                                        <a className="sidebar-menu-button"
                                           data-toggle="collapse"
                                           href="#dashboards_menu">
                                            <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">dvr</i>
                                            <span className="sidebar-menu-text">Dashboards</span>
                                            <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                        </a>
                                        <ul className="sidebar-submenu collapse show "
                                            id="dashboards_menu">
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="index.html">
                                                    <span className="sidebar-menu-text">Default</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="analytics.html">
                                                    <span className="sidebar-menu-text">Analytics</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button" href="#" onClick={(e) => { e.preventDefault(); setActiveTab("customers"); }}>
                                                    <span className="sidebar-menu-text">Staff</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item active">
                                                <a className="sidebar-menu-button" href="#" onClick={(e) => { e.preventDefault(); setActiveTab("overview"); }}>
                                                    <span className="sidebar-menu-text">E-commerce</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="dashboard-quick-access.html">
                                                    <span className="sidebar-menu-text">Quick Access</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           data-toggle="collapse"
                                           href="#apps_menu">
                                            <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">slideshow</i>
                                            <span className="sidebar-menu-text">Apps</span>
                                            <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                        </a>
                                        <ul className="sidebar-submenu collapse"
                                            id="apps_menu">
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="app-activities.html">
                                                    <span className="sidebar-menu-text">Activities</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="app-trello.html">
                                                    <span className="sidebar-menu-text">Trello</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="app-projects.html">
                                                    <span className="sidebar-menu-text">Projects</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="app-fullcalendar.html">
                                                    <span className="sidebar-menu-text">Event Calendar</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="app-chat.html">
                                                    <span className="sidebar-menu-text">Chat</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="app-email.html">
                                                    <span className="sidebar-menu-text">Email</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item ">
                                                <a className="sidebar-menu-button"
                                                   data-toggle="collapse"
                                                   href="#course_menu">
                                                    <span className="sidebar-menu-text">Education</span>
                                                    <span className="ml-auto d-flex align-items-center">
                                                        <span className="badge badge-primary">NEW</span>
                                                        <span className="sidebar-menu-toggle-icon"></span>
                                                    </span>
                                                </a>
                                                <ul className="sidebar-submenu collapse "
                                                    id="course_menu">
                                                    <li className="sidebar-menu-item ">
                                                        <a className="sidebar-menu-button"
                                                           href="app-browse-courses.html">
                                                            <span className="sidebar-menu-text">Browse Courses</span>
                                                        </a>
                                                    </li>
                                                    <li className="sidebar-menu-item ">
                                                        <a className="sidebar-menu-button"
                                                           href="app-course.html">
                                                            <span className="sidebar-menu-text">Course</span>
                                                        </a>
                                                    </li>
                                                    <li className="sidebar-menu-item ">
                                                        <a className="sidebar-menu-button"
                                                           href="app-lesson.html">
                                                            <span className="sidebar-menu-text">Lesson</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           data-toggle="collapse"
                                           href="#pages_menu">
                                            <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">description</i>
                                            <span className="sidebar-menu-text">Pages</span>
                                            <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                        </a>
                                        <ul className="sidebar-submenu collapse"
                                            id="pages_menu">
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="companies.html">
                                                    <span className="sidebar-menu-text">Companies</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="stories.html">
                                                    <span className="sidebar-menu-text">Stories</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="discussions.html">
                                                    <span className="sidebar-menu-text">Discussions</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="invoice.html">
                                                    <span className="sidebar-menu-text">Invoice</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="pricing.html">
                                                    <span className="sidebar-menu-text">Pricing</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="edit-account.html">
                                                    <span className="sidebar-menu-text">Edit Account</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="profile.html">
                                                    <span className="sidebar-menu-text">User Profile</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="payout.html">
                                                    <span className="sidebar-menu-text">Payout</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="digital-product.html">
                                                    <span className="sidebar-menu-text">Digital Product</span>
                                                    <span className="badge badge-primary ml-auto">NEW</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   data-toggle="collapse"
                                                   href="#login_menu">
                                                    <span className="sidebar-menu-text">Login</span>
                                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                                </a>
                                                <ul className="sidebar-submenu collapse"
                                                    id="login_menu">
                                                    <li className="sidebar-menu-item">
                                                        <a className="sidebar-menu-button"
                                                           href="login.html">
                                                            <span className="sidebar-menu-text">Login / Background Image</span>
                                                        </a>
                                                    </li>
                                                    <li className="sidebar-menu-item">
                                                        <a className="sidebar-menu-button"
                                                           href="login-centered-boxed.html">
                                                            <span className="sidebar-menu-text">Login / Centered Boxed</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   data-toggle="collapse"
                                                   href="#signup_menu">
                                                    <span className="sidebar-menu-text">Sign Up</span>
                                                    <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                                </a>
                                                <ul className="sidebar-submenu collapse"
                                                    id="signup_menu">
                                                    <li className="sidebar-menu-item">
                                                        <a className="sidebar-menu-button"
                                                           href="signup.html">
                                                            <span className="sidebar-menu-text">Sign Up / Background Image</span>
                                                        </a>
                                                    </li>
                                                    <li className="sidebar-menu-item">
                                                        <a className="sidebar-menu-button"
                                                           href="signup-centered-boxed.html">
                                                            <span className="sidebar-menu-text">Sign Up / Centered Boxed</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button" href="#" onClick={(e) => { e.preventDefault(); setActiveTab("products"); }}>
                                                    <span className="sidebar-menu-text">Product Listing</span>
                                                    <span className="badge badge-primary ml-auto">NEW</span>
                                                </a>
                                            </li>

                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="blank.html">
                                                    <span className="sidebar-menu-text">Blank Page</span>
                                                    <span className="badge badge-primary ml-auto">NEW</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="sidebar-menu-item">
                                        <a className="sidebar-menu-button"
                                           data-toggle="collapse"
                                           href="#layouts_menu">
                                            <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">view_compact</i>
                                            <span className="sidebar-menu-text">Layouts</span>
                                            <span className="ml-auto sidebar-menu-toggle-icon"></span>
                                        </a>
                                        <ul className="sidebar-submenu collapse"
                                            id="layouts_menu">
                                            <li className="sidebar-menu-item active">
                                                <a className="sidebar-menu-button" href="#" onClick={(e) => { e.preventDefault(); setActiveTab("overview"); }}>
                                                    <span className="sidebar-menu-text">Default</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="fluid-ecommerce.html">
                                                    <span className="sidebar-menu-text">Full Width Navs</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="fixed-ecommerce.html">
                                                    <span className="sidebar-menu-text">Fixed Navs</span>
                                                </a>
                                            </li>
                                            <li className="sidebar-menu-item">
                                                <a className="sidebar-menu-button"
                                                   href="mini-ecommerce.html">
                                                    <span className="sidebar-menu-text">Mini Sidebar + Navs</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <div className="sidebar-heading">Components</div>
                                <div className="sidebar-block p-0 mb-0">
                                    <ul className="sidebar-menu"
                                        id="components_menu">
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-buttons.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">mouse</i>
                                                <span className="sidebar-menu-text">Buttons</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-alerts.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">notifications</i>
                                                <span className="sidebar-menu-text">Alerts</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-avatars.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">person</i>
                                                <span className="sidebar-menu-text">Avatars</span>
                                                <span className="badge badge-primary ml-auto">NEW</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-modals.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">aspect_ratio</i>
                                                <span className="sidebar-menu-text">Modals</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-charts.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">pie_chart_outlined</i>
                                                <span className="sidebar-menu-text">Charts</span>
                                                <span className="badge badge-warning ml-auto">PRO</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-icons.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">brush</i>
                                                <span className="sidebar-menu-text">Icons</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-forms.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">text_format</i>
                                                <span className="sidebar-menu-text">Forms</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-range-sliders.html">
                                                
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">tune</i>
                                                <span className="sidebar-menu-text">Range Sliders</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-datetime.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">event_available</i>
                                                <span className="sidebar-menu-text">Time &amp; Date</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button" href="#" onClick={(e) => { e.preventDefault(); setActiveTab("orders"); }}>
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">dns</i>
                                                <span className="sidebar-menu-text">Tables</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-tabs.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">tab</i>
                                                <span className="sidebar-menu-text">Tabs</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-loaders.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">refresh</i>
                                                <span className="sidebar-menu-text">Loaders</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-drag.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">control_point</i>
                                                <span className="sidebar-menu-text">Drag &amp; Drop</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-pagination.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">last_page</i>
                                                <span className="sidebar-menu-text">Pagination</span>
                                            </a>
                                        </li>
                                        <li className="sidebar-menu-item">
                                            <a className="sidebar-menu-button"
                                               href="ui-vector-maps.html">
                                                <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">location_on</i>
                                                <span className="sidebar-menu-text">Vector Maps</span>
                                            </a>
                                        </li>
                                    </ul>

                                    <div className="sidebar-p-a sidebar-b-y">
                                        <div className="d-flex align-items-top mb-2">
                                            <div className="sidebar-heading m-0 p-0 flex text-body js-text-body">Progress</div>
                                            <div className="font-weight-bold text-success">60%</div>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar bg-success"
                                                 role="progressbar"
                                                 style={{ width: '60%' }}
                                                 aria-valuenow="60"
                                                 aria-valuemin="0"
                                                 aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center sidebar-p-a border-bottom sidebar-account">
                                    <a href="profile.html"
                                       className="flex d-flex align-items-center text-underline-0 text-body">
                                        <span className="avatar avatar-sm mr-2">
                                            <img src="/admin-assets/images/avatar/demi.png"
                                                 alt="avatar"
                                                 className="avatar-img rounded-circle" />
                                        </span>
                                        <span className="flex d-flex flex-column">
                                            <strong>Adrian Demian</strong>
                                            <small className="text-muted text-uppercase">Site Manager</small>
                                        </span>
                                    </a>
                                    <div className="dropdown ml-auto">
                                        <a href="#"
                                           data-toggle="dropdown"
                                           data-caret="false"
                                           className="text-muted"><i className="material-icons">more_vert</i></a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <div className="dropdown-item-text dropdown-item-text--lh">
                                                <div><strong>Adrian Demian</strong></div>
                                                <div>@adriandemian</div>
                                            </div>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item"
                                               href="index.html">Dashboard</a>
                                            <a className="dropdown-item"
                                               href="profile.html">My profile</a>
                                            <a className="dropdown-item"
                                               href="edit-account.html">Edit account</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item"
                                               href="login.html">Logout</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidebar-p-a">
                                    <a href="https://themeforest.net/item/stack-admin-bootstrap-4-dashboard-template/22959011"
                                       className="btn btn-primary btn-block">Purchase &dollar;35</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                

            </div>
            

        </div>
        

        
        

        
        

        
        
        

        
        

        
        

        
        

        
        
        
        
        
        

        
        

        
        
        

        
        

        
        
        

        
        

        
        

        
        

    
        </div>
    );
}
