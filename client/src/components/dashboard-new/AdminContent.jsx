
import React, { useState } from 'react';

export default function AdminContent({ activeTab }) {
    const [mockOrders, setMockOrders] = useState([
        { id: '#ORD-001', customer: 'John Doe', amount: '$120.00', status: 'Pending' },
        { id: '#ORD-002', customer: 'Jane Smith', amount: '$450.50', status: 'Processing' },
        { id: '#ORD-003', customer: 'Alice Johnson', amount: '$99.99', status: 'Shipped' },
        { id: '#ORD-004', customer: 'Bob Brown', amount: '$1,200.00', status: 'Delivered' },
    ]);

    
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredOrders = mockOrders.filter(o => {
        return (statusFilter === 'All' || o.status === statusFilter) &&
               (o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    const updateOrderStatus = (id, newStatus) => {
        setMockOrders(mockOrders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        alert(`Order ${id} status changed to ${newStatus}!`);
    };

    if (activeTab === 'overview') {
        return (
<div className="container-fluid page__container">
    <div className="page__heading d-flex align-items-center">
        <div className="flex">
            <h1 className="m-0">Overview</h1>
        </div>
    </div>
    <div className="row">
        <div className="col-lg-3 col-md-6 card-group-row__col">
            <div className="card card-group-row__card">
                <div className="card-body d-flex flex-row align-items-center flex-0 border-bottom">
                    <div className="flex">
                        <div className="card-header__title mb-2">Total Revenue</div>
                        <div className="text-amount">&dollar;24,850</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 card-group-row__col">
            <div className="card card-group-row__card">
                <div className="card-body d-flex flex-row align-items-center flex-0 border-bottom">
                    <div className="flex">
                        <div className="card-header__title mb-2">Total Orders</div>
                        <div className="text-amount">1,248</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 card-group-row__col">
            <div className="card card-group-row__card">
                <div className="card-body d-flex flex-row align-items-center flex-0 border-bottom">
                    <div className="flex">
                        <div className="card-header__title mb-2">Total Customers</div>
                        <div className="text-amount">856</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 card-group-row__col">
            <div className="card card-group-row__card">
                <div className="card-body d-flex flex-row align-items-center flex-0 border-bottom">
                    <div className="flex">
                        <div className="card-header__title mb-2">Products</div>
                        <div className="text-amount">342</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
);
    } else if (activeTab === 'orders') {
        return (
<div className="container-fluid page__container">
    <div className="page__heading d-flex align-items-center">
        <div className="flex">
            <h1 className="m-0">Orders</h1>
        </div>
    </div>
    <div className="card">
        <div className="table-responsive">
            
        <div className="card-header border-bottom d-flex align-items-center">
            <input 
                type="text" 
                className="form-control form-control-sm mr-3" 
                placeholder="Search orders..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '250px' }}
            />
            <select 
                className="form-control form-control-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ width: '150px' }}
            >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
            </select>
        </div>
        <table className="table mb-0 thead-border-top-0 table-nowrap">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="list">
                {filteredOrders.length > 0 ? filteredOrders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.amount}</td>
                        <td>
                            <select 
                                className="form-control form-control-sm"
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                style={{ width: '130px' }}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </td>
                        <td><button className="btn btn-sm btn-primary" onClick={() => alert('Viewing details for ' + order.id)}>View Details</button></td>
                    </tr>
                )) : <tr><td colSpan="5" className="text-center">No orders found.</td></tr>}
            </tbody>
        </table>

        </div>
    </div>
</div>
);
    } else if (activeTab === 'products') {
        return (
            <div className="container-fluid page__container">
                <div className="page__heading d-flex align-items-center">
                    <div className="flex">
                        <h1 className="m-0">Products</h1>
                    </div>
                </div>
                <div className="card">
                    <div className="table-responsive">

                                    <div className="m-3">
                                        <div className="row">
                                            <div className="col-md-4">

                                                <select name="#"
                                                        className="form-control">
                                                    <option value="-1">All</option>
                                                    <option value="1">Hats</option>
                                                    <option value="2">Coats</option>
                                                    <option value="3">Jeans</option>
                                                    <option value="4">T-Shirt</option>
                                                    <option value="5">Other</option>
                                                </select>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="search-form search-form--light">
                                                    <input type="text"
                                                           className="form-control search"
                                                           placeholder="Search" />
                                                    <button className="btn"
                                                            type="button"
                                                            role="button"><i className="material-icons">search</i></button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <table className="table mb-0 thead-border-top-0 table-striped">
                                        <thead>
                                            <tr>

                                                <th style={{ width: '18px' }}>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"
                                                               className="custom-control-input js-toggle-check-all"
                                                               data-target="#products"
                                                               id="customCheckAll" />
                                                        <label className="custom-control-label"
                                                               for="customCheckAll"><span className="text-hide">Toggle all</span></label>
                                                    </div>
                                                </th>

                                                <th style={{ width: '30px' }}
                                                    className="text-center">#ID</th>
                                                <th>Product</th>
                                                <th className="text-center">Stock</th>
                                                <th className="">Category</th>
                                                <th className="text-right">Price</th>
                                                <th style={{ width: '100px', textAlign: 'right' }}>
                                                    <div className="dropdown pull-right">
                                                        <a href="#"
                                                           data-toggle="dropdown"
                                                           className="dropdown-toggle">Bulk</a>
                                                        <div className="dropdown-menu dropdown-menu-right">
                                                            <a href="javascript:void(0)"
                                                               className="dropdown-item"><i className="material-icons icon-18pt mr-1">work</i> Set Price</a>
                                                            <a href="javascript:void(0)"
                                                               className="dropdown-item"><i className="material-icons icon-18pt mr-1">archive</i> Archive</a>
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="list"
                                               id="products">

                                            <tr>

                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"
                                                               className="custom-control-input js-check-selected-row"
                                                               id="customCheck1_1" />
                                                        <label className="custom-control-label"
                                                               for="customCheck1_1"><span className="text-hide">Check</span></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="badge badge-soft-dark">#101</div>
                                                </td>
                                                <td>
                                                    <img src="/admin-assets/images/avatars/clem-onojeghuo-192088.jpg"
                                                         alt="product"
                                                         style={{ width: '35px' }}
                                                         className="rounded mr-2" />
                                                    <a href="#">Bleu Snow Coat</a>
                                                </td>
                                                <td style={{ width: '120px' }}
                                                    className="text-center">
                                                    4 items</td>
                                                <td style={{ width: '200px' }}>

                                                    <i className="material-icons icon-18pt text-muted mr-1">list</i> <a href="#">Coats</a>

                                                </td>

                                                <td className="text-right">$22</td>
                                                <td className="text-right"><a href="#"
                                                       className="btn btn-sm btn-primary">EDIT</a></td>
                                            </tr>

                                            <tr>

                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"
                                                               className="custom-control-input js-check-selected-row"
                                                               id="customCheck1_2" />
                                                        <label className="custom-control-label"
                                                               for="customCheck1_2"><span className="text-hide">Check</span></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="badge badge-soft-dark">#102</div>
                                                </td>
                                                <td>
                                                    <img src="/admin-assets/images/avatars/lobostudio-hamburg-64728.jpg"
                                                         alt="product"
                                                         style={{ width: '35px' }}
                                                         className="rounded mr-2" />
                                                    <a href="#">Navy Hat with Stripes</a>
                                                </td>
                                                <td style={{ width: '120px' }}
                                                    className="text-center">
                                                    10 items</td>
                                                <td style={{ width: '200px' }}>

                                                    <i className="material-icons icon-18pt text-muted mr-1">list</i> <a href="#">Hats</a>

                                                </td>

                                                <td className="text-right">$54</td>
                                                <td className="text-right"><a href="#"
                                                       className="btn btn-sm btn-primary">EDIT</a></td>
                                            </tr>

                                            <tr>

                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"
                                                               className="custom-control-input js-check-selected-row"
                                                               id="customCheck1_3" />
                                                        <label className="custom-control-label"
                                                               for="customCheck1_3"><span className="text-hide">Check</span></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="badge badge-soft-dark">#103</div>
                                                </td>
                                                <td>
                                                    <img src="/admin-assets/images/avatars/nina-strehl-140734.jpg"
                                                         alt="product"
                                                         style={{ width: '35px' }}
                                                         className="rounded mr-2" />
                                                    <a href="#">Bleu Snow Coat</a>
                                                </td>
                                                <td style={{ width: '120px' }}
                                                    className="text-center">
                                                    4 items</td>
                                                <td style={{ width: '200px' }}>

                                                    <i className="material-icons icon-18pt text-muted mr-1">list</i> <a href="#">Coats</a>

                                                </td>

                                                <td className="text-right">$22</td>
                                                <td className="text-right"><a href="#"
                                                       className="btn btn-sm btn-primary">EDIT</a></td>
                                            </tr>

                                            <tr>

                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"
                                                               className="custom-control-input js-check-selected-row"
                                                               id="customCheck1_4" />
                                                        <label className="custom-control-label"
                                                               for="customCheck1_4"><span className="text-hide">Check</span></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="badge badge-soft-dark">#104</div>
                                                </td>
                                                <td>
                                                    <img src="/admin-assets/images/avatars/lobostudio-hamburg-64728.jpg"
                                                         alt="product"
                                                         style={{ width: '35px' }}
                                                         className="rounded mr-2" />
                                                    <a href="#">Navy Hat with Stripes</a>
                                                </td>
                                                <td style={{ width: '120px' }}
                                                    className="text-center">
                                                    10 items</td>
                                                <td style={{ width: '200px' }}>

                                                    <i className="material-icons icon-18pt text-muted mr-1">list</i> <a href="#">Hats</a>

                                                </td>

                                                <td className="text-right">$54</td>
                                                <td className="text-right"><a href="#"
                                                       className="btn btn-sm btn-primary">EDIT</a></td>
                                            </tr>

                                            <tr>

                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"
                                                               className="custom-control-input js-check-selected-row"
                                                               id="customCheck1_5" />
                                                        <label className="custom-control-label"
                                                               for="customCheck1_5"><span className="text-hide">Check</span></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="badge badge-soft-dark">#105</div>
                                                </td>
                                                <td>
                                                    <img src="/admin-assets/images/avatars/clem-onojeghuo-192088.jpg"
                                                         alt="product"
                                                         style={{ width: '35px' }}
                                                         className="rounded mr-2" />
                                                    <a href="#">Bleu Snow Coat</a>
                                                </td>
                                                <td style={{ width: '120px' }}
                                                    className="text-center">
                                                    4 items</td>
                                                <td style={{ width: '200px' }}>

                                                    <i className="material-icons icon-18pt text-muted mr-1">list</i> <a href="#">Coats</a>

                                                </td>

                                                <td className="text-right">$22</td>
                                                <td className="text-right"><a href="#"
                                                       className="btn btn-sm btn-primary">EDIT</a></td>
                                            </tr>

                                            <tr>

                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"
                                                               className="custom-control-input js-check-selected-row"
                                                               id="customCheck1_6" />
                                                        <label className="custom-control-label"
                                                               for="customCheck1_6"><span className="text-hide">Check</span></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="badge badge-soft-dark">#106</div>
                                                </td>
                                                <td>
                                                    <img src="/admin-assets/images/avatars/nina-strehl-140734.jpg"
                                                         alt="product"
                                                         style={{ width: '35px' }}
                                                         className="rounded mr-2" />
                                                    <a href="#">Navy Hat with Stripes</a>
                                                </td>
                                                <td style={{ width: '120px' }}
                                                    className="text-center">
                                                    10 items</td>
                                                <td style={{ width: '200px' }}>

                                                    <i className="material-icons icon-18pt text-muted mr-1">list</i> <a href="#">Hats</a>

                                                </td>

                                                <td className="text-right">$54</td>
                                                <td className="text-right"><a href="#"
                                                       className="btn btn-sm btn-primary">EDIT</a></td>
                                            </tr>

                                            <tr>

                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"
                                                               className="custom-control-input js-check-selected-row"
                                                               id="customCheck1_7" />
                                                        <label className="custom-control-label"
                                                               for="customCheck1_7"><span className="text-hide">Check</span></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="badge badge-soft-dark">#107</div>
                                                </td>
                                                <td>
                                                    <img src="/admin-assets/images/avatars/clem-onojeghuo-192088.jpg"
                                                         alt="product"
                                                         style={{ width: '35px' }}
                                                         className="rounded mr-2" />
                                                    <a href="#">Bleu Snow Coat</a>
                                                </td>
                                                <td style={{ width: '120px' }}
                                                    className="text-center">
                                                    4 items</td>
                                                <td style={{ width: '200px' }}>

                                                    <i className="material-icons icon-18pt text-muted mr-1">list</i> <a href="#">Coats</a>

                                                </td>

                                                <td className="text-right">$22</td>
                                                <td className="text-right"><a href="#"
                                                       className="btn btn-sm btn-primary">EDIT</a></td>
                                            </tr>

                                            <tr>

                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"
                                                               className="custom-control-input js-check-selected-row"
                                                               id="customCheck1_8" />
                                                        <label className="custom-control-label"
                                                               for="customCheck1_8"><span className="text-hide">Check</span></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="badge badge-soft-dark">#108</div>
                                                </td>
                                                <td>
                                                    <img src="/admin-assets/images/avatars/nina-strehl-140734.jpg"
                                                         alt="product"
                                                         style={{ width: '35px' }}
                                                         className="rounded mr-2" />
                                                    <a href="#">Navy Hat with Stripes</a>
                                                </td>
                                                <td style={{ width: '120px' }}
                                                    className="text-center">
                                                    10 items</td>
                                                <td style={{ width: '200px' }}>

                                                    <i className="material-icons icon-18pt text-muted mr-1">list</i> <a href="#">Hats</a>

                                                </td>

                                                <td className="text-right">$54</td>
                                                <td className="text-right"><a href="#"
                                                       className="btn btn-sm btn-primary">EDIT</a></td>
                                            </tr>

                                            <tr>

                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"
                                                               className="custom-control-input js-check-selected-row"
                                                               id="customCheck1_9" />
                                                        <label className="custom-control-label"
                                                               for="customCheck1_9"><span className="text-hide">Check</span></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="badge badge-soft-dark">#109</div>
                                                </td>
                                                <td>
                                                    <img src="/admin-assets/images/avatars/lobostudio-hamburg-64728.jpg"
                                                         alt="product"
                                                         style={{ width: '35px' }}
                                                         className="rounded mr-2" />
                                                    <a href="#">Bleu Snow Coat</a>
                                                </td>
                                                <td style={{ width: '120px' }}
                                                    className="text-center">
                                                    4 items</td>
                                                <td style={{ width: '200px' }}>

                                                    <i className="material-icons icon-18pt text-muted mr-1">list</i> <a href="#">Coats</a>

                                                </td>

                                                <td className="text-right">$22</td>
                                                <td className="text-right"><a href="#"
                                                       className="btn btn-sm btn-primary">EDIT</a></td>
                                            </tr>

                                            <tr>

                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"
                                                               className="custom-control-input js-check-selected-row"
                                                               id="customCheck1_10" />
                                                        <label className="custom-control-label"
                                                               for="customCheck1_10"><span className="text-hide">Check</span></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="badge badge-soft-dark">#110</div>
                                                </td>
                                                <td>
                                                    <img src="/admin-assets/images/avatars/clem-onojeghuo-192088.jpg"
                                                         alt="product"
                                                         style={{ width: '35px' }}
                                                         className="rounded mr-2" />
                                                    <a href="#">Navy Hat with Stripes</a>
                                                </td>
                                                <td style={{ width: '120px' }}
                                                    className="text-center">
                                                    10 items</td>
                                                <td style={{ width: '200px' }}>

                                                    <i className="material-icons icon-18pt text-muted mr-1">list</i> <a href="#">Hats</a>

                                                </td>

                                                <td className="text-right">$54</td>
                                                <td className="text-right"><a href="#"
                                                       className="btn btn-sm btn-primary">EDIT</a></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                </div>
            </div>
        );
    } else if (activeTab === 'customers') {
        return (
            <div className="container-fluid page__container">
                <div className="page__heading d-flex align-items-center">
                    <div className="flex">
                        <h1 className="m-0">Customers</h1>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">Customer Management UI coming soon.</div>
                </div>
            </div>
        );
    }

    return null;
}
