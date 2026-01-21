function getConfigFields() {
  return [
    {
      type: 'textinput',
      id: 'host',
      label: 'Host (IP Address)',
      width: 12,
      default: '',
      required: true,
    },
  ]
}

module.exports = { getConfigFields }
