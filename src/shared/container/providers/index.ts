import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { AmazonStorageProvider } from "./StorageProvider/implementations/AmazonStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

// DateProvider
container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

// MailProvider
container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealMailProvider()
);

// StorageProvider
const useStorage = {
  local: LocalStorageProvider,
  s3: AmazonStorageProvider,
};
container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  useStorage[process.env.USE_STORAGE]
);
