import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const useSidebarTheme = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const isSideDark = pathname.includes('/demo/side-dark')
    const isSidebarRTL = pathname.includes('/demo/sidebar-rtl')

    document.body.setAttribute(
      'data-menu-color',
      isSideDark ? 'dark' : 'light'
    )

    document.body.setAttribute('data-sidebar', 'default')

    if (isSideDark) {
      document.body.classList.add('sidebar-dark')
    } else {
      document.body.classList.remove('sidebar-dark')
    }

    if (isSidebarRTL) {
      document.documentElement.setAttribute('dir', 'rtl')
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
    }

    return () => {
      document.body.removeAttribute('data-menu-color')
      document.body.removeAttribute('data-sidebar')
      document.body.classList.remove('sidebar-dark')
      document.documentElement.removeAttribute('dir')
    }
  }, [pathname])

  return {
    isSideDark: pathname.includes('/demo/side-dark'),
    isSidebarRTL: pathname.includes('/demo/sidebar-rtl'),
    pathname
  }
}
