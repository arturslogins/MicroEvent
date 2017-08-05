import httpHandler from '@/utilities/httpHandler'

const getUserBehaviourStatistics = () => {
  return httpHandler.handler.get('/userbehaviour').then(response => {
    return httpHandler.handlePossibleAsyncResponse(response)
  })
}

const getStuffSample = () => {
  return httpHandler.handler.get('/stuff').then(response => {
    return httpHandler.handlePossibleAsyncResponse(response)
  })
}

export default {
  getStuffSample,
  getUserBehaviourStatistics
}
