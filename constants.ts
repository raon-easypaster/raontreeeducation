import { PromptCategory } from './types';

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    id: 'styleFormat',
    label: '스타일 및 형식',
    placeholder: '예: 영화 스틸컷, 애니메이션, 수채화',
    options: ['자동', '실사 사진', '영화 스틸컷', '애니메이션 스크린샷', '디지털 페인팅', '판타지 아트', 'SF 컨셉 아트', '수채화', '유화', '3D 렌더', '로우 폴리']
  },
  {
    id: 'sceneOutline',
    label: '장면 개요',
    placeholder: '주요 대상과 배경을 설명하세요',
    options: ['자동']
  },
  {
    id: 'cameraShotComposition',
    label: '카메라 샷 및 구도',
    placeholder: '예: 풀샷, 3분할법',
    options: ['자동', '풀샷', '미디엄 샷', '클로즈업 샷', '익스트림 클로즈업', '설정 샷', '3분할법', '중앙 집중 구도', '유도선', '대칭']
  },
  {
    id: 'cameraAngleMovement',
    label: '카메라 각도 및 움직임',
    placeholder: '예: 아이레벨, 하이앵글',
    options: ['자동', '아이레벨', '하이앵글', '로우앵글', '더치 앵글', '조감도', '앙시점', '고정 샷']
  },
  {
    id: 'lighting',
    label: '조명',
    placeholder: '예: 골든아워, 네온 누아르',
    options: ['자동', '골든아워', '블루아워', '흐린 날', '직사광선', '스튜디오 조명', '림 라이트', '볼륨 조명', '네온 누아르', '영화적 조명']
  },
  {
    id: 'finalPalette',
    label: '최종 색상 팔레트',
    placeholder: '예: 파스텔 색상, 단색',
    options: ['자동', '생생하고 채도 높은 색상', '파스텔 색상', '단색', '차분한 톤', '삼색配色', '보색', '사이버펑크 네온']
  },
  {
    id: 'finalStyleNotes',
    label: '최종 스타일 노트',
    placeholder: '예: 고세밀, 8K, 언리얼 엔진',
    options: ['자동', '고세밀', '정교한 디테일', '8K 해상도', '아트스테이션 트렌딩', '언리얼 엔진 5', '옥테인 렌더', '레이 트레이싱', '선명한 초점']
  },
  {
    id: 'aspectRatio',
    label: '화면 비율',
    placeholder: '예: 16:9 (와이드), 1:1 (정사각형)',
    options: ['자동', '1:1', '16:9', '9:16', '4:3', '3:4']
  }
];