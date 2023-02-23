import { EksiSozluk } from "eksi-sozluk"
import * as fs from 'node:fs';

const titles = [
    "ekşi itiraf",
    "şu anda çalan şarkı",
    "recep tayyip erdoğan",
    "çaylak onay listesi",
    "iz bırakan kitap cümleleri",
    "beşiktaş",
    "düşün ki o bunu okuyor",
    "geceye bir şiir bırak",
    "galatasaray",
    "fenerbahçe",
    "ekşi sözlük",
    "hastası olunan sözler"
]

const eksi = new EksiSozluk()

const authors = new Set()

const promises = []

for (const title of titles) {
    promises.push(traverseTitle(title))
    await sleep(1000)
}

await Promise.all(promises)

fs.appendFileSync('authors.txt', JSON.stringify([...authors]))

async function traverseTitle(title) {
    for (let col = await eksi.entries(title); col.currPage <= col.pageCount; await col.next()) {
        console.log(title, col.currPage)
        for (const entry of col.entries) {
            authors.add(entry.author)
        }
        await sleep(3000)
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}