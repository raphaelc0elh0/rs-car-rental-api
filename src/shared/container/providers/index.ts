import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

// IDateProvider
container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

// IDateProvider
container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealMailProvider()
);
