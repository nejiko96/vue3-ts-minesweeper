/* eslint-disable no-console */
/**
 * Nerdle CLI
 * - 依存パッケージ
 *   yarn add --dev ts-node
 * - ヒントの例
 *   * シングルクォートで囲まないと!1などがコマンド履歴に展開されてしまう
 *   '6!1N6!3?RBR3AD 8/?2?*?4?-7+?0?=?9'
 *   'f1!r3!w0?rk$ 7?*8?/?4-?9=!5'
 */
import NerdleHelper from '../models/NerdleHelper'

const showUsageAndExit: () => never = () => {
  console.error(
    'Usage: yarn node --experimental-specifier-resolution=node --loader ts-node/esm src/modules/nerdle/cli/NerdleCLI.ts <hints>'
  )
  process.exit(1)
}

const args = process.argv.slice(2)
if (args.length < 1) {
  showUsageAndExit()
}

const nerdle = new NerdleHelper(args.flatMap((arg) => arg.split(' ')))
const result = nerdle.search
console.log(`total ${result.length} results:`)
result.slice(0, 10).forEach((ex) => console.log(`  ${ex}`))
