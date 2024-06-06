import moment from "moment"

export const ageCalculator = (date) => {
  const diff = moment(date).diff(moment(), 'milliseconds');
  const duration = moment.duration(diff);

  return duration.years().toString().replace('-', '')
}