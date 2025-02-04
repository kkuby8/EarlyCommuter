# 🚀 EarlyCommuter

## 📌 프로젝트 목표

EarlyCommuter는 출퇴근 및 등하교 시간에 사용자가 설정한 정거장(버스, 지하철)에 도착 시간을 알려주는 **스마트 알림 앱**입니다.

✅ **정확한 정거장 도착 알림**: 설정한 정거장 근처에 있을 때만 알림을 제공해 불필요한 알림을 최소화합니다.  
✅ **배터리 효율 최적화**: 백그라운드에서 위치 정보를 효율적으로 사용하여 배터리 소모를 줄입니다.  
✅ **Mock API를 활용한 개발 환경**: 실제 API가 구현되기 전에도 기능을 테스트할 수 있도록 구성합니다.

---

## 🛠 기술 스택

### **📱 Mobile**

- **React Native** (Bridgeless Mode 활성화)
- **TypeScript**
- **React Navigation** (화면 간 이동)
- **Zustand** (상태 관리)
- **React Query** (비동기 데이터 관리)
- **Lottie** (Pull-to-refresh 애니메이션)

### **🛰️ 네이티브 모듈**

- **react-native-geolocation-service** (위치 정보 활용)
- **react-native-background-fetch** (백그라운드 위치 업데이트)
- **react-native-push-notification** (푸시 알림)

### **🌐 API & Mock Data**

- **Mock API** (`mockFetch.ts`)
- **query-string** (URL 파싱)
- **Axios** (실제 API 연동 시 사용)

---

## 📂 프로젝트 구조

```
EarlyCommuter/
├── src/
│   ├── core/               # 앱의 핵심 설정 및 provider
│   ├── domain/             # 엔티티 및 use case 관리
│   │   ├── entities/       # 도메인 모델 (Station, User 등)
│   │   ├── repositories/   # 데이터 저장소 인터페이스
│   │   ├── usecases/       # 비즈니스 로직 처리
│   ├── data/               # API 통신 및 데이터 처리
│   │   ├── api/            # API 클라이언트 (Axios)
│   │   ├── repositories/   # 실제 데이터 저장소 구현체
│   ├── presentation/       # UI 및 화면 관련 코드
│   │   ├── navigation/     # 화면 이동 관련 설정
│   │   ├── screens/        # 개별 화면 (Home, Settings 등)
│   ├── mocks/              # Mock API (fetch 가로채기)
│   ├── utils/              # 유틸리티 함수 모음
│   ├── App.tsx             # 앱의 진입점
├── README.md               # 프로젝트 문서
```

---

## 🔋 배터리 효율 최적화

### **1️⃣ 백그라운드 위치 업데이트 최소화**

- `react-native-background-fetch`를 사용하여 특정 시간 간격으로만 위치 정보를 가져옵니다.
- GPS를 **상시 활성화하지 않고**, 사용자가 설정한 출퇴근 시간대에만 활성화.
- 지하철/버스 정류장 근처일 때만 GPS 활성화 → **불필요한 위치 업데이트 방지.**

### **2️⃣ 저전력 모드 적용**

- Android에서는 **Foreground Service를 최소화**하고, **JobScheduler**를 활용하여 주기적으로 실행.
- iOS에서는 **Significant Location Change API**를 사용하여 배터리 효율을 극대화.
- 위치 기반 알림을 **푸시 서버에서 처리**하여 클라이언트의 연산을 줄임.

### **3️⃣ `react-native-push-notification`을 활용한 스마트 알림**

- 사용자가 설정한 정거장 근처에 도착했을 때만 알림을 전송.
- 위치 변화 감지를 최소화하여 배터리 사용량 절감.

---

## 🧪 Mock API를 활용한 개발 환경

초기 개발 단계에서 **실제 API가 없어도 개발을 원활하게 진행할 수 있도록** `mockFetch.ts`를 활용합니다.

### **Mock API 적용 방식**

1. `global.fetch`를 `mockFetch`로 대체하여 **모든 네트워크 요청을 가로챔.**
2. `query-string`을 이용하여 `URLSearchParams.get()` 오류를 방지.
3. `mockFetch.ts`에서 `new Response()` 대신 **직접 JSON을 반환**하여 React Native 환경에서 오류 방지.

```typescript
if (process.env.NODE_ENV === 'development') {
  global.fetch = mockFetch as any;
  console.log('📢 Mock API 활성화됨');
}
```

---

## 🚀 TODO 및 향후 계획

- [ ] 실시간 도착 정보 API 연동
- [ ] 다국어 지원
- [ ] iOS & Android 네이티브 최적화
- [ ] `react-native-reanimated-carousel`을 활용한 UX 개선

이제 프로젝트를 본격적으로 시작해봅시다! 🚀
