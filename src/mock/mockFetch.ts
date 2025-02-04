import queryString from 'query-string';

export function mockFetch(url: string) {
  console.log(`📢 Mock API 요청: ${url}`);

  if (url.includes('/symbolicate')) {
    console.warn('⚠️ Mock API: symbolicate 요청 무시');
    return Promise.resolve(new Response(null, {status: 204})); // No Content
  }

  try {
    console.log('📢 Step 1: URL 파싱 시작');

    const parsedUrl = queryString.parseUrl(url);

    console.log('📢 Step 2: URL 파싱 완료', parsedUrl);

    const latString = parsedUrl.query.lat as string;
    const lonString = parsedUrl.query.lon as string;

    if (!latString || !lonString) {
      throw new Error('🚨 lat 또는 lon이 존재하지 않습니다.');
    }

    const lat = parseFloat(latString);
    const lon = parseFloat(lonString);

    if (isNaN(lat) || isNaN(lon)) {
      throw new Error('🚨 lat 또는 lon이 NaN입니다.');
    }

    console.log('📢 Step 3: lat, lon 파싱 완료:', {lat, lon});

    // Mock 정류장 데이터
    const mockStations = [
      {id: '1', name: '강남역', lat: 37.4979, lon: 127.0276, distance: '100m'},
      {id: '2', name: '역삼역', lat: 37.5006, lon: 127.0365, distance: '200m'},
      {id: '3', name: '삼성역', lat: 37.5088, lon: 127.0631, distance: '500m'},
      {id: '4', name: '선릉역', lat: 37.5045, lon: 127.0489, distance: '600m'},
    ];

    console.log('📢 Step 4: Mock 정류장 데이터 로드 완료');

    // 가까운 정류장 필터링 (단순 거리 비교)
    const nearbyStations = mockStations.filter(station => {
      const distance = Math.sqrt(
        Math.pow(lat - station.lat, 2) + Math.pow(lon - station.lon, 2),
      );
      return distance < 0.01; // 가까운 거리 기준 (예제)
    });

    console.log('📢 Step 5: 가까운 정류장 필터링 완료:', nearbyStations);

    return Promise.resolve({
      status: 200,
      json: () => Promise.resolve(nearbyStations),
    });
  } catch (error) {
    console.error('🚨 Step 7: Mock API 오류 발생:', error);

    return Promise.reject(new Error(`Mock API 오류: ${error}`));
  }
}
