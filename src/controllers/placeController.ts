import { Request, Response } from 'express';
import { PlaceService } from '../services/placeService';
import { validateSchema } from '../validations';
import { createPlaceSchema } from '../validations/Place/createPlace';
import { updatePlaceSchema } from '../validations/Place/updatePlace';
import { Seller } from '@prisma/client';
import { isNull } from 'lodash';
import { late } from 'zod';

class PlaceController {
  private placeService = new PlaceService();

  async create(req: Request, res: Response) {
    const { body: payload } = await validateSchema(createPlaceSchema, req);
    const user = req.user;

    const place = await this.placeService.create({ ...payload, userId: user.id });

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
    const { body: payload, params: { placeId } } =
      await validateSchema(updatePlaceSchema, req);

    const place = await this.placeService.update(placeId, { ...payload, userId: req.user.id });

    return res.status(200).json({ place });
  }

  async destroy(req: Request, res: Response) {
    const { placeId } = req.params;

    await this.placeService.destroy(placeId);

    return res.status(204).json();
  }

  async findNearbySellers(req: Request, res: Response) {
    const { placeId, search } = req.params;

    const sellers = await this.placeService.findNearbySellers(placeId, search === 'null' ? "" : search);

    return res.status(200).json({ sellers });
  }
}

export { PlaceController }