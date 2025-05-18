import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getProducts } from '../../redux/slices/productSlice';
import ProductCard from './ProductCard';
import Loader from '../ui/Loader';
import Message from '../ui/Message';
import Paginate from '../ui/Paginate';

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { products, page, pages, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  
  // Get search params
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  const pageNumber = searchParams.get('pageNumber') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  
  useEffect(() => {
    dispatch(getProducts({ keyword, pageNumber, category, minPrice, maxPrice }));
  }, [dispatch, keyword, pageNumber, category, minPrice, maxPrice]);
  
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <>
          {keyword && (
            <h2 className="text-xl mb-4">
              Search Results for "{keyword}"
              {products.length === 0 && ": No products found"}
            </h2>
          )}
          
          {category && (
            <h2 className="text-2xl font-semibold mb-4 capitalize">
              {category} Products
            </h2>
          )}
          
          {products.length > 0 ? (
            <>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
                category={category ? category : ''}
                minPrice={minPrice ? minPrice : ''}
                maxPrice={maxPrice ? maxPrice : ''}
              />
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">No products found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;