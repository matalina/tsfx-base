export default function() {
    return {
        game: {

        },
        character: {
            id: 1,
            full_name: null,
            short_name : null,
            description: null,
            traits: [],
            inventory:{} ,
            current_location: null,
            home_location: null,
            pc_npc: true,
            can_sell: true,
            markup_down: 0.1,
            credits: 10000,
            points : 0,
        }
    };
}
