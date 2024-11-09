import React, { useState, useEffect } from 'react';
import { formatNumber } from '../utils/formatters';
import './StockTable.css';

const StockTable = ({ stocks }) => {
  // State for pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // State for sorting
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'none' });

  // Store original stocks for resetting
  const [originalStocks, setOriginalStocks] = useState([...stocks]);

  useEffect(() => {
    setOriginalStocks([...stocks]);
  }, [stocks]);

  // Calculate total pages
  const totalPages = Math.ceil(stocks.length / itemsPerPage);

  // Function to handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') direction = 'descending';
      else if (sortConfig.direction === 'descending') direction = 'none';
    }
    setSortConfig({ key, direction });
  };

  // Function to sort stocks based on the sortConfig
  const sortedStocks = (() => {
    if (sortConfig.direction === 'none') {
      return originalStocks;
    }
    return [...stocks].sort((a, b) => {
      const valueA = parseFloat(a[sortConfig.key]) || 0;
      const valueB = parseFloat(b[sortConfig.key]) || 0;

      if (sortConfig.direction === 'ascending') {
        return valueA - valueB;
      } else if (sortConfig.direction === 'descending') {
        return valueB - valueA;
      }
      return 0;
    });
  })();

  // Slice sorted stocks for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStocks = sortedStocks.slice(startIndex, startIndex + itemsPerPage);

  // Handlers for pagination
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page on items change
  };

  // Helper function to get sorting icons
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '⇅';
    if (sortConfig.direction === 'ascending') return '▲';
    if (sortConfig.direction === 'descending') return '▼';
    return '⇅';
  };

  return (
    <div className="Query-results">
      <div className="stock-table-container">
        <div className="table-header">
          <h1>Query Results</h1>
          <button className="save-button">
            <span>💾</span> SAVE THIS QUERY
          </button>
        </div>

        <div className="table-controls">
          <div className="results-info">
            <span>
              {stocks.length} results found: Showing page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="pagination-controls">
            <span>Results per page: </span>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="stock-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th >
                  Ticker 
                </th>
                <th onClick={() => handleSort('Market Capitalization (B)')}>
                  Market Capitalization (Rs. Cr.) {getSortIcon('Market Capitalization (B)')}
                </th>
                <th onClick={() => handleSort('P/E Ratio')}>
                  P/E Ratio {getSortIcon('P/E Ratio')}
                </th>
                <th onClick={() => handleSort('ROE (%)')}>
                  ROE (%) {getSortIcon('ROE (%)')}
                </th>
                <th onClick={() => handleSort('Debt-to-Equity Ratio')}>
                  Debt-to-Equity {getSortIcon('Debt-to-Equity Ratio')}
                </th>
                <th onClick={() => handleSort('Dividend Yield (%)')}>
                  Dividend Yield (%) {getSortIcon('Dividend Yield (%)')}
                </th>
                <th onClick={() => handleSort('Revenue Growth (%)')}>
                  Revenue Growth (%) {getSortIcon('Revenue Growth (%)')}
                </th>
                <th onClick={() => handleSort('EPS Growth (%)')}>
                  EPS Growth (%) {getSortIcon('EPS Growth (%)')}
                </th>
                <th onClick={() => handleSort('Current Ratio')}>
                  Current Ratio {getSortIcon('Current Ratio')}
                </th>
                <th onClick={() => handleSort('Gross Margin (%)')}>
                  Gross Margin (%) {getSortIcon('Gross Margin (%)')}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedStocks.map((stock, index) => (
                <tr key={stock.Ticker}>
                  <td>{startIndex + index + 1}</td>
                  <td>{stock.Ticker}</td>
                  <td>{formatNumber(stock['Market Capitalization (B)'] * 1000)}</td>
                  <td>{formatNumber(stock['P/E Ratio'])}</td>
                  <td>{formatNumber(stock['ROE (%)'])}</td>
                  <td>{formatNumber(stock['Debt-to-Equity Ratio'])}</td>
                  <td>{formatNumber(stock['Dividend Yield (%)'])}</td>
                  <td>{formatNumber(stock['Revenue Growth (%)'])}</td>
                  <td>{formatNumber(stock['EPS Growth (%)'])}</td>
                  <td>{formatNumber(stock['Current Ratio'])}</td>
                  <td>{formatNumber(stock['Gross Margin (%)'])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="pagination-footer">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockTable;
