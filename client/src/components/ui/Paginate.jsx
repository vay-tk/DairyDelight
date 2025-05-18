import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, keyword = '', category = '', minPrice = '', maxPrice = '' }) => {
  if (pages <= 1) {
    return null;
  }

  // Build URL with all the relevant parameters
  const buildUrl = (pageNum) => {
    const params = new URLSearchParams();
    
    if (keyword) params.append('keyword', keyword);
    if (pageNum) params.append('pageNumber', pageNum);
    if (category) params.append('category', category);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    
    return `/?${params.toString()}`;
  };

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex">
        {/* Previous */}
        <li>
          <Link
            to={page > 1 ? buildUrl(page - 1) : '#'}
            className={`px-3 py-2 rounded-l-md border border-gray-300 ${
              page === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </Link>
        </li>
        
        {/* Page Numbers */}
        {[...Array(pages).keys()].map((x) => (
          <li key={x + 1}>
            <Link
              to={buildUrl(x + 1)}
              className={`px-3 py-2 border-t border-b border-gray-300 ${
                x + 1 === page
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {x + 1}
            </Link>
          </li>
        ))}
        
        {/* Next */}
        <li>
          <Link
            to={page < pages ? buildUrl(page + 1) : '#'}
            className={`px-3 py-2 rounded-r-md border border-gray-300 ${
              page === pages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Paginate;