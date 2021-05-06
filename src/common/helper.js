const getAQIClass = (aqi) => {
  if (aqi <= 50) {
    return 'good'
  }else if (aqi > 50 && aqi <= 100) {
    return 'satisfactory'
  } else if (aqi > 100 && aqi <= 200) {
    return 'moderate'
  } else if (aqi > 200 && aqi <= 300) {
    return 'poor'
  } else if (aqi > 300 && aqi <= 400) {
    return 'vpoor'
  } else if (aqi > 400 && aqi <= 500) {
    return 'severe'
  }
}

export {
  getAQIClass
}