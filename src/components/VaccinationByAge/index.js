import {ResponsiveContainer, PieChart, Pie, Cell, Legend} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {VaccinationByAgeData} = props

  const colors = ['#fecba6', '#b3d23f', '#a44c9e', '#ff6347', '#4682b4'] // Add more colors if needed

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={VaccinationByAgeData}
            startAngle={0}
            endAngle={360}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
            nameKey="age"
          >
            {VaccinationByAgeData.map((entry, index) => (
              <Cell key={entry.age} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}

export default VaccinationByAge
