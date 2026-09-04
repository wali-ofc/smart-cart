import Dashboard from "@/app/(admin)/dashboard/index/Index"
import { useSidebarTheme } from "../data"

const Index = () => {
    useSidebarTheme()
    return (
        <>
            <Dashboard />
        </>
    )
}

export default Index