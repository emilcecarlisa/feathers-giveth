const { authenticate } = require('@feathersjs/authentication').hooks;

const patchTransaction = () => context => {
  context.data = {
    userRole: context.userRole,
    userAction: context.userAction
  };
  return context;
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      context => { //pro tip: console.log(typeof(context))
        // switch statement for all events not considered transfers
        // context.data.event += ' transaction 2';
          context.data = {
            id: context.data.id,
            txHash: context.data.transactionHash,
            event: context.data.event,
            returnValues: context.data.returnValues,
            userRole: context.data.userRole,
            userAction: context.data.userAction,
            projectType: context.data.projectType,
          };

        // preventing transactions from being created, below
        // context.result = null;
      }],
    update: [],
    patch: [patchTransaction()], //TODO: this is missing a parameter
    remove: []
  },
 // TODO: should return, at the very least, success or failure.
 // better would be success(the thing you acted upon, or ID of it) and
 // failure (error of what caused the failure)
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
