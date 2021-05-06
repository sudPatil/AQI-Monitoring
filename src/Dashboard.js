import React, { useCallback, useState } from 'react';
import AQIModal from './AQIModal'
import { getAQIClass } from './common/helper';

const Dashboard = ({ data, isError }) => {
  const [city, setCity] = useState('')
  const renderRows = () => {
    return Object.keys(data).map((key) => {
      let aqiDateTime = new Date(data[key].updatedDates[0]);
      const timeElapsed = (new Date() - aqiDateTime) / 1000;
      let updatedBy = aqiDateTime.toLocaleTimeString('en-US')
      if (timeElapsed <= 60) {
        updatedBy = 'A few seconds ago'
      } else if (timeElapsed > 60 && timeElapsed < 120) {
        updatedBy = 'A Minute ago'
      }
      let aqi = (data[key].aqis[0]).toFixed(2);
      let aqiqualityClass = getAQIClass(aqi)

      return (
        <tr key={key}>
          <td><a onClick={() => setCity(key)} title="Click to see history" href="#">{key}</a></td>
          <td className={aqiqualityClass}>{aqi}</td>
          <td>{updatedBy}</td>
        </tr>
      )
    })
  }

  const onClose = useCallback(() => {
    setCity('')
  }, [])

  return (
    <div className="container">
      {isError && <div className='error'> Error to fetch latest data !!</div>}
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Current AQI</th>
            <th>Last Updated </th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
      {city && <AQIModal city={city} aqiDetails={data[city]} onClose={onClose} />}
    </div>
  )
}

export default Dashboard;