// export const filterStocks = (stocks, filters) => {
//     // Apply each filter condition to the stocks
//     return stocks.filter(stock => {
//       return filters.every(filter => {
//         const { parameter, operator, value } = filter;
//         if (operator === '>') return stock[parameter] > value;
//         if (operator === '<') return stock[parameter] < value;
//         if (operator === '=') return stock[parameter] === value;
//       });
//     });
//   };
  