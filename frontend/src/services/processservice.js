export default function prepareChartData(adviceData) {
  const parsePercentage = (value) => parseFloat((value || '').replace('%', '')) || 0;

  const pieChartData = [
    { name: "Equity", value: parsePercentage(adviceData.equity_percentage) },
    { name: "Fixed Income", value: parsePercentage(adviceData.fixed_income_percentage) },
    { name: "Commodities", value: parsePercentage(adviceData.commodities_percentage) },
    { name: "Cash", value: parsePercentage(adviceData.cash_percentage) },
  ];

  const initialEquity = parsePercentage(adviceData.equity_percentage);
  const lineChartData = Array.from({ length: 12 }, (_, i) => ({
    name: `Month ${i + 1}`,
    Equity: initialEquity + (Math.random() - 0.5) * 10, 
  }));

  return { pieChartData, lineChartData };
}
