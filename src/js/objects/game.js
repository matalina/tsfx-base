import game from '../game';
import axios from 'axios';
import matter from "gray-matter";

import Room from "./room";
import Item from "./item";
import Person from "./person";

const objs = {
    item: 'Item',
    npc: 'Person',
    room: 'Room',
};

export default {
    loadGame() {
        this.loading = true;
        console.log('loading game...');

        let game_data = [];

        for(let type in game) {
            let items = game[type];
            for(let i in items) {
                let number = items[i];
                let file = number + '.md';
                let call =  axios.get(`game/${type}/${file}`)
                    .then((response) => {
                        let info = matter(response.data);
                        let data = info.data;
                        data.description = info.content;

                        this.$store.dispatch('load', {
                            type,
                            number,
                            data,
                        });

                        return new Promise((resolve, reject) => {
                            resolve(true);
                        });

                    })
                    .catch((error) => {
                        return new Promise((resolve, reject) => {
                            reject(error);
                        })
                    });
                game_data.push(call);
            }
        }

        Promise.all(game_data)
            .then((response) => {
                console.log('done')
                this.loading = false;
                this.$store.dispatch('start');
            })
            .catch((error) => {
                console.log('There was a problem loading the game data.');
                console.log(error);
                this.loading = false;
                this.error = true;
            })

    },
    resetGame() {
        this.$store.dispatch('clear');
        this.loadGame();
    },
}