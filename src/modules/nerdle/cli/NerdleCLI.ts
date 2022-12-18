/* eslint-disable no-console */
/**
 * Nerdle CLI(experimental)
 * - ヒントの例
 *   * シングルクォートで囲まないと!1などがコマンド履歴に展開されてしまう
 *   '6!1N6!3?RBR3AD' '8/?2?*?4?-7+?0?=?9'
 *   '3?5/?7+4=!9?' '2?*8-6?=?1?0'
 */
import NerdleHelper from '../models/NerdleHelperForCLI'

const showUsageAndExit = () => {
  console.error(
    'Usage: yarn node --experimental-specifier-resolution=node --loader ts-node/esm src/modules/nerdle/cli/NerdleCLI.ts <hints>'
  )
  process.exit(1)
}

const args = process.argv.slice(2)
if (args.length < 1) {
  showUsageAndExit()
}

const nerdle = new NerdleHelper(args.join(' '))
const result = nerdle.search
console.log(`total ${result.length} results:`)
result.slice(0, 10).forEach((ex) => console.log(`  ${ex}`))
