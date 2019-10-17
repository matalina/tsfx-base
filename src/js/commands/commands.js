export default {
    // Game
    clear: {command: 'reset', on: 'game', args: [''] },
    help: {command: 'help', on: 'game', args: [] },
    // Movement
    n: { command: 'move', on: 'room', args: ['n'] },
    north: { command: 'move', on: 'room', args: ['north'] },
    w: { command: 'move', on: 'room', args: ['w'] },
    west: { command: 'move', on: 'room', args: ['west'] },
    e: { command: 'move', on: 'room', args: ['e'] },
    east: { command: 'move', on: 'room', args: ['east'] },
    s: { command: 'move', on: 'room', args: ['s'] },
    south: { command: 'move', on: 'room', args: ['south'] },
    u: { command: 'move', on: 'room', args: ['u'] },
    up: { command: 'move', on: 'room', args: ['up'] },
    d: { command: 'move', on: 'room', args: ['d'] },
    down: { command: 'move', on: 'room', args: ['down'] },
    move: { command: 'move', on: 'room', args: [] },
    // Look
    look: { command: 'look', on: null, args:[] },
}