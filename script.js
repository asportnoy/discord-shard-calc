function getShardNo(guild, shards) {
	return Math.floor(parseInt(guild) / Math.pow(2, 22)) % parseInt(shards)
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
    let shardNo = getShardNo(guild, shards);
    if (shardNo % 1 !== 0) {
        outputEl.setAttribute('class', 'error');
        outputEl.innerHTML = 'Invalid input.';
        return;
    }
    outputEl.setAttribute('class', '');
    outputEl.innerHTML = `Server ${guild} is in shard #${shardNo}.`
}

if (guildEl.value !== '' && shardEl.value !== '') update();