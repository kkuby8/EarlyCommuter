import {StationRepository} from '~/domain/repositories/StationRepository';
import {Station} from '~/domain/entities/Station';
import {ApiClient} from '~/data/api/ApiClient';

export class StationRepositoryImpl implements StationRepository {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getNearbyStations(lat: number, lon: number): Promise<Station[]> {
    const response = await this.apiClient.get(
      `https://api.earlycommuter.com/nearby-stations?lat=${lat}&lon=${lon}`,
    );
    return response.map(
      (item: any) => new Station(item.id, item.name, item.distance),
    );
  }
}
