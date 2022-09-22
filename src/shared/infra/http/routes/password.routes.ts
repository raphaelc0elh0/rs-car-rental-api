import { Router } from "express";

import { ResetPasswordController } from "../../../../modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
passwordRoutes.post(
  "/password/forgot",
  sendForgotPasswordMailController.handle
);

const resetPasswordController = new ResetPasswordController();
passwordRoutes.post("/password/reset", resetPasswordController.handle);

export { passwordRoutes };
