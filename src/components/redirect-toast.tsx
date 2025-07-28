"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { consumeCookiedByKey, deleteCookieByKey } from "@/actions/cookies";

const RedirectToast = () => {
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await consumeCookiedByKey("toast");

      if (message) {
        toast.success(message);
        await deleteCookieByKey("toast");
      }
    };

    showCookieToast();
  }, []);

  return null;
};

export { RedirectToast };
