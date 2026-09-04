import CommonCard from '@/component/CommonCard'
import { Col, Row } from 'react-bootstrap'
import ReactDOMServer from 'react-dom/server'
import DT from 'datatables.net-bs5'
import DataTable from 'datatables.net-react'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'datatables.net-responsive-bs5'
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css'
import 'datatables.net-bs5'
import 'datatables.net-buttons-bs5'
import 'datatables.net-buttons/js/buttons.html5'
import 'datatables.net-buttons/js/buttons.print'
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css'
import 'datatables.net-buttons'
import 'datatables.net-select-bs5'
import 'datatables.net-select-bs5/css/select.bootstrap5.min.css'
import { Basicdata } from '../data'

DataTable.use(DT)

const columns = [
    { title: 'Name' },
    { title: 'Position' },
    { title: 'Office' },
    { title: 'Age' },
    { title: 'Start date' },
    { title: 'Salary' },
]

const BasicDatatable = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Basic Datatable' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={columns.map(col => ({
                        ...col,
                    }))}
                    options={{
                        responsive: true,
                        paging: true,
                        pagingType: 'simple_numbers',
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table table-bordered dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    )
}

const ButtonDataTabel = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Button Datatable' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={columns.map(col => ({
                        ...col,
                    }))}
                    options={{
                        dom: 'Bfrtip',
                        buttons: ['copy', 'print'],
                        responsive: true,
                        paging: true,
                        pagingType: 'simple_numbers',
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table table-bordered dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    )
}

const KeyTableDatatable = () => {
    return (
        <Col xs={12}>
            <CommonCard title='KeyTable Example Datatable' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={columns.map(col => ({
                        ...col,
                    }))}
                    options={{
                        responsive: true,
                        paging: true,
                        pagingType: 'simple_numbers',
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table table-bordered dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    )
}

const ResponsiveTableDatatable = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Responsive Example Datatable' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={columns.map(col => ({
                        ...col,
                    }))}
                    options={{
                        responsive: true,
                        paging: true,
                        pagingType: 'simple_numbers',
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table table-bordered dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    )
}

const MultiItemSelectionDatatable = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Multi item selection Datatable' titleClass='mb-0'>
                <div className="multi-select-no-bg">
                    <DataTable
                        data={Basicdata}
                        columns={columns.map(col => ({
                            ...col,
                            }))}
                        options={{
                            responsive: true,
                            paging: true,
                            pagingType: 'simple_numbers',
                            select: {
                                style: 'multi',
                                className: 'no-highlight'
                            },
                            language: {
                                paginate: {
                                    previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                    next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                                },
                            },
                        }}
                        className="table table-bordered dt-responsive nowrap w-100"
                    />
                </div>
            </CommonCard>
        </Col>
    );
};


const ScrollVerticalDatatable = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Scroll Vertical Datatable' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={columns.map(col => ({
                        ...col,
                    }))}
                    options={{
                        scrollY: '350px',
                        scrollCollapse: true,
                        responsive: true,
                        paging: true,
                        pagingType: 'simple_numbers',
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table table-bordered dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    );
}

const AlternativePaginationDatatable = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Alternative Pagination Datatable' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={columns.map(col => ({
                        ...col,
                    }))}
                    options={{
                        responsive: true,
                        paging: true,
                        pagingType: 'simple_numbers',
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    )
}

const ScrollHorizontalDatatable = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Scroll Horizontal Datatable' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={columns.map(col => ({
                        ...col,
                    }))}
                    options={{
                        responsive: true,
                        paging: true,
                        scrollX: true,
                        pagingType: 'simple_numbers',
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    )
}

const ComplexHeaderDatatable = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Complex Header Datatable' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={[
                        { title: 'Name' },
                        { title: 'Position' },
                        { title: 'Salary' },
                        { title: 'Office' },
                        { title: 'Extn.' },
                    ]}
                    options={{
                        responsive: true,
                        paging: true,
                        scrollX: true,
                        pagingType: 'simple_numbers',
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    )
}

const RowCreatedCallback = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Row Created Callback' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={columns.map(col => ({
                        ...col,
                    }))}
                    options={{
                        responsive: true,
                        paging: true,
                        pagingType: 'simple_numbers',
                        rowCallback: function (row: HTMLTableRowElement, data: object) {
                            if (Array.isArray(data)) {
                                const salary = parseFloat((data[5] as string).replace(/[\$,]/g, ''));
                                if (salary > 150000) {
                                    row.cells[5].classList.add('text-danger');
                                }
                            }
                        },
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    )
}

const StateSaving = () => {
    return (
        <Col xs={12}>
            <CommonCard title='State Saving' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={columns.map(col => ({
                        ...col,
                    }))}
                    options={{
                        responsive: true,
                        stateSave: true,
                        paging: true,
                        pagingType: 'simple_numbers',
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    )
}

const FixedColumnsDataTable = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Fixed Columns DataTable' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={columns.map(col => ({
                        ...col,
                    }))}
                    options={{
                        responsive: true,
                        scrollY: '300px',
                        scrollX: true,
                        scrollCollapse: true,
                        paging: false,
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    )
}

const FixedHeaderDataTable = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Fixed Header DataTable' titleClass='mb-0'>
                <DataTable
                    data={Basicdata}
                    columns={columns.map(col => ({
                        ...col,
                    }))}
                    options={{
                        responsive: true,
                        paging: true,
                        scrollX: true,
                        pagingType: 'simple_numbers',
                        language: {
                            paginate: {
                                previous: ReactDOMServer.renderToStaticMarkup(<span>Previous</span>),
                                next: ReactDOMServer.renderToStaticMarkup(<span>Next</span>),
                            },
                        },
                    }}
                    className="table dt-responsive nowrap w-100"
                />
            </CommonCard>
        </Col>
    )
}

const DataTabels = () => {
    return (
        <>
            <Row>
                <BasicDatatable />
            </Row>
            <Row>
                <ButtonDataTabel />
            </Row>
            <Row>
                <KeyTableDatatable />
            </Row>
            <Row>
                <ResponsiveTableDatatable />
            </Row>
            <Row>
                <MultiItemSelectionDatatable />
            </Row>
            <Row>
                <ScrollVerticalDatatable />
            </Row>
            <Row>
                <AlternativePaginationDatatable />
            </Row>
            <Row>
                <ScrollHorizontalDatatable />
            </Row>
            <Row>
                <ComplexHeaderDatatable />
            </Row>
            <Row>
                <RowCreatedCallback />
            </Row>
            <Row>
                <StateSaving />
            </Row>
            <Row>
                <FixedColumnsDataTable />
            </Row>
            <Row>
                <FixedHeaderDataTable />
            </Row>
        </>
    )
}

export default DataTabels
