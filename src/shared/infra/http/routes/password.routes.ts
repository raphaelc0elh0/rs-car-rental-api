import { Router } from "express";

import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
passwordRoutes.post(
  "/password/forgot",
  sendForgotPasswordMailController.handle
);

export { passwordRoutes };
