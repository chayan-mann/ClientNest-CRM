import express from "express";

import { createCampaign, getAllCampaigns, getCampaignById} from "../controllers/campaignController.js";

const campaignRouter = express.Router();

campaignRouter.post("/", createCampaign);
campaignRouter.get("/", getAllCampaigns);
campaignRouter.get("/:id", getCampaignById);

export default campaignRouter;
