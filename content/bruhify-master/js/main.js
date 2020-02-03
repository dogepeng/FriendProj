 
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
                faideye: false,
		algebruh_moment: false,
		carson: false
            }
        },
        upgrade: {
            i: 0,
            costs: [100, 250, 500, 1000, 1750, 2500, 5000, 7500, 10000, 12500, 15000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, false]
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
            },
	    bruh_moment: {
                bps: 2,
                title: 'Bruh Moment',
                description: 'Bruh Moment. Two happen every second on Earth.',
                quote: 'BRUH',
                cost: 1000,
                cost_add: 100,
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
	    } else if (promo_code('rmxdvqx3cuin170p21jhvir1n2v8p33j2rezqwvuq76jtlr2chaau0r8413kscfkynsgppevhjcbldlcwjvs5cl4epze3tdq51odtkm4kmmr008b7e9m60dw2751rfmzasvev6hzaqww76entv5740m83u0nh5bybwuadpi1v5ps5pef517vnwteer5domobqmlzi6p0tr2hzkeadgz47k9qa0tbvkg5vsa8asyuxgcqe90j16n29iedi4sxo3h1y172fny7azbdernwjksjep41xwtkiwqrketlwof6bccpyu0m1whwtlu9ho40djpt4y04yifzf3thix862m71l1lcfkn3ziv06y9k733fuo3e8uc05t7qn9e5o35zsv9tyhkqfw1o538ghc7tax3rj2ilgxuqudxzo3dmmljrun3v0cno1u7dc35trnwmtwq1xk0d0so1smvd18veiv5lsm6igdlr6dk2r9vko4zb67e6xbodc7s4lxv9ph35vjnnkf7sjyr99ygadda1po3x4m3s1r6g3amfkpe45ksbznyfk0vrs6bk6vlqm7g0cyuy4njl8xh74apaq7p7i5s112o33x1nk9d5muznnps9ldtu7jwoxycjtq72ujgfliooy317wf8s3ljtk0qpa0wurejld5ujb8xmboyy3zny2mzpe1vkdij71d8hs7ypjoi86w1fxenujm0n49saoj3zwsgyx0zcka4jkql93cgk567hv3r88fulah1ygfs7yxhglg52cx5umhshoxwg61hda1gmbafbllvnlrgfvxtu11ujfy5ueak67g59g5vr3fo8o8pz66d9dyq644j794pj7e7vpz7j756bt1t4wlsvj0gvymcwdo1pduflv0xkqdfc33dfj5c4zt67pgdos9j0bp0kb7bdr5paaao88ldbopj9hixaxw3fa61ttvt1vatsoh1myz3ej8hwpuk86b9khj40b4u5pzlxkqa9o431nj78p2lyjeij4dw6tv9uo0jks0rf3t4nfjv3ceh6jjokavetrbs3u3hslupafos0jxm3lf1l66v2tf49frp15ocsdah9b36fsagzo7p7d0vpris3j2onm07bnriildaljwp1cch6g46bmnrz8tyxd2qprh1gvrswcn609t8tdsdqtqqh9dv7xnp1b7g9aps6un95v8ubp7vrltmd2o85lhosn3sgb3ysqgs7mno3tvpn8o6uw47ddtx505xak045zdi2tk3syjyhub4wfgytsi570a5li03qxcwfkq6ocm0lgdgj63ykqc2febtn185exasc8uexfhkuuu1lrunnrk5wnue935jhbwqkigtrio7q1s3prxxnyf48vkkqb54f2s8pi997unkanoo54d6qthnvv9k58ybv8qy27yxv1mscbh0x23hqgick35t1jz7una2uak6ul1qmruqesynmfj7scwhy5mw77lrgzohywv4w070y2jedh6hxw977tnnm2fywd5cb2cszumihger522gamo1go5zkjllkaq8a4lmc77yvximwj9l2vsla9o2yauet204aszf6n1ktmval3js9ez6500rehp1g4fshoihq86qd0j1kroem2e3x48iy1jjxnasygyxgg8ad0nsz5v0ce5mwhy1pzxf4jl8nhbuf32x1oquiz4prtdiviciz61m8l7ux1ycftc9d0dizvba9rb3lv6tlwbyynzb962hfjzzjebfswg5ul7x73i744gpghyn5juman4stw1vq2pvvzp74wbl2099nwbprys2xjk5dw95pbbzbev3vkx0jc40q9vnki6dszsb1g8m413n41mosa7dmapdyhvwkpz62s0yttg3bc7b6mvkta41sjr1q22jw5uygfxrlim6i1ngv5snlp8y185bdptar86ppslqij43xiife6j0r5a623mggqwylbmrl2p5dch9ibiw5irtisyr16v2ixjsl')) {
		this.multiplier += 100;
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
function hash() {
        var promo = document.getElementById('promo_code').value;
	    var md = forge.md.sha256.create();  
            md.start();  
            md.update(promo_code, "utf8");  
            var hashText = md.digest().toHex();  
    }      
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
