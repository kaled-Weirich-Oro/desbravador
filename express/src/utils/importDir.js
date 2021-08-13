import { readdir } from 'fs'
import { promisify } from 'util'

const readDir = promisify(readdir)

export default async function importDir(path) {
  const files = await getJsFiles(path)
  const modules = await Promise.all(files.map(f => import(`${path}/${f}`)))

  return files.reduce((acc, f, i) => ({ ...acc, [f.replace(/\.js$/, '')]: modules[i] }), {})
}

const getJsFiles = path => readDir(path)
  .then(files => files.filter(f => f.match(/\.js$/)))
