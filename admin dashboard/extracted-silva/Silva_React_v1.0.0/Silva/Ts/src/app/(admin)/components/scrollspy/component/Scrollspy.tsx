import CommonCard from '@/component/CommonCard'
import { Link } from "react-router-dom"
import { Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavLink, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const Scrollspy = () => {
    const [activeNavItem, setActiveNavItem] = useState('#scrollspyHeading1')
    const [activeNestedItem, setActiveNestedItem] = useState('#item-1')
    const [activeListItem, setActiveListItem] = useState('#list-item-1')
    const [activeSimpleItem, setActiveSimpleItem] = useState('#simple-list-item-1')

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLElement>, target: string, setActive: (item: string) => void) => {
        e.preventDefault()
        setActive(target)

        // Scroll to the target element smoothly within the container
        const container = e.currentTarget.closest('.row')?.querySelector('[data-bs-spy="scroll"]') as HTMLElement
        const targetElement = container?.querySelector(target) as HTMLElement

        if (container && targetElement) {
            const containerRect = container.getBoundingClientRect()
            const targetRect = targetElement.getBoundingClientRect()
            const scrollTop = container.scrollTop + (targetRect.top - containerRect.top)

            container.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            })
        }
    }

    const handleDropdownClick = (e: React.MouseEvent<HTMLElement>, target: string) => {
        e.preventDefault()
        setActiveNavItem(target)

        // Scroll to the target element smoothly within the container
        const container = e.currentTarget.closest('.row')?.querySelector('[data-bs-spy="scroll"]') as HTMLElement
        const targetElement = container?.querySelector(target) as HTMLElement

        if (container && targetElement) {
            const containerRect = container.getBoundingClientRect()
            const targetRect = targetElement.getBoundingClientRect()
            const scrollTop = container.scrollTop + (targetRect.top - containerRect.top)

            container.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            })
        }
    }

    const setupScrollSpy = (containerId: string, setActive: (item: string) => void) => {
        const container = document.querySelector(containerId) as HTMLElement
        if (!container) return

        const handleScroll = () => {
            const sections = container.querySelectorAll('[id^="scrollspyHeading"], [id^="item-"], [id^="list-item-"], [id^="simple-list-item-"]')
            let currentActive = ''

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect()
                const containerRect = container.getBoundingClientRect()

                if (rect.top <= containerRect.top + 100 && rect.bottom > containerRect.top + 100) {
                    currentActive = `#${section.id}`
                }
            })

            if (currentActive) {
                setActive(currentActive)
            }
        }

        container.addEventListener('scroll', handleScroll)
        return () => container.removeEventListener('scroll', handleScroll)
    }

    useEffect(() => {
        const cleanups = [
            setupScrollSpy('[data-bs-spy="scroll"]', setActiveNavItem),
            setupScrollSpy('#navbar-example3 + div [data-bs-spy="scroll"]', setActiveNestedItem),
            setupScrollSpy('#list-example + div [data-bs-spy="scroll"]', setActiveListItem),
            setupScrollSpy('#simple-list-example + div [data-bs-spy="scroll"]', setActiveSimpleItem),
        ]

        return () => {
            cleanups.forEach(cleanup => cleanup && cleanup())
        }
    }, [])

    return (
        <Row>
            <Col xl={6}>
                <CommonCard title='Navbar Example' titleClass='mb-0'>
                    <nav id="navbar-example2" className="navbar bg-light px-3 rounded">
                        <Link className="navbar-brand" to="#" onClick={(e) => e.preventDefault()}>Navbar</Link>
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${activeNavItem === '#scrollspyHeading1' ? 'active' : ''}`}
                                    to="#scrollspyHeading1"
                                    onClick={(e) => handleNavClick(e, '#scrollspyHeading1', setActiveNavItem)}
                                >
                                    First
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${activeNavItem === '#scrollspyHeading2' ? 'active' : ''}`}
                                    to="#scrollspyHeading2"
                                    onClick={(e) => handleNavClick(e, '#scrollspyHeading2', setActiveNavItem)}
                                >
                                    Second
                                </Link>
                            </li>
                            <Dropdown className="nav-item">
                                <DropdownToggle as="a" className="nav-link dropdown-toggle arrow-none" href="#" role="button"
                                    aria-haspopup="true" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                    Dropdown
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem
                                        href="#scrollspyHeading3"
                                        onClick={(e) => handleDropdownClick(e, '#scrollspyHeading3')}
                                    >
                                        one
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#scrollspyHeading4"
                                        onClick={(e) => handleDropdownClick(e, '#scrollspyHeading4')}
                                    >
                                        two
                                    </DropdownItem>
                                    <DropdownDivider role="separator" className="dropdown-divider" />
                                    <DropdownItem
                                        href="#scrollspyHeading5"
                                        onClick={(e) => handleDropdownClick(e, '#scrollspyHeading5')}
                                    >
                                        three
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </ul>
                    </nav>
                    <div data-bs-spy="scroll" className="scrollspy-example bg-body-tertiary p-3 rounded" style={{ overflowY: "auto" }}>
                        <h4 id="scrollspyHeading1">First heading</h4>
                        <p>This is some placeholder content for the scrollspy page.
                            Note that as you scroll down the page, the appropriate
                            navigation link is highlighted. It's repeated throughout
                            the component example. We keep adding some more example
                            copy here to emphasize the scrolling and highlighting.</p>
                        <h4 id="scrollspyHeading2">Second heading</h4>
                        <p>This is some placeholder content for the scrollspy page.
                            Note that as you scroll down the page, the appropriate
                            navigation link is highlighted. It's repeated throughout
                            the component example. We keep adding some more example
                            copy here to emphasize the scrolling and highlighting.</p>
                        <h4 id="scrollspyHeading3">Third heading</h4>
                        <p>This is some placeholder content for the scrollspy page.
                            Note that as you scroll down the page, the appropriate
                            navigation link is highlighted. It's repeated throughout
                            the component example. We keep adding some more example
                            copy here to emphasize the scrolling and highlighting.</p>
                        <h4 id="scrollspyHeading4">Fourth heading</h4>
                        <p>This is some placeholder content for the scrollspy page.
                            Note that as you scroll down the page, the appropriate
                            navigation link is highlighted. It's repeated throughout
                            the component example. We keep adding some more example
                            copy here to emphasize the scrolling and highlighting.</p>
                        <h4 id="scrollspyHeading5">Fifth heading</h4>
                        <p>This is some placeholder content for the scrollspy page.
                            Note that as you scroll down the page, the appropriate
                            navigation link is highlighted. It's repeated throughout
                            the component example. We keep adding some more example
                            copy here to emphasize the scrolling and highlighting.</p>
                    </div>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title='Nested Nav' titleClass='mb-0'>
                    <Row>
                        <Col xs={4}>
                            <Nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
                                <Nav className="nav nav-pills flex-column">
                                    <NavLink
                                        href="#item-1"
                                        className={activeNestedItem === '#item-1' ? 'active' : ''}
                                        onClick={(e) => handleNavClick(e, '#item-1', setActiveNestedItem)}
                                    >
                                        Item 1
                                    </NavLink>
                                    <Nav className="nav nav-pills flex-column">
                                        <NavLink
                                            className={`ms-3 my-1 ${activeNestedItem === '#item-1-1' ? 'active' : ''}`}
                                            href="#item-1-1"
                                            onClick={(e) => handleNavClick(e, '#item-1-1', setActiveNestedItem)}
                                        >
                                            Item 1-1
                                        </NavLink>
                                        <NavLink
                                            className={`ms-3 my-1 ${activeNestedItem === '#item-1-2' ? 'active' : ''}`}
                                            href="#item-1-2"
                                            onClick={(e) => handleNavClick(e, '#item-1-2', setActiveNestedItem)}
                                        >
                                            Item 1-2
                                        </NavLink>
                                    </Nav>
                                    <NavLink
                                        href="#item-2"
                                        className={activeNestedItem === '#item-2' ? 'active' : ''}
                                        onClick={(e) => handleNavClick(e, '#item-2', setActiveNestedItem)}
                                    >
                                        Item 2
                                    </NavLink>
                                    <NavLink
                                        href="#item-3"
                                        className={activeNestedItem === '#item-3' ? 'active' : ''}
                                        onClick={(e) => handleNavClick(e, '#item-3', setActiveNestedItem)}
                                    >
                                        Item 3
                                    </NavLink>
                                    <Nav className="nav-pills flex-column">
                                        <NavLink
                                            className={`ms-3 my-1 ${activeNestedItem === '#item-3-1' ? 'active' : ''}`}
                                            href="#item-3-1"
                                            onClick={(e) => handleNavClick(e, '#item-3-1', setActiveNestedItem)}
                                        >
                                            Item 3-1
                                        </NavLink>
                                        <NavLink
                                            className={`ms-3 my-1 ${activeNestedItem === '#item-3-2' ? 'active' : ''}`}
                                            href="#item-3-2"
                                            onClick={(e) => handleNavClick(e, '#item-3-2', setActiveNestedItem)}
                                        >
                                            Item 3-2
                                        </NavLink>
                                    </Nav>
                                </Nav>
                            </Nav>
                        </Col>
                        <Col xs={8}>
                            <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true"
                                className="scrollspy-example" style={{ height: "350px", overflowY: "auto" }} tabIndex={0}>
                                <div id="item-1">
                                    <h4>Item 1</h4>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                        the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                        We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                    <p>Keep in mind that the JavaScript plugin tries to pick the right element among all that
                                        may be visible. Multiple visible scrollspy targets at the same time may cause some issues.</p>
                                </div>
                                <div id="item-1-1">
                                    <h5>Item 1-1</h5>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                        the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                        We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                </div>
                                <div id="item-1-2">
                                    <h5>Item 1-2</h5>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                        the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                        We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                </div>
                                <div id="item-2">
                                    <h4>Item 2</h4>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                        the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                        We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                </div>
                                <div id="item-3">
                                    <h4>Item 3</h4>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                        the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                        We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                </div>
                                <div id="item-3-1">
                                    <h5>Item 3-1</h5>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                        the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                        We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                </div>
                                <div id="item-3-2">
                                    <h5>Item 3-2</h5>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                        the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                        We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title='List group' titleClass='mb-0'>
                    <Row>
                        <Col xs={4}>
                            <div id="list-example" className="list-group">
                                <Link
                                    className={`list-group-item list-group-item-action ${activeListItem === '#list-item-1' ? 'active' : ''}`}
                                    to="#list-item-1"
                                    onClick={(e) => handleNavClick(e, '#list-item-1', setActiveListItem)}
                                >
                                    Item 1
                                </Link>
                                <Link
                                    className={`list-group-item list-group-item-action ${activeListItem === '#list-item-2' ? 'active' : ''}`}
                                    to="#list-item-2"
                                    onClick={(e) => handleNavClick(e, '#list-item-2', setActiveListItem)}
                                >
                                    Item 2
                                </Link>
                                <Link
                                    className={`list-group-item list-group-item-action ${activeListItem === '#list-item-3' ? 'active' : ''}`}
                                    to="#list-item-3"
                                    onClick={(e) => handleNavClick(e, '#list-item-3', setActiveListItem)}
                                >
                                    Item 3
                                </Link>
                                <Link
                                    className={`list-group-item list-group-item-action ${activeListItem === '#list-item-4' ? 'active' : ''}`}
                                    to="#list-item-4"
                                    onClick={(e) => handleNavClick(e, '#list-item-4', setActiveListItem)}
                                >
                                    Item 4
                                </Link>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true"
                                className="scrollspy-example" style={{ height: "350px", overflowY: "auto" }} tabIndex={0}>
                                <h4 id="list-item-1">Item 1</h4>
                                <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                    the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                    We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                <p>Keep in mind that the JavaScript plugin tries to pick the right element among all that
                                    may be visible. Multiple visible scrollspy targets at the same time may cause some issues.</p>
                                <h4 id="list-item-2">Item 2</h4>
                                <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                    the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                    We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                <p>Keep in mind that the JavaScript plugin tries to pick the right element among all that
                                    may be visible. Multiple visible scrollspy targets at the same time may cause some issues.</p>
                                <h4 id="list-item-3">Item 3</h4>
                                <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                    the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                    We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                <p>Keep in mind that the JavaScript plugin tries to pick the right element among all that
                                    may be visible. Multiple visible scrollspy targets at the same time may cause some issues.</p>
                                <h4 id="list-item-4">Item 4</h4>
                                <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                    the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                    We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                <p>Keep in mind that the JavaScript plugin tries to pick the right element among all that
                                    may be visible. Multiple visible scrollspy targets at the same time may cause some issues.</p>
                            </div>
                        </Col>
                    </Row>
                </CommonCard>
            </Col>

            <Col xl={6}>
                <CommonCard title='Simple Anchors' titleClass='mb-0'>
                    <Row>
                        <Col xs={4}>
                            <div id="simple-list-example" className="d-flex flex-column gap-2 simple-list-example-scrollspy text-center">
                                <Link
                                    className={`p-1 rounded ${activeSimpleItem === '#simple-list-item-1' ? 'active bg-primary text-white' : ''}`}
                                    to="#simple-list-item-1"
                                    onClick={(e) => handleNavClick(e, '#simple-list-item-1', setActiveSimpleItem)}
                                >
                                    Item 1
                                </Link>
                                <Link
                                    className={`p-1 rounded ${activeSimpleItem === '#simple-list-item-2' ? 'active bg-primary text-white' : ''}`}
                                    to="#simple-list-item-2"
                                    onClick={(e) => handleNavClick(e, '#simple-list-item-2', setActiveSimpleItem)}
                                >
                                    Item 2
                                </Link>
                                <Link
                                    className={`p-1 rounded ${activeSimpleItem === '#simple-list-item-3' ? 'active bg-primary text-white' : ''}`}
                                    to="#simple-list-item-3"
                                    onClick={(e) => handleNavClick(e, '#simple-list-item-3', setActiveSimpleItem)}
                                >
                                    Item 3
                                </Link>
                                <Link
                                    className={`p-1 rounded ${activeSimpleItem === '#simple-list-item-4' ? 'active bg-primary text-white' : ''}`}
                                    to="#simple-list-item-4"
                                    onClick={(e) => handleNavClick(e, '#simple-list-item-4', setActiveSimpleItem)}
                                >
                                    Item 4
                                </Link>
                                <Link
                                    className={`p-1 rounded ${activeSimpleItem === '#simple-list-item-5' ? 'active bg-primary text-white' : ''}`}
                                    to="#simple-list-item-5"
                                    onClick={(e) => handleNavClick(e, '#simple-list-item-5', setActiveSimpleItem)}
                                >
                                    Item 5
                                </Link>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true"
                                className="scrollspy-example" style={{ height: "350px", overflowY: "auto" }} tabIndex={0}>
                                <h4 id="simple-list-item-1">Item 1</h4>
                                <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                    the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                    We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                <h4 id="simple-list-item-2">Item 2</h4>
                                <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                    the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                    We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                <h4 id="simple-list-item-3">Item 3</h4>
                                <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                    the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                    We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                <h4 id="simple-list-item-4">Item 4</h4>
                                <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                    the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                    We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                <h4 id="simple-list-item-5">Item 5</h4>
                                <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page,
                                    the appropriate navigation link is highlighted. It's repeated throughout the component example.
                                    We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                            </div>
                        </Col>
                    </Row>
                </CommonCard>
            </Col>
        </Row>
    )
}

export default Scrollspy
