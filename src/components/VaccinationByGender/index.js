import {ResponsiveContainer, PieChart, Pie} from 'recharts'

const VaccinationByGender = props => {
  const {VaccinationByGenderData} = props
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={730} height={250}>
        <Pie
          data={VaccinationByGenderData}
          dataKey="count"
          nameKey="gender"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByGender
