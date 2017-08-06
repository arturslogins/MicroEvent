import httpHandler from '@/utilities/httpHandler'

const getLogs = (page) => {
  return httpHandler.handler.get('/logs/' + (page || 0)).then(response => {
    return httpHandler.handlePossibleAsyncResponse(response)
  })
}

export default {
  getLogs
}
