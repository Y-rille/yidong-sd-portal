
import createHashHistory from 'history/createHashHistory'

declare let global: any;

const hashHistory = createHashHistory({
  basename: '', // The base URL of the app (see below)
  hashType: 'slash', // The hash type to use (see below)
  // A function to use to confirm navigation with the user (see below)
  // getUserConfirmation: (message, callback) => callback(window.confirm(message))
})

global.hashHistory = hashHistory

export default hashHistory