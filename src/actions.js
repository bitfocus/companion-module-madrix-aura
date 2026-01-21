function getActionDefinitions(instance) {
  const actions = {}

  actions.playback_state = {
    name: 'Playback State',
    description: 'Control playback: set a specific state or toggle between two states',
    options: [
      {
        type: 'dropdown',
        id: 'mode',
        label: 'Mode',
        choices: [
          { id: 'set', label: 'Set State' },
          { id: 'toggle', label: 'Toggle Between States' },
        ],
        default: 'set',
      },
      {
        type: 'dropdown',
        id: 'state',
        label: 'State',
        choices: [
          { id: 'play', label: 'Play' },
          { id: 'pause', label: 'Pause' },
          { id: 'stop', label: 'Stop' },
        ],
        default: 'play',
        isVisible: (options) => options.mode === 'set',
      },
      {
        type: 'dropdown',
        id: 'toggle_state1',
        label: 'Toggle State 1',
        choices: [
          { id: 'play', label: 'Play' },
          { id: 'pause', label: 'Pause' },
          { id: 'stop', label: 'Stop' },
        ],
        default: 'play',
        isVisible: (options) => options.mode === 'toggle',
      },
      {
        type: 'dropdown',
        id: 'toggle_state2',
        label: 'Toggle State 2',
        choices: [
          { id: 'play', label: 'Play' },
          { id: 'pause', label: 'Pause' },
          { id: 'stop', label: 'Stop' },
        ],
        default: 'pause',
        isVisible: (options) => options.mode === 'toggle',
      },
    ],
    callback: async (action) => {
      if (action.options.mode === 'set') {
        await instance.sendCommand(action.options.state)
      } else {
        if (!instance.playbackState) {
          instance.playbackState = action.options.toggle_state1
        }

        if (instance.playbackState === action.options.toggle_state1) {
          instance.playbackState = action.options.toggle_state2
        } else {
          instance.playbackState = action.options.toggle_state1
        }

        await instance.sendCommand(instance.playbackState)
      }
    },
  }

  actions.intensity = {
    name: 'Intensity',
    description: 'Control master intensity: set to a specific value, increase, or decrease',
    options: [
      {
        type: 'dropdown',
        id: 'mode',
        label: 'Mode',
        choices: [
          { id: 'set', label: 'Set Value' },
          { id: 'increase', label: 'Increase' },
          { id: 'decrease', label: 'Decrease' },
        ],
        default: 'set',
      },
      {
        type: 'number',
        id: 'value',
        label: 'Value',
        min: 0,
        max: 255,
        default: 255,
        isVisible: (options) => options.mode === 'set',
      },
      {
        type: 'number',
        id: 'step',
        label: 'Step Value',
        min: 0,
        max: 255,
        default: 26,
        isVisible: (options) => options.mode === 'increase' || options.mode === 'decrease',
      },
    ],
    callback: async (action) => {
      if (action.options.mode === 'set') {
        await instance.sendCommand('intensity', action.options.value)
      } else if (action.options.mode === 'increase') {
        await instance.sendCommand('intensityinc', action.options.step)
      } else {
        await instance.sendCommand('intensitydec', action.options.step)
      }
    },
  }

  actions.speed = {
    name: 'Speed',
    description: 'Control playback speed: set to a specific value, increase, or decrease',
    options: [
      {
        type: 'dropdown',
        id: 'mode',
        label: 'Mode',
        choices: [
          { id: 'set', label: 'Set Value' },
          { id: 'increase', label: 'Increase' },
          { id: 'decrease', label: 'Decrease' },
        ],
        default: 'set',
      },
      {
        type: 'number',
        id: 'value',
        label: 'Value',
        min: 0,
        max: 255,
        default: 100,
        isVisible: (options) => options.mode === 'set',
      },
      {
        type: 'number',
        id: 'step',
        label: 'Step Value',
        min: 0,
        max: 255,
        default: 10,
        isVisible: (options) => options.mode === 'increase' || options.mode === 'decrease',
      },
    ],
    callback: async (action) => {
      if (action.options.mode === 'set') {
        await instance.sendCommand('speed', action.options.value)
      } else if (action.options.mode === 'increase') {
        await instance.sendCommand('speedinc', action.options.step)
      } else {
        await instance.sendCommand('speeddec', action.options.step)
      }
    },
  }

  actions.cue = {
    name: 'Specific Cue',
    description: 'Jump to a specific cue number',
    options: [
      {
        type: 'number',
        id: 'value',
        label: 'Cue Number',
        min: 1,
        max: 255,
        default: 1,
      },
    ],
    callback: async (action) => {
      await instance.sendCommand('cue', action.options.value)
    },
  }

  actions.previous_cue = {
    name: 'Previous Cue',
    description: 'Go to the previous cue',
    options: [],
    callback: async () => {
      await instance.sendCommand('previous')
    },
  }

  actions.next_cue = {
    name: 'Next Cue',
    description: 'Go to the next cue',
    options: [],
    callback: async () => {
      await instance.sendCommand('next')
    },
  }

  actions.record = {
    name: 'Record',
    description: 'Start/stop recording',
    options: [],
    callback: async () => {
      await instance.sendCommand('record')
    },
  }

  actions.group_intensity = {
    name: 'Group Intensity',
    description: 'Control intensity for a specific group (1-8): set to a specific value, increase, or decrease',
    options: [
      {
        type: 'dropdown',
        id: 'group',
        label: 'Group',
        choices: [
          { id: '1', label: 'Group 1' },
          { id: '2', label: 'Group 2' },
          { id: '3', label: 'Group 3' },
          { id: '4', label: 'Group 4' },
          { id: '5', label: 'Group 5' },
          { id: '6', label: 'Group 6' },
          { id: '7', label: 'Group 7' },
          { id: '8', label: 'Group 8' },
        ],
        default: '1',
      },
      {
        type: 'dropdown',
        id: 'mode',
        label: 'Mode',
        choices: [
          { id: 'set', label: 'Set Value' },
          { id: 'increase', label: 'Increase' },
          { id: 'decrease', label: 'Decrease' },
        ],
        default: 'set',
      },
      {
        type: 'number',
        id: 'value',
        label: 'Value',
        min: 0,
        max: 255,
        default: 100,
        isVisible: (options) => options.mode === 'set',
      },
      {
        type: 'number',
        id: 'step',
        label: 'Step Value',
        min: 0,
        max: 255,
        default: 26,
        isVisible: (options) => options.mode === 'increase' || options.mode === 'decrease',
      },
    ],
    callback: async (action) => {
      const group = action.options.group

      if (action.options.mode === 'set') {
        await instance.sendCommand(`group${group}`, action.options.value)
      } else if (action.options.mode === 'increase') {
        await instance.sendCommand(`group${group}inc`, action.options.step)
      } else {
        await instance.sendCommand(`group${group}dec`, action.options.step)
      }
    },
  }

  return actions
}

module.exports = { getActionDefinitions }
