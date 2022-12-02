/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * 国情報/国旗画像セットアップ
 * - 依存パッケージ
 * yarn add --dev jsdom
 * yarn add --dev got
 * yarn add --dev @types/jsdom
 * yarn add --dev ts-node
 * - 実行方法
 * yarn node --loader ts-node/esm src/modules/national_flag/assets/setup.ts
 */

import got from 'got'
import { JSDOM } from 'jsdom'
import { createWriteStream, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const LIST_URL = 'https://ja.wikipedia.org/wiki/ISO_3166-1'
const IMG_URL_BASE = 'https://upload.wikimedia.org/wikipedia/commons/' // c/ce/Flag_of_Iceland.svg
const IMG_FILE_PAT = /[0-9a-f]\/[0-9a-f]{2}\/[^/]+.svg/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sleep = (sec: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, sec * 1000)
  })

const saveImage = (id: string, url: string) => {
  const dlUrl = path.join(IMG_URL_BASE, url)
  const imgPath = path.join(__dirname, 'images', `${id}.svg`)
  console.log(imgPath)
  got.stream(dlUrl).pipe(createWriteStream(imgPath))
}

const saveData = (data: string) => {
  const dataPath = path.join(__dirname, 'ISO_3166-1.txt')
  console.log(dataPath)
  writeFileSync(dataPath, data)
}

const response = await got(LIST_URL)
const dom = new JSDOM(response.body)
const nodeList = dom.window.document.querySelectorAll('table.wikitable tr')

const records = Array.from(nodeList)
  .filter((node) => node.querySelector('img'))
  .map((node) => {
    const tds = node.querySelectorAll('td')
    const img = node.querySelector('img')
    const [nm_ja, nm_en, , , id] = Array.from(tds).map((td) =>
      td.textContent?.trim()
    )
    const file = img?.src?.match(IMG_FILE_PAT)?.[0]
    const record = [nm_ja, nm_en, id, file]
    return record
  })
const data = records
  .map((record) => {
    const [nm_ja, nm_en, id, area] = record
    return [id, nm_ja, nm_en, area].join(`\t`)
  })
  .join('\n')
saveData(data)

for (const record of records) {
  await sleep(1)
  const [, , id, , file] = record
  if (id && file) saveImage(id, file)
}
