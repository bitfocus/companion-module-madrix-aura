const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const { getConfigFields } = require('./config')
const { getActionDefinitions } = require('./actions')
const { getVariableDefinitions, updateVariableValues } = require('./variables')
const { UpgradeScripts } = require('./upgrades')

class ModuleInstance extends InstanceBase {
  constructor(internal) {
    super(internal)
    this.playbackState = null
  }

  async init(config) {
    this.config = config
    this.updateStatus(InstanceStatus.Ok)
    this.initActions()
    this.initVariables()
  }

  async destroy() {
    // nothing to clean up yet
  }

  getConfigFields() {
    return getConfigFields()
  }

  async configUpdated(config) {
    this.config = config
    this.initActions()
  }

  initActions() {
    this.setActionDefinitions(getActionDefinitions(this))
  }

  initVariables() {
    this.setVariableDefinitions(getVariableDefinitions())
    updateVariableValues(this)
  }

  async sendCommand(command, value) {
    if (!this.config?.host) {
      throw new Error('Host is not configured')
    }

    let host = this.config.host.trim()
    host = host.replace(/^https?:\/\//, '').replace(/\/+$/, '')

    if (!host) {
      throw new Error('Host is not configured')
    }

    const query = value !== undefined ? `${command}=${value}` : command
    const url = `http://${host}/remote.cgi?${query}`

    this.log('debug', `Sending command: ${url}`)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Companion-Module/1.0',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`)
      }

      updateVariableValues(this, {
        last_command: query,
        last_status: `HTTP ${response.status}`,
      })
    } catch (error) {
      this.log('error', `Failed to send command: ${error.message}`)
      throw error
    }
  }
}

module.exports = ModuleInstance

runEntrypoint(ModuleInstance, UpgradeScripts)
