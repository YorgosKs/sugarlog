import './Pagination.css';

const Pagination = (props) => {
  const pageNumbers = [];

  const numPages = Math.ceil(props.totalData / props.postsPerPage);

  for (let i = 1; i <= numPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination-container'>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              props.currentPage === number
                ? 'page-item active-link'
                : 'page-item'
            }
            onClick={() => props.paginate(number)}
          >
            <a href='#!' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
