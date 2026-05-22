export const drop = async (e: DragEvent, callback: Function) => {
  e.preventDefault();
  console.log('drop', e.dataTransfer);
  if (!e.dataTransfer) return;
  const { files: fileList } = e.dataTransfer;
  callback(fileList);
};
