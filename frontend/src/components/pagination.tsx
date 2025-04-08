interface PaginationProps {
    currPage: number;       // Current page number
    totalPages: number;     // Total number of pages
    pageSize: number;       // Number of items per page
    onPageChange: (newPage: number) => void; // Function to handle page change
    onPageSizeChange: (newSize: number) => void; // Function to handle page size change
}

const Pagination = ({ currPage, totalPages, pageSize, onPageChange, onPageSizeChange }: PaginationProps) => {
    // Calculate the start and end page for the current page group (1-10, 11-20, etc.)
    const pagesPerGroup = 10;
    const startPage = Math.floor((currPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const handlePageGroupChange = (direction: 'next' | 'prev') => {
        const newGroupStart = direction === 'next' ? startPage + pagesPerGroup : startPage - pagesPerGroup;
        if (newGroupStart > 0 && newGroupStart <= totalPages) {
            onPageChange(newGroupStart);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4"></h2>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <label htmlFor="pageSize" className="mr-2">Items per page:</label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={(e) => {
                            onPageSizeChange(Number(e.target.value));
                            onPageChange(1); // Reset to first page when page size changes
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <button onClick={() => onPageChange(currPage - 1)} disabled={currPage === 1}>
                        Previous
                    </button>
                    <span className="mx-2">{currPage} of {totalPages}</span>
                    <button onClick={() => onPageChange(currPage + 1)} disabled={currPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>

            <div className="flex justify-center mt-4">
                {/* Previous Group Button */}
                <button
                    onClick={() => handlePageGroupChange('prev')}
                    disabled={startPage === 1}
                    className="btn"
                >
                    Prev Group
                </button>

                {/* Page Buttons for the Current Group */}
                {[...Array(endPage - startPage + 1)].map((_, i) => {
                    const page = startPage + i;
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            disabled={currPage === page}
                            className={`btn ${currPage === page ? 'btn-active' : ''}`}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Next Group Button */}
                <button
                    onClick={() => handlePageGroupChange('next')}
                    disabled={endPage === totalPages}
                    className="btn"
                >
                    Next Group
                </button>
            </div>
        </div>
    );
};

export default Pagination;
