import dayjs from 'dayjs'

export default {
  formOfEmployment: [
    { id: 1, name: '正式' },
    { id: 2, name: '非正式' }
  ],
  timeOfEntry: (time) => {
    return dayjs(time).format('YYYY-MM-DD')
  }
}
