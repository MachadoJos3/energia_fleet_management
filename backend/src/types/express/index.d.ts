import express from "express";
import User from "../../models/User";
import { Tire } from "../../models/Tire";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      vehicleId?: string;
      tire?: Tire;
    }
  }
}
