export const uploadFile = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ file_url: reader.result });
    reader.readAsDataURL(file);
  });
