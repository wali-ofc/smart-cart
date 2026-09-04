type Pagedata = {
  title: string
}
const PageMeta = ({ title }: Pagedata) => {
  return (
    <title>
      {title
        ? `${title} |  Silva - Responsive Admin Dashboard Template`
        : " Silva - Responsive Admin Dashboard Template"}
    </title>
  );
};

export default PageMeta;
