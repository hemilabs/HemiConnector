export const HelloWorldAbi = [
  {
    inputs: [],
    name: 'getGreeting',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'greeting',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_greeting',
        type: 'string'
      }
    ],
    name: 'setGreeting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
