import express from "express"
import { addFood,listFood,removeFood } from "../controllers/foodController.js"
import multer from "multer"
import axios from "axios"

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);

foodRouter.get('/swiggy-menu', async (req, res) => {
    try {
      const { lat, lng, id } = req.query;
      const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching from Swiggy:", error);
      res.status(500).json({ error: "Failed to fetch data from Swiggy" });
    }
  });

export default foodRouter;