import type { ReactNode } from 'react'
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'

type CommonCardProps = {
    title: string
    children: ReactNode
    CardClass?: string
    titleClass?: string
}

const CommonCard = ({ title, children, CardClass, titleClass }: CommonCardProps) => {
    const combinedTitleClass = `mb-0 ${titleClass || ''}`.trim()

    return (
        <Card className={CardClass}>
            <CardHeader>
                <CardTitle as="h5" className={combinedTitleClass}>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardBody>{children}</CardBody>
        </Card>
    )
}

export default CommonCard
