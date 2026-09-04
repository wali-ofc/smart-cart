import VerticalLayout from '@/layout/VerticalLayout';

const AppWrappersProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <VerticalLayout>{children}</VerticalLayout>
    )
}

export default AppWrappersProvider