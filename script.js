function getShardNo(guild, shards) {
    try {
        return Number((BigInt(guild) >> 22n) % BigInt(shards))
    } catch (e) {
        return null;
    }
}

let guildEl = document.getElementById('guild');
let shardEl = document.getElementById('shards');
let outputEl = document.getElementById('output');

let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);

if (params.get('shards')) shardEl.value = params.get('shards');
if (params.get('guild')) guild.value = params.get('guild');

guildEl.addEventListener('input', update)
shardEl.addEventListener('input', update)

function update() {
    let guild = guildEl.value;
    let shards = shardEl.value;
    if (guild == '' || shards == '') {
        outputEl.setAttribute('class', 'error');
        outputEl.innerHTML = 'Missing fields.';
        return;
    }
    let shardNo = getShardNo(guild, shards);
    if (shardNo == null) {
        outputEl.setAttribute('class', 'error');
        outputEl.innerHTML = 'Invalid input.';
        return;
    }
    outputEl.removeAttribute('class');
    outputEl.innerHTML = `Server ${guild} is in shard #${shardNo}.`
}

update();