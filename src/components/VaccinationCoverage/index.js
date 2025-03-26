import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {lastSevenDaysVaccinationData} = props

  return (
    <ResponsiveContainer width={1000} height={300}>
      <BarChart
        data={lastSevenDaysVaccinationData}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vaccineDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="dose1" fill="#8884d8" />
        <Bar dataKey="dose2" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage
