import { Filesystem, Directory } from '@capacitor/filesystem'


async function useReadImage(path: string){
  try {
    const file = await Filesystem.readFile({
      path: path,
      directory: Directory.Data,
    });
    const dataUrl = `data:image/jpeg;base64,${file.data}`;
    return dataUrl
  }
  catch (error) {
    console.error('Error reading file:', error);
    return ""
  }
}

export default useReadImage
