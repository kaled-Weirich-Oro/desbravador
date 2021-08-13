import { promises } from 'fs';

export default async function importDir(path) {
  const files = await getJsFiles(path);
  const modules = await Promise.all(files.map(f => import(`${path}/${f}`)));

  return files.reduce((acc, f, i) => ({ ...acc, [f.replace(/\.js$/, '')]: modules[i] }), {});
}

const getJsFiles = path => promises.readdir(path)
  .then(files => files.filter(f => f.match(/\.js$/)));
