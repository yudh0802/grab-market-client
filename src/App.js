import './App.css';
import MainPageComponent from './main/main.js';
import { Switch, Route } from 'react-router-dom';
import ProductPageComponent from './product';
import UploadPageComponent from './upload';

function App() {
    return (
        <div>
            <Switch>
                <Route exact={true} path="/">
                    <MainPageComponent />;
                </Route>
                <Route exact={true} path="/products/:id">
                    <ProductPageComponent />;
                </Route>
                <Route exact={true} path="/upload">
                    <UploadPageComponent />;
                </Route>
            </Switch>
        </div>
    );
}

export default App;
