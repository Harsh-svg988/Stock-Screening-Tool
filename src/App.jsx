import React, { useState, useEffect } from 'react';
import CreateSearchQuery from './components/CreateSearchQuery.jsx';
import StockTable from './components/StockTable.jsx';
import './App.css'
function App() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);

  // Fetch stocks from JSON
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('/stocks.json');
        const data = await response.json();
        setStocks(data);
        setFilteredStocks(data); // Initially, show all stocks
      } catch (error) {
        console.error('Error loading stocks:', error);
      }
    };
    fetchStocks();
  }, []);

  // Function to parse numeric values considering percentages
  const parseNumericValue = (value) => {
    if (typeof value === 'string' && value.endsWith('%')) {
      return parseFloat(value.slice(0, -1));
    }
    return parseFloat(value);
  };

  // Function to filter stocks based on query
  const runQuery = (query) => {
    if (!query) {
      setFilteredStocks(stocks); // If no query, show all stocks
      return;
    }

    // Split the query into individual conditions
    const conditions = query.split(' AND ').map((cond) => cond.trim());
    
    const filtered = stocks.filter((stock) => {
      return conditions.every((condition) => {
        // Parse the condition into components
        const matches = condition.match(/([^<>=]+)\s*([<>=])\s*(.+)/);
        if (!matches) return true; // Skip invalid conditions
        
        const [, key, operator, value] = matches;
        const trimmedKey = key.trim();
        
        // Map the query keys to actual stock object keys
        const keyMap = {
          'Market Capitalization': 'Market Capitalization (B)',
          'P/E Ratio': 'P/E Ratio',
          'ROE': 'ROE (%)',
          'Dividend Yield': 'Dividend Yield (%)',
          'Results': 'Results',
          'Debt-to-Equity':'Debt-to-Equity Ratio',
          'Revenue Growth':'Revenue Growth (%)',
          'EPS Growth':'EPS Growth (%)',
          'Current Ratio':'Current Ratio',
          'Gross Margin':'Gross Margin (%)'
        };

        const stockKey = keyMap[trimmedKey] || trimmedKey;
        const stockValue = stock[stockKey];
        
        // Handle the case where the stock value doesn't exist
        if (stockValue === undefined || stockValue === null) return false;

        // Parse the comparison value
        const comparisonValue = parseNumericValue(value);
        const stockNumericValue = parseNumericValue(stockValue);

        // Perform the comparison
        switch (operator) {
          case '>':
            return stockNumericValue > comparisonValue;
          case '<':
            return stockNumericValue < comparisonValue;
          case '=':
            return stockNumericValue === comparisonValue;
          default:
            return false;
        }
      });
    });

    setFilteredStocks(filtered);
  };

  return (
    <div className="App">
      <CreateSearchQuery runQuery={runQuery} />
      <StockTable stocks={filteredStocks} />
    </div>
  );
}

export default App;