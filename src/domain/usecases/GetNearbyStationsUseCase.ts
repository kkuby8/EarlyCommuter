import {Station} from '~/domain/entities/Station';
import {StationRepository} from '~/domain/repositories/StationRepository';

export class GetNearbyStationsUseCase {
  constructor(private stationRepository: StationRepository) {}

  async execute(lat: number, lon: number): Promise<Station[]> {
    return await this.stationRepository.getNearbyStations(lat, lon);
  }
}
