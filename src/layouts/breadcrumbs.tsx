import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Breadcrumb } from 'antd';
import { menus } from '../config/menu';
import { createBP } from '../utils';
const men = JSON.parse(JSON.stringify(menus));
const m = createBP(men);
export default withBreadcrumbs(m)(({ breadcrumbs }) => {
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {breadcrumbs.map((breadcrumb, index) => (
        <Breadcrumb.Item key={index}>{breadcrumb.title}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
});
