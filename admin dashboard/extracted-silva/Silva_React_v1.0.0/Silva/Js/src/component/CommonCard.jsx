import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
const CommonCard = ({
  title,
  children,
  CardClass,
  titleClass
}) => {
  const combinedTitleClass = `mb-0 ${titleClass || ''}`.trim();
  return <Card className={CardClass}>
            <CardHeader>
                <CardTitle as="h5" className={combinedTitleClass}>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardBody>{children}</CardBody>
        </Card>;
};
export default CommonCard;