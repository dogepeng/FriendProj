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
                cheatcode: false
            }
        },
        upgrade: {
            i: 0,
            costs: [100, 250, 500, 1000, 1750, 2500, 5000, 7500, 10000, false]
            costs: [100, 250, 500, 1000, 1750, 2500, 5000, 7500, 10000, 50000, 100000, 200000, 300000, 400000, 500000,false]
        },
        timeouts: {
            troll_img: false,
@@ -121,6 +121,8 @@ const app = new Vue({
        tick: function () {
            if (this.bruhs >= 4500 && cache('aut0')) {
                alert('promo code: aut0');
            if (this.bruhs >= 100000000000000000) {
                alert('Well, this is a bruh moment......... you used up all of your time for what? Pls donate tho');
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
            } else if (promo_code('cheatcode')) {
                this.bruhs += 20000;
                this.multiplier += 10;
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
