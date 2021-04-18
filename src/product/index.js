import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './index.css';
import { API_URL } from '../config/constants';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { message } from 'antd';
import ProductCard from '../components/productCard';
import mixpanel from 'mixpanel-browser';

function ProductPageComponent() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    console.log('프로덕트 페이지에서의 product : ', product);

    const getProduct = () => {
        axios
            .get(`${API_URL}/products/${id}`)
            .then(function (result) {
                console.log(result);
                setProduct(result.data.product);
            })
            .catch(function (error) {
                console.error(error);
            });
    };
    const getRecommendations = () => {
        axios
            .get(`${API_URL}/products/${id}/recommendation`)
            .then((result) => {
                setProducts(result.data.products);
                console.log('추천 : ', result.data.products);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    useEffect(
        function () {
            mixpanel.track('PV : 상품상세');
            getProduct();
            getRecommendations();
        },
        [id]
    );

    if (product === null) {
        return <h1>상품 정보를 받고 있습니다..</h1>;
    }

    const onClickPurchase = () => {
        axios
            .post(`${API_URL}/purchase/${id}`)
            .then((result) => {
                getProduct();
                message.info('구매가 완료되었습니다');
            })
            .catch((error) => {
                message.error(`에러가 발생했습니다. ${error.message}`);
            });
        // mixpanel.track('Click : Purchase');
    };

    const onClickCancelPruchase = () => {
        axios
            .post(`${API_URL}/cancel/${id}`)
            .then((result) => {
                getProduct();
                message.info('구매가 취소되었습니다');
            })
            .catch((error) => {
                message.error(`구매 취소 에러가 발생했습니다. ${error.message}`);
            });
    };

    return (
        <div>
            <div id="image-box">
                <img src={`${API_URL}/${product.imageUrl}`} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" />
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createdAt">{dayjs(product.createdAt).format('YYYY년 MM월 DD일')}</div>
                <Button
                    id="purchase-button"
                    size="large"
                    type="primary"
                    onClick={onClickPurchase}
                    disabled={product.soldout === 1 ? true : false}
                >
                    {product.soldout === 1 ? `구매 완료` : `즉시 구매하기`}
                </Button>
                <Button size="small" type="primary" danger onClick={onClickCancelPruchase} disabled={product.soldout === 0 ? true : false}>
                    구매 취소
                </Button>
                <div id="description-box">
                    <pre id="description">{product.description}</pre>
                </div>
                <div>
                    <h1>추천 상품</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {products.map((product, index) => {
                            return <ProductCard key={index} product={product} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPageComponent;
