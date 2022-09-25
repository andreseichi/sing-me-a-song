import { Router } from "express";
import { resetDatabase, seedDatabase } from "../controllers/testsController";

const tests = Router();

tests.post("/reset-database", resetDatabase);
tests.post("/seed", seedDatabase);

export default tests;
