import fs from "fs";
import path from "path";

import { uploadConfig } from "../../../../../config/uploadConfig";
import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(`${uploadConfig.tmpFolder}/${folder}`, file)
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<string> {
    const filename = path.resolve(`${uploadConfig.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
