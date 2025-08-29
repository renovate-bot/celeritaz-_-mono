import { text, timestamp } from "drizzle-orm/pg-core";

export const common_columns = {
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  createUserId: text("create_user_id"),
  updateUserId: text("update_user_id"),
  createFunctionId: text("create_function_id"),
  updateFunctionId: text("update_function_id"),
};
