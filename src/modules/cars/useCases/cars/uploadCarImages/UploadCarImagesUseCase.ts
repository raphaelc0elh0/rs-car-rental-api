import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "../../../repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImageRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image_name) => {
      await this.carsImageRepository.create(car_id, image_name);
    });
  }
}

export { UploadCarImagesUseCase };
