import './modal.scss';
import { getAQIClass } from './common/helper';

const AQIModal = ({ city, aqiDetails, onClose }) => {
  const renderAQIHistory = () => {
    return aqiDetails.aqis.map((aqi, idx) => {
      let dateTime = new Date(aqiDetails.updatedDates[idx]).toLocaleString();
      return (
        <tr key={idx}>
          <td className={getAQIClass(aqi)}>{aqi.toFixed(2)}</td>
          <td>{dateTime}</td>
        </tr>
      )
    })
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3 className="text-center">Air Quality Index for <span className="cityname">{city}</span></h3>
        <div className="scrollable">
          <table>
            <thead>
              <tr>
                <th>AQI</th>
                <th>Updated Date</th>
              </tr>
            </thead>
            <tbody>
              {renderAQIHistory()}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default AQIModal;