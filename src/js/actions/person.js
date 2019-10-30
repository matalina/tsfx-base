import store from '../store ';

export default {
    look() {
        let text = this.description;
        text = `### ${this.name}` + "\n\n" + text;

        store.dispatch('history', {
            type: 'description',
            text,
            timestamp: moment().unix(),
        });
    }
}