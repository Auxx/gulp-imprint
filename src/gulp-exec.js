const util = require('util');
const exec = util.promisify(require('child_process').exec);

const maxBuffer = 100 * 1024;

async function gulpExec(cmd) {
  const { stdout, stderr } = await exec(cmd, { cwd: process.cwd(), maxBuffer: maxBuffer });
  console.log(stdout, stderr);
}

module.exports = gulpExec;
