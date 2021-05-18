import { Result, Button } from 'antd';
import { Link } from 'umi';

const Nopage = ({ index = '/' }) => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
            <Button type="primary">
                <Link to={index}>回首页</Link>
            </Button>
        }
    />
);

export default Nopage;
