import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import {GetNearbyStationsUseCase} from '~/domain/usecases/GetNearbyStationsUseCase';
import {StationRepositoryImpl} from '~/data/repositories/StationRepositoryImpl';
import {ApiClient} from '~/data/api/ApiClient';
import {Station} from '~/domain/entities/Station';

function HomeScreen() {
  const [stations, setStations] = useState<Station[]>([]);
  const stationRepository = new StationRepositoryImpl(new ApiClient());
  const getNearbyStationsUseCase = new GetNearbyStationsUseCase(
    stationRepository,
  );

  useEffect(() => {
    const lat = 37.4979;
    const lon = 127.0276;
    const fetchStations = async () => {
      const result = await getNearbyStationsUseCase.execute(lat, lon);
      console.log('result', result);
      setStations(result);
    };
    fetchStations();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>🚇 Nearby Stations</Text>
        <FlatList
          data={stations}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
