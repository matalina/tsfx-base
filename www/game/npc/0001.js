import actions from '../../actions/person';

export default {
    name: 'MOUSE',
    short_name: 'mouse',
    always: ['blackbox'], // items always has on self
    items: ['blackbox'], // items current on self
    description:`MOUSE is your AI.  He is a tiny black box that when not on your coffee table at home is in the left interior breast coat pocket of your black leather trench coat, or your front right pocket if you take the coat off for some unfathomable reason.
    `,
    look: actions.look,

    mouse(...args) {

    },
}