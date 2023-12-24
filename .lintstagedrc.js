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
  const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
  console.log("需要过滤的文件列表", ignoredFiles,filteredFiles);


  return filteredFiles.join(" ");
};

module.exports = {
  "*": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    console.log("文件列表", filesToLint);
    return [`eslint ${filesToLint} --max-warnings=0`];
  },
};
