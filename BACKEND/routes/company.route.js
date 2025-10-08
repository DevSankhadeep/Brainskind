import express from "express";

import authenticateToken from "../middleware/isAuthenticated";
import {
    getAllCompanies,
    getCompanyById,
    updateCompany,
    registerCompany,
}
    from "../controllers/company.controller.js";
const router = express.Router();

router.route("/get").get(getAllCompanies);
router.route("/get/:id").get(getCompanyById);
router.route("/update/:id").put(authenticateToken, updateCompany);
router.route("/register").post(authenticateToken, registerCompany);
export default router;