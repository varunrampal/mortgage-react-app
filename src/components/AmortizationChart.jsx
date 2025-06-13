import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AmortizationChart = ({ schedule }) => {
  // Format data for the chart
  const chartData = schedule.slice(0, 12).map((entry, index) => ({
    month: `M${index + 1}`,
    Principal: parseFloat(entry.principalPaid),
    Interest: parseFloat(entry.interestPaid),
  }));

  return (
    <div style={{ width: '100%', height: 300, marginTop: '30px' }}>
      <h3 style={{ textAlign: 'center', color:'#FFF' }}>First Year: Principal vs Interest</h3>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Principal" stackId="a" fill="#f5aa42" />
          <Bar dataKey="Interest" stackId="a" fill="#950110" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AmortizationChart;