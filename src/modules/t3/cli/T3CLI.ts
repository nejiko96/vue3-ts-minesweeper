/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import * as readline from 'readline'
import { sample } from '../../../core/utils'
import T3Model from '../models/T3Model'

const getInput: (prompt: string) => Promise<string> = (prompt) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise<string>((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

const RESULT_MSG = {
  first: 'You win.',
  second: 'CPU wins.',
  draw: 'DRAW.',
}
const t3 = new T3Model()

for (;;) {
  console.log()
  console.log(t3.disp())
  const state = T3Model.solve(t3)
  if (state.next.length === 0) {
    console.log(RESULT_MSG[state.result])
    break
  }

  let k = -1
  if (t3.turn) {
    do {
      const input = await getInput('Your move(1-9): ')
      k = Number(input)
    } while (!(k >= 1 && k <= 9))
  } else {
    k = sample(state.next)
    console.log(`CPU move: ${k}`)
  }

  t3.put(k)
}
