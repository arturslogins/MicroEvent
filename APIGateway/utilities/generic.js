const isCorrectUUID = (uuid) => {
  return /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4{1}[a-fA-F0-9]{3}-[89abAB]{1}[a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/.test(uuid)
}

module.exports = {
  isCorrectUUID
}