
import { User } from "@prisma/client";

type Entity = {
  userId: string | null;
};

export const isOwner = (
  authUser: User | null | undefined,
  entity: Entity | null | undefined
) => {
  if (!authUser || !entity) {
    return false;
  }

  if (!entity.userId) {
    return false;
  }

  return entity.userId === authUser.id;
};
