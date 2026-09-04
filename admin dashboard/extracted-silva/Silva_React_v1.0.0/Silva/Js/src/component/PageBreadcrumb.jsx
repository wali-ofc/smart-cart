import { Link } from "react-router-dom";
const PageBreadcrumb = ({
  title,
  PageTitle,
  SubTitlte
}) => {
  return <>
            <div className="py-3 d-flex align-items-sm-center flex-sm-row flex-column">
                <div className="flex-grow-1">
                    <h4 className="fs-18 fw-semibold m-0">{title}</h4>
                </div>

                {(PageTitle || SubTitlte) && <div className="text-end">
                        <ol className="breadcrumb m-0 py-0">
                            {PageTitle && <li className="breadcrumb-item">
                                    <Link to="javascript: void(0);">{PageTitle}</Link>
                                </li>}
                            {SubTitlte && <li className="breadcrumb-item active">{SubTitlte}</li>}
                        </ol>
                    </div>}
            </div>

        </>;
};
export default PageBreadcrumb;