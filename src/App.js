import * as React from 'react';
import Dashboard from './Dashboard';
import { _WSConnection } from './common/setupWebSocket';

class App extends React.Component {
  state = {
    aqiData: {},
    isError: false
  }

  /**
   * Parse raw data from API.
   * @param {raw data} data 
   * @returns object with <city> : {aqis:[], updatedDates:[]}
   */
  parseData = (data) => {
    if (data && data.length > 0) {
      let newData = JSON.parse(data);
      const { aqiData } = this.state;
      let newParsed = newData.reduce((result, currentValue) => {
        let city = currentValue.city;
        let oldData = aqiData[city];
        result[city] = {
          updatedDates: oldData ? [new Date().toISOString(), ...oldData.updatedDates] : [new Date().toISOString()],
          aqis: oldData ? [currentValue.aqi, ...oldData.aqis] : [currentValue.aqi]
        }
        return result
      }, {})
      if (!Object.keys(aqiData).length) {
        return newParsed;
      }
      return Object.assign({}, aqiData, newParsed);
    }
  }

  /**
   * Handle Result getting from ws.
   * @param {result data set} result 
   */
  handleDataUpdate = (result) => {
    let updatedData = this.parseData(result.data)
    this.setState({ aqiData: updatedData, isError: false })
  }

  componentDidMount() {
    _WSConnection.connect(
      this.handleDataUpdate,
      () => this.setState({ isError: true })
    )
  }

  render() {
    return (
      <Dashboard data={this.state.aqiData} isError={this.state.isError} />
    )
  }
}


export default App;