const { ESLint } = require("eslint");
/**
 * 过滤我们需要忽略的文件
 * @param {*} files 
 * @returns 
 */
const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const ignoredFiles = await Promise.all(
    files.map((file) => eslint.isPathIgnored(file)),
  );
  const filteredFiles = files.filter((_, i) => ignoredFiles[i]);
  return filteredFiles.join(" ");
};

module.exports = {
  "*": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    return [`eslint ${filesToLint} --max-warnings=0`];
  },
};
