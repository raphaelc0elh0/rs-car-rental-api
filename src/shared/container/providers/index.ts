import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { SesMailProvider } from "./MailProvider/implementations/SesMailProvider";
import { AmazonStorageProvider } from "./StorageProvider/implementations/AmazonStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

// DateProvider
container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

// MailProvider
const useMail = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SesMailProvider),
};
container.registerInstance<IMailProvider>(
  "MailProvider",
  useMail[process.env.USE_MAIL]
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
