import { useParams } from 'react-router-dom';

function ProductPageComponent() {
    
    const { id } = useParams();

    return <h1>상품 상세 관련 {id} 상품 </h1>;
}

export default ProductPageComponent;
