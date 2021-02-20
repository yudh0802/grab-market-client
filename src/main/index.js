import './index.css';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

function MainPageComponent() {
    const [products, setProducts] = React.useState([]);
    React.useEffect(function () {
        axios
            .get('https://59de359d-ce1f-4d33-9afc-ce76665e5305.mock.pstmn.io/products')
            .then(function (result) {
                const products = result.data.products;
                setProducts(products);
            })
            .catch(function (err) {
                console.error('에러 발생 : ', err);
            });
    }, []);
    return (
        <div>
            <div id="header">
                <div id="header-area">
                    <img src="images/icons/logo.png" />
                </div>
            </div>
            <div id="body">
                <div id="banner">
                    <img src="images/banners/banner1.png" />
                </div>
                <h1>판매되는 상품들</h1>
                <div id="product-list">
                    {products.map(function (product, index) {
                        return (
                            <div className="product-card">
                                <Link className="product-link" to={`/products/${index}`}>
                                    <div>
                                        <img className="product-img" src={product.imageUrl} />
                                    </div>
                                    <div className="product-contents">
                                        <span className="product-name">{product.name}</span>
                                        <span className="product-price">{product.price}원</span>
                                    </div>
                                    <div className="product-seller">
                                        <img className="product-avatar" src="images/icons/avatar.png" />
                                        <span>{product.seller}</span>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div id="footer"></div>
        </div>
    );
}

export default MainPageComponent;
