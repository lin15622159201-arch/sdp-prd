const handlePasteLink = async (link: string) => {
  let result: File[] = [];

  const blob: Blob = await fetch(link).then(res => res.blob());
  console.log(link, blob);
  const filename = link.split('/').pop() || 'image.jpeg';
  const type = filename.split('.').pop() || 'jpeg';
  const file: File = new File([blob], filename, { type: `image/${type}` });
  result = [file];

  return result;
};

const handlePasteFile = (e: ClipboardEvent) => {
  const result: File[] = [];
  // 复制文件
  const items = e.clipboardData?.items;
  const pasteFiles = Array.from(items || []);
  if (Array.isArray(pasteFiles)) {
    pasteFiles.forEach((item) => {
      const imageFile = item.getAsFile();
      if (imageFile) {
        result.push(imageFile);
      }
    });
  }

  return result;
};

export const paste = async (e: ClipboardEvent, callback: Function) => {
  if (!e.clipboardData) return;

  const link = e.clipboardData.getData('text/plain');

  const files: File[] = link ? await handlePasteLink(link) : await handlePasteFile(e);

  if (files.length === 0) return;

  callback(files);
};
