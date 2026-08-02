import { Schema, model, Types } from "mongoose";

export type AppRole = "super_admin" | "event_admin" | "volunteer" | "participant";

export interface RoleDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  role: AppRole;
  createdAt: Date;
}

const roleSchema = new Schema<RoleDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["super_admin", "event_admin", "volunteer", "participant"], required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

roleSchema.index({ userId: 1, role: 1 }, { unique: true });

export const Role = model<RoleDoc>("Role", roleSchema, "user_roles");
