#! /usr/bin/env node
import { Command } from 'commander'
import { resolve } from 'node:path'
import { run } from '../index.js'


async function parse(args) {
  let program = await parseArgs(args)
  const command = program.args[0];
  const commandArgs = args.splice(args.indexOf(command) + 1);
  program = await parseArgs(args.slice(0, args.indexOf(command)));
  const options = program.opts()
  return {
    cmd: [command,...commandArgs].join(' '),
    env: await getEnv(options.environments)
  }
}

/**
 *
 * @param args
 * @returns {Promise<Command>}
 */
async function parseArgs(args){
  const program = new Command()
  return program
    .usage('[options] <command> [...args]')
    .allowUnknownOption()
    .option('-e, --environments [env1,env2,...]', 'The rc file environment(s) to use')
    .parse(['_', '_', ...args]);
}

const { cmd, env } = await parse(process.argv.slice(2))

await run(cmd, env)

async function getEnv(e) {
  const envRcFileList = ['./.env-cmdrc.ts', './.env-cmdrc.js']
  let env = null
  for (const path of envRcFileList) {
    try {
      env = await import('file://' + resolve(process.cwd(), path)).then(res => isFunction(res.default) ? res.default() : res.default)
      break
    } catch (err) {

    }
  }
  if (!env) {
    throw new Error(`can't find rc file or parse file fail at ${envRcFileList.join(' ')}`)
  }
  return env[e]
}

function isFunction(func) {
  return typeof func === "function"
}
