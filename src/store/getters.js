const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.userToken,
  name: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  userImg: state => state.user.userInfo.staffPhoto,
  departs: state => state.companyInfo.departs
}
export default getters
