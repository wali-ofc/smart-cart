

import Dashboard from "@/app/(admin)/dashboard/index/Index"
import { useSidebarTheme } from "../data"
// import "@/assets/css/icons-rtl.min.css"

const Index = () => {
    useSidebarTheme()
    return (
        <>
            <Dashboard />
        </>
    )
}

export default Index