import { Request, Response } from "express";
import { FavoriteService } from "../services/favoriteService";

class FavoriteController {
  private favoriteService = new FavoriteService();

  async create(req: Request, res: Response) {
    const { sellerId } = req.body;
    const { id } = req.user;

    const favorite = await this.favoriteService.create(id, sellerId);

    return res.json({ favorite });
  }

  async getMyFavorites(req: Request, res: Response) {
    const { id } = req.user;

    const favorites = await this.favoriteService.getMyFavorites(id);

    return res.json({ favorites });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.user;

    await this.favoriteService.delete(userId, id);

    return res.status(204).send();
  }
}

export { FavoriteController }