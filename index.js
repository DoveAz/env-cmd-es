import { exec } from 'child_process'
import { stdout, stderr } from 'node:process'

export async function run(cmd, env){
  const child = exec(cmd, { env: { ...process.env, ...env } })

  child.stdout.on('data', (data) => {
    stdout.write(`${data}`)
  })

  child.stderr.on('data', (data) => {
    stderr.write(`${data}`)
  })
}
