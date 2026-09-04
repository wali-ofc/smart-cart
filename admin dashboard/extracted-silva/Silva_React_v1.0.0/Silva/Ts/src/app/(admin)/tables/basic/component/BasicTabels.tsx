import CommonCard from '@/component/CommonCard'
import { Col, Row } from 'react-bootstrap'

const BasicTabel = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Basic Example' titleClass='mb-0'>
                <div className="table-responsive">
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Warren Jackson</td>
                                <td>Jackson</td>
                                <td>336-508-2157</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Amy</td>
                                <td>Cunha</td>
                                <td>646-473-2057</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Steven</td>
                                <td>Loch</td>
                                <td>281-308-0793</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col >
    )
}

const HoverrabelRow = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Hoverable Table' titleClass="mb-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Warren Jackson</td>
                                <td>Jackson</td>
                                <td>336-508-2157</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Amy</td>
                                <td>Cunha</td>
                                <td>646-473-2057</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Steven</td>
                                <td>Loch</td>
                                <td>281-308-0793</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col>
    )
}

const StripedRows = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Striped Rows' titleClass='mb-0'>
                <div className="table-responsive">
                    <table className="table table-striped mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Warren Jackson</td>
                                <td>Jackson</td>
                                <td>336-508-2157</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Amy</td>
                                <td>Cunha</td>
                                <td>646-473-2057</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Steven</td>
                                <td>Loch</td>
                                <td>281-308-0793</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col >
    )
}
const StripedDarkRows = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Dark Table with Striped Rows' titleClass='mb-0'>
                <div className="table-responsive">
                    <table className="table table-dark table-striped mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Warren Jackson</td>
                                <td>Jackson</td>
                                <td>336-508-2157</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Amy</td>
                                <td>Cunha</td>
                                <td>646-473-2057</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Steven</td>
                                <td>Loch</td>
                                <td>281-308-0793</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col>
    )
}

const StripedColumnsDark = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Dark Table with Striped Columns' titleClass='mb-0'>
                <div className="table-responsive">
                    <table className="table table-dark table-striped-columns mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Warren Jackson</td>
                                <td>Jackson</td>
                                <td>336-508-2157</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Amy</td>
                                <td>Cunha</td>
                                <td>646-473-2057</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Steven</td>
                                <td>Loch</td>
                                <td>281-308-0793</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col>
    )
}

const StripedColumns = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Striped Columns' titleClass='mb-0'>

                <div className="table-responsive">
                    <table className="table table-striped-columns mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Warren Jackson</td>
                                <td>Jackson</td>
                                <td>336-508-2157</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Amy</td>
                                <td>Cunha</td>
                                <td>646-473-2057</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Steven</td>
                                <td>Loch</td>
                                <td>281-308-0793</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col>
    )
}

const ActiveTabels = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Active Table' titleClass='mb-0'>
                <div className="table-responsive">
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-active">
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan={2} className="table-active">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col >
    )
}

const BorderedTables = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Bordered Table' titleClass='mb-0' >
                <div className="table-responsive">
                    <table className="table table-bordered mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Warren Jackson</td>
                                <td>Jackson</td>
                                <td>336-508-2157</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Amy</td>
                                <td>Cunha</td>
                                <td>646-473-2057</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Steven</td>
                                <td>Loch</td>
                                <td>281-308-0793</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col >
    )
}

const ColoredBorderedTable = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Colored Bordered Table' titleClass='mb-0'>
                <div className="table-responsive">
                    <table className="table table-bordered border-primary mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Warren Jackson</td>
                                <td>Jackson</td>
                                <td>336-508-2157</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Amy</td>
                                <td>Cunha</td>
                                <td>646-473-2057</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Steven</td>
                                <td>Loch</td>
                                <td>281-308-0793</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col>
    )
}

const BorderlessTable = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Borderless Table' titleClass='mb-0'>
                <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Warren Jackson</td>
                                <td>Jackson</td>
                                <td>336-508-2157</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Amy</td>
                                <td>Cunha</td>
                                <td>646-473-2057</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Steven</td>
                                <td>Loch</td>
                                <td>281-308-0793</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col>
    )
}

const ColorsVariants = () => {
    return (

        <Col xl={6}>
            <CommonCard title='Colors Variants' titleClass='mb-0'>
                <div className="table-responsive">
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Class</th>
                                <th>Heading</th>
                                <th>Heading</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-light">
                                <th scope="row">1</th>
                                <td>Table light</td>
                                <td>Cell</td>
                                <td>Cell</td>
                            </tr>

                            <tr className="table-success">
                                <th scope="row">2</th>
                                <td>Table Success</td>
                                <td>Cell</td>
                                <td>Cell</td>
                            </tr>

                            <tr className="table-info">
                                <th scope="row">3</th>
                                <td>Table Info</td>
                                <td>Cell</td>
                                <td>Cell</td>
                            </tr>

                            <tr className="table-warning">
                                <th scope="row">4</th>
                                <td>Table Warning</td>
                                <td>Cell</td>
                                <td>Cell</td>
                            </tr>

                            <tr className="table-danger">
                                <th scope="row">5</th>
                                <td>Table Danger</td>
                                <td>Cell</td>
                                <td>Cell</td>
                            </tr>

                            <tr className="table-dark">
                                <th scope="row">6</th>
                                <td>Table Dark</td>
                                <td>Cell</td>
                                <td>Cell</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col>
    )
}

const NestingTable = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Nesting Table' titleClass='mb-0'>
                <div className="table-responsive">
                    <table className="table table-striped mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Warren Jackson</td>
                                <td>Jackson</td>
                                <td>336-508-2157</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <table className="table table-sm mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">First</th>
                                                <th scope="col">Last</th>
                                                <th scope="col">Handle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Warren Jackson</td>
                                                <td>Jackson</td>
                                                <td>336-508-2157</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>Amy</td>
                                                <td>Cunha</td>
                                                <td>646-473-2057</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Amy</td>
                                <td>Cunha</td>
                                <td>646-473-2057</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Steven</td>
                                <td>Loch</td>
                                <td>281-308-0793</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col>
    )
}
const Responsive = () => {
    return (
        <Col xs={12}>
            <CommonCard title='Always Responsive' titleClass='mb-0'>
                <div className="table-responsive">
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Heading</th>
                                <th scope="col">Heading</th>
                                <th scope="col">Heading</th>
                                <th scope="col">Heading</th>
                                <th scope="col">Heading</th>
                                <th scope="col">Heading</th>
                                <th scope="col">Heading</th>
                                <th scope="col">Heading</th>
                                <th scope="col">Heading</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                                <td>Cell</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col>
    )
}

const SmallTabel = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Small Tables' titleClass='mb-0'>
                <table className="table table-sm mb-0">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Warren Jackson</td>
                            <td>Jackson</td>
                            <td>336-508-2157</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Amy</td>
                            <td>Cunha</td>
                            <td>646-473-2057</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Steven</td>
                            <td>Loch</td>
                            <td>281-308-0793</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Steven</td>
                            <td>Loch</td>
                            <td>281-308-0793</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>Steven</td>
                            <td>Loch</td>
                            <td>281-308-0793</td>
                        </tr>
                    </tbody>
                </table>
            </CommonCard>
        </Col>
    )
}

const GroupDividers = () => {
    return (
        <Col xl={6}>
            <CommonCard title='Group Dividers Table' titleClass='mb-0'>
                <div className="table-responsive">
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            <tr>
                                <th scope="row">1</th>
                                <td>Warren Jackson</td>
                                <td>Jackson</td>
                                <td>336-508-2157</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Amy</td>
                                <td>Cunha</td>
                                <td>646-473-2057</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Steven</td>
                                <td>Loch</td>
                                <td>281-308-0793</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CommonCard>
        </Col >
    )
}

const BasicTabels = () => {
    return (
        <>
            <Row>
                <BasicTabel />
                <HoverrabelRow />
                <StripedRows />
                <StripedDarkRows />
                <StripedColumnsDark />
                <StripedColumns />
                <ActiveTabels />
                <BorderedTables />
                <ColoredBorderedTable />
                <BorderlessTable />
                <ColorsVariants />
                <NestingTable />
                <Responsive />
            </Row>
            <Row>
                <SmallTabel />
                <GroupDividers />
            </Row>

        </>
    )
}

export default BasicTabels