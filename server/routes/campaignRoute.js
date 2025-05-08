import express from "express";

import { createCampaign, getAllCampaigns, getCampaignById, getCampaignLogs} from "../controllers/campaignController.js";

const campaignRouter = express.Router();

campaignRouter.post("/", createCampaign);
campaignRouter.get("/", getAllCampaigns);
campaignRouter.get("/:id", getCampaignById);
campaignRouter.get("/:id/logs", getCampaignLogs)

export default campaignRouter;
