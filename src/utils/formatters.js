export const formatNumber = (number, decimals = 2) => {
    if (number === null || number === undefined) return '-';
    return number.toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };
  
  export const formatPercentage = (value) => {
    if (value === null || value === undefined) return '-';
    return `${formatNumber(value)}%`;
  };
  
  export const formatCurrency = (value, currency = 'Rs.') => {
    if (value === null || value === undefined) return '-';
    return `${currency} ${formatNumber(value)}`;
  };