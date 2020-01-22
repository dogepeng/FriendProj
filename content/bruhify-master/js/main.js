
$(document).ready(function () {
    // init popovers
    $('[data-toggle="popover"]').popover();
    // idle bruhes
    app.idle_bruhes_worker.postMessage(app.idle_bruhes_shop);
    app.idle_bruhes_worker.onmessage = function (e) {
        let data = e.data;
        app.bruhs += data;
    }
});
// noinspection JSUnresolvedFunction
const app = new Vue({
    el: '#app',
    data: {
        multiplier: 1,
        bruhs: 0,
        bruh_img: 'stickfigure.png',
        bruh_sound: {
            object: new Audio('assets/bruh.mp3'),
            playing: false
        },
        promo: '',
        cache: {
            aut0: false,
            promos: {
                barrel_maker: false,
                bruh: false,
                aut0: false,
                faideye: false
                faideye: false,
                algebruh_moment: false
            }
        },
        upgrade: {
            i: 0,
            costs: [100, 250, 500, 1000, 1750, 2500, 5000, 7500, 10000, 12500, 15000, 20000, 30000, false]
        },
        timeouts: {
            troll_img: false,
            upgrade_popover: false
        },
        idle_bruhes_worker: new Worker('js/idle_bruhes.js'),
        idle_bruhes_shop: {
            caveman: {
                bps: 0.05,
                title: 'Caveman',
                description: 'Lived before time was recorded. Barely knew English.',
                quote: 'Ooga Booga?',
                cost: 10,
                cost_add: 5,
                owned: 0
            },
            grandpa: {
                bps: 0.1,
                title: 'Retro 1980s Grandpa',
                description: 'Lived in the stone age. Doesn\'t know slang. Took 4 hours to teach him how to bruh.',
                quote: 'Back in the day, we didn\'t have fancy electronics. We played Pong on huge arcade cabinets. By the way, I was the king of Pong.',
                cost: 100,
                cost_add: 10,
                owned: 0
            },
            cool_face: {
                bps: 0.25,
                title: 'Cool face (▀̿Ĺ̯▀̿ ̿)',
                description: 'Mr. Cool Face. Thinks he\'s better than everyone else because he hangs out with the other cool faces.',
                quote: '2 Cool 4 U',
                cost: 250,
                cost_add: 15,
                owned: 0
            },
            money_face: {
                bps: 1,
                title: 'Money face ($ʖ$)',
                description: 'Mr. Money. Takes showers in money. And baths. A morph between Lenny face and Dollar bill. Made in a lab.',
                quote: 'Show me da money!',
                cost: 500,
                cost_add: 25,
                owned: 0
            }
        }
    },
    methods: {
        bruh: function () {
            this.bruhs += this.multiplier;
            // noinspection JSUnusedGlobalSymbols
            this.bruh_img = 'stickfigurewithtrollface.png';
            if (this.timeouts.troll_img) {
                clearTimeout(this.timeouts.troll_img);
            }
            if (!this.bruh_sound.playing) {
                this.bruh_sound.object.play();
                this.bruh_sound.playing = true;
                this.bruh_sound.object.onended = function () {
                    app.bruh_sound.playing = false;
                    app.bruh_sound.object.currentTime = 0;
                }
            }
            this.timeouts.troll_img = setTimeout(function () {
                app.bruh_img = 'stickfigure.png';
                app.timeouts.troll_img = false;
            }, 250);
            this.tick();
        },
        upgrade_func: function () {
            let cost = this.upgrade.costs[this.upgrade.i];
            if (cost) {
                if (this.bruhs >= cost) {
                    this.bruhs -= cost;
                    this.multiplier++;
                    this.upgrade.i++;
                } else {
                    $('#upgrade_btn').popover('show');
                    if (this.timeouts.upgrade_popover) {
                        clearTimeout(this.timeouts.upgrade_popover);
                    }
                    setTimeout(function () {
                        $('#upgrade_btn').popover('hide');
                        app.timeouts.upgrade_popover = false;
                    }, 1000);
                }
            }
        },
        tick: function () {
            if (this.bruhs >= 5000 && !this.cache.promos.aut0 && cache('aut0')) {
                alert('promo code: aut0');
            }
            else if (this.multiplier >= 20 && this.bruhs >= 100000) {
                alert('promo code: algebruh moment');
            }
            
        },
        redeem: function () {
            this.promo = this.promo.trim().toLowerCase();
            if (promo_code('barrel maker')) {
                this.bruhs += 500;
            } else if (promo_code('bruh')) {
                this.multiplier += 3;
            } else if (promo_code('aut0')) {
                setInterval(this.bruh, 750)
            } else if (promo_code('faideye')) {
                this.multiplier += 10;
            } else if (promo_code('algebruh moment')) {
                this.multiplier += 15;
            } else {
                $('#promo').addClass('border-danger');
            }
            this.tick();
        },
        buy: function (name) {
            let idle_object = this.idle_bruhes_shop[name];
            if (this.bruhs >= idle_object.cost) {
                this.bruhs -= idle_object.cost;
                idle_object.owned++;
                idle_object.cost += idle_object.cost_add;
                this.idle_bruhes_worker.postMessage(this.idle_bruhes_shop);
            }
        }
    }
});
function promo_code(code) {
    let code_name = code.replace(' ', '_');
    if (app.promo === code && cache('promos', code_name)) {
        $('#promo').removeClass('border-danger');
        app.promo = '';
        return true;
    }
    return false;
}
function cache() {
    let variable = app.cache;
    let hierarchy = [app.cache];
    let i = 0;
    let args = arguments;
    for (let i = 0; i < args.length; i++) {
        variable = variable[args[i]];
        hierarchy.push(variable);
    }
    if (!hierarchy.pop()) {
        i = hierarchy.length;
        hierarchy.push(true);
        console.log(hierarchy);
        while(i-- > 0) {
            hierarchy[i][args[i]] = hierarchy.pop();
        }
        return true;
    }
    return false;
}
