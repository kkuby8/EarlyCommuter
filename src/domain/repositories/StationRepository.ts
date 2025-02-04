import {Station} from '~/domain/entities/Station';

export interface StationRepository {
  getNearbyStations(lat: number, lon: number): Promise<Station[]>;
}
