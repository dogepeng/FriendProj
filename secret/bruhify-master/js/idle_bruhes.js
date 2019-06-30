let idle_bruh_shop = null;
let timeouts = [];
let masterTimeout = false;
let quenedBruhes = 0;
onmessage = function(e) {   
    idle_bruh_shop = e.data;
    let timeout_id = timeouts.pop();
    while(typeof timeout_id !== "undefined") {
        clearInterval(timeout_id);
        timeout_id = timeouts.pop();
    }
    for(let key in idle_bruh_shop) {
        if(idle_bruh_shop.hasOwnProperty(key)) {
            obj = idle_bruh_shop[key];
            if(obj.owned > 0) {
                let interval = (1000/(obj.bps * obj.owned)).toFixed(3);
                timeouts.push(setInterval(function() {
                    quenedBruhes++;
                }, interval));    
            }
        }
    }
    if(!masterTimeout) {
        setInterval(function() {
            if(quenedBruhes > 0) {
                postMessage(quenedBruhes);
                quenedBruhes = 0;
            }
        }, 50);
        masterTimeout = true;
    }
};
