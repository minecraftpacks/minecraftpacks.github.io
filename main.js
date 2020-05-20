const datapacksUrl = 'https://raw.githubusercontent.com/minecraftpacks/database/master/datapacks.json';
const resourcepacksUrl = 'https://raw.githubusercontent.com/minecraftpacks/database/master/resourcepacks.json';

let packs = []
let fuse;

Promise.all([
  fetchDatabase(datapacksUrl, {type: 'data'}), 
  fetchDatabase(resourcepacksUrl, {type: 'resource'})
]).then(r => {
    packs = [...r[0], ...r[1]]
    fuse = new Fuse(packs, {
      keys: ['name', 'id', 'desc']
    })
  })

async function fetchDatabase(url, extra) {
  const response = await fetch(url)
  const database = await response.json();
  return Object.entries(database).map(e => ({id: e[0], ...e[1], ...extra}))
}

$(document).ready(() => {
  $('#search').on('keyup', function() {
    updateSearch(this.value)
  })
})

function updateSearch(query) {
  const results = fuse.search(query)
  console.log(results)
}

function generatePack(pack) {
  const el = document.createElement('div')
  el.className = 'pack-card'
  return el
}
