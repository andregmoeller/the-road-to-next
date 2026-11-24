import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { sendEmailPasswordReset } from "../emails/send-email-password-reset";
import { generatePasswordResetLink } from "../utils/generate-password-reset-link";
import { eventType, staticSchema } from "inngest";

export const passwordResetRequested = eventType("app/password.password-reset", {
  schema: staticSchema<{ userId: string }>(),
});

export const passwordResetEvent = inngest.createFunction(
  { id: "password-reset", triggers: [passwordResetRequested] },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const passwordResetLink = await generatePasswordResetLink(user.id);

    const result = await sendEmailPasswordReset(
      user.username,
      user.email,
      passwordResetLink
    );

    return { event, body: result };
  }
);
