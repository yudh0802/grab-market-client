import './index.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { API_URL } from '../config/constants';
import { Carousel } from 'antd';

dayjs.extend(relativeTime);

// var query;
function MainPageComponent() {
    const [products, setProducts] = React.useState([]);
    const [banners, setBanners] = React.useState([]);
    // const [query, setQuery] = React.useState(null);

    // console.log('변수 상태의 query : ', query);
    React.useEffect(function () {
        axios
            .get(`${API_URL}/products`)
            .then(function (result) {
                console.log('이게 서버에서 받은 결과야: ', result);
                const products = result.data.products;
                // query = result.data.query;
                setProducts(products);
                // setQuery(potato);
            })
            .catch(function (err) {
                console.error('서버 통신부터 에러 발생 : ', err);
            });

        axios
            .get(`${API_URL}/banners`)
            .then((result) => {
                const banners = result.data.banners;
                setBanners(banners);
            })
            .catch((error) => {
                console.error('배너 에러 발생 : ', error);
            });
    }, []);

    // if (query === undefined) {
    //     return <h1>쿼리 받고 있다...</h1>;
    // }
    // var name = `${}`
    return (
        <div>
            <Carousel autoplay autoplaySpeed={3000}>
                {banners.map((banner, index) => {
                    return (
                        <Link to={banner.href}>
                            <div id="banner">
                                <img src={`${API_URL}/${banner.imageUrl}`} />
                            </div>
                        </Link>
                    );
                })}
            </Carousel>
            <h1 id="product-headline">판매되는 상품들</h1>
            <div id="product-list">
                {products.map(function (product, index) {
                    return (
                        <div className="product-card">
                            {product.soldout === 1 && <div className="product-blur" />}
                            <Link className="product-link" to={`/products/${product.id}`}>
                                <div>
                                    <img className="product-img" src={`${API_URL}/${product.imageUrl}`} />
                                </div>
                                <div className="product-contents">
                                    <span className="product-name">{product.name}</span>
                                    <span className="product-price">{product.price}원</span>
                                </div>
                                <div className="product-footer">
                                    <div className="product-seller">
                                        <img className="product-avatar" src="images/icons/avatar.png" />
                                        <span>{product.seller}</span>
                                        {/* <span>{query.name}</span> */}
                                    </div>
                                    <span className="product-date">{dayjs(product.createdAt).fromNow()}</span>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MainPageComponent;
