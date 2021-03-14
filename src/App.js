import 'antd/dist/antd.css';
import './App.css';
import MainPageComponent from './main/index.js';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import ProductPageComponent from './product';
import UploadPageComponent from './upload';
import { Button } from 'antd';
import { CloudDownloadOutlined, DownloadOutlined } from '@ant-design/icons';

function App() {
    const history = useHistory();
    return (
        <div>
            <div id="header">
                <div id="header-area">
                    <Link to="/">
                        <img src="/images/icons/logo.png" />
                    </Link>
                    <Button
                        size="large"
                        onClick={function () {
                            history.push('/upload');
                        }}
                        icon={<DownloadOutlined />}
                    >
                        상품 업로드
                    </Button>
                </div>
            </div>
            <div id="body">
                <Switch>
                    <Route exact={true} path="/">
                        <MainPageComponent />
                    </Route>
                    <Route exact={true} path="/products/:id">
                        <ProductPageComponent />
                    </Route>
                    <Route exact={true} path="/upload">
                        <UploadPageComponent />
                    </Route>
                </Switch>
            </div>
            <div id="footer"></div>
        </div>
    );
}

export default App;
