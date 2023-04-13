import { Request, Response } from 'express';
import { PlaceService } from '../services/placeService';

class PlaceController {
  private placeService = new PlaceService();

  async create(req: Request, res: Response) {
    const { name, address } = req.body;
    const user = req.user;

    const place = await this.placeService.create({ name, address, userId: user.id });

    return res.status(201).json({ place });
  }

  async index(req: Request, res: Response) {
    const user = req.user;

    const places = await this.placeService.index(user.id);

    return res.status(200).json({ places });
  }

  async show(req: Request, res: Response) {
    const { placeId } = req.params;

    const place = await this.placeService.show(placeId);

    return res.status(200).json({ place });
  }

  async update(req: Request, res: Response) {
    const { placeId } = req.params;
    const { name, address } = req.body;

    const place = await this.placeService.update(placeId, { name, address, userId: req.user.id });

    return res.status(200).json({ place });
  }

  async destroy(req: Request, res: Response) {
    const { placeId } = req.params;

    await this.placeService.destroy(placeId);

    return res.status(204).json();
  }
}

export { PlaceController }