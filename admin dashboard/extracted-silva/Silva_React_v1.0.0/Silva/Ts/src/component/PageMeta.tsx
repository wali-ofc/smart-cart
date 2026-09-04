type Pagedata = {
  title: string
}
const PageMeta = ({ title }: Pagedata) => {
  return (
    <title>
      {title
        ? `${title} |  Smart Cart - Responsive Admin Dashboard Template`
        : " Smart Cart - Responsive Admin Dashboard Template"}
    </title>
  );
};

export default PageMeta;

