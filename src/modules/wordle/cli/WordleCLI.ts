/* eslint-disable no-console */
/**
 * Wordle CLI
 * - 依存パッケージ
 *   yarn add --dev ts-node
 * - ヒントの例
 *   * シングルクォートで囲まないと!1などがコマンド履歴に展開されてしまう
 *   'A?ER?OS U?N?L?IT'
 */
import WordleHelper from '../models/WordleHelper'

const showUsageAndExit = () => {
  console.error(
    'Usage: yarn node --experimental-specifier-resolution=node --loader ts-node/esm src/modules/wordle/cli/WordleCLI.ts <hints>'
  )
  process.exit(1)
}

const args = process.argv.slice(2)
if (args.length < 1) {
  showUsageAndExit()
}

const wordle = new WordleHelper(args.flatMap((arg) => arg.split(' ')))
const result = wordle.search
console.log(`total ${result.length} results:`)
result.slice(0, 10).forEach((ex) => console.log(`  ${ex}`))
