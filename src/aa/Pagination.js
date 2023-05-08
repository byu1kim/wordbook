const Pagination = ({ total, limit, page, setPage }) => {
  // Total number of pages
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <div className="pagination">
        <button
          className="arrow"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <button
          className="arrow"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="pages">
          {Array(numPages)
            .fill()
            .map((_, i) => (
              <button
                className="page"
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}
              >
                {i + 1}
              </button>
            ))}
        </div>
        <button
          className="arrow"
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <button
          className="arrow"
          onClick={() => setPage(numPages)}
          disabled={page === numPages}
        >
          <i className="fa-solid fa-caret-right"></i>
        </button>
      </div>
    </>
  );
};

Pagination.defaultProps = {
  total: 0,
  limit: 100,
  page: 1,
  setPage: 1,
};

export default Pagination;
