function getVariableDefinitions() {
  return [
    { variableId: 'last_command', name: 'Last command sent' },
    { variableId: 'last_status', name: 'Last response status' },
  ]
}

function updateVariableValues(instance, values = {}) {
  const payload = {}

  if ('last_command' in values) {
    payload.last_command = values.last_command
  }

  if ('last_status' in values) {
    payload.last_status = values.last_status
  }

  if (Object.keys(payload).length === 0) {
    payload.last_command = 'N/A'
    payload.last_status = 'N/A'
  }

  instance.setVariableValues(payload)
}

module.exports = {
  getVariableDefinitions,
  updateVariableValues,
}
