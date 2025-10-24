import React, { useState, useEffect } from 'react';
import { Heart, Activity, Target, TrendingUp, FileText, CheckCircle, Utensils, Moon, 
         Dumbbell, Calendar, Stethoscope, Coffee, Pill, Apple, ChevronRight, User,
         Droplets, Zap, Clock, Settings, Link as LinkIcon, Bell, Shield } from 'lucide-react';

export default function HealthcareApp() {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userData, setUserData] = useState({
    name: '', age: '', gender: '', height: '', weight: '',
    smoking: '', drinking: '',
    conditions: [], familyHistory: [],
    exerciseFreq: '', sleepQuality: '', sleepHours: '',
    goals: [], selectedPlan: '',
    selectedMeal: null, selectedHealthFood: null, selectedDrink: null, selectedSupplements: []
  });
  
  const [agreed, setAgreed] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [dashboardTab, setDashboardTab] = useState('home');
  const [reportTab, setReportTab] = useState('daily');

  // 로딩 효과
  useEffect(() => {
    if (currentStep === 'loading') {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCurrentStep('survey'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'analysis') {
      setAnalyzing(true);
      setAnalysisProgress(0);
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setAnalyzing(false), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const bmi = userData.weight && userData.height 
    ? (userData.weight / Math.pow(userData.height / 100, 2)).toFixed(1)
    : null;

  // 1. 환영 화면
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">종합 헬스케어 프로그램</h1>
          <p className="text-lg text-gray-600 mb-8">당신의 건강한 삶을 위한 맞춤형 솔루션</p>
          <button
            onClick={() => setCurrentStep('basicInfo')}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  // 2. 기본 정보 입력
  if (currentStep === 'basicInfo') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold mb-2">기본 정보 입력</h2>
            <p className="text-gray-600 mb-8">맞춤 건강 관리를 위한 기본 정보를 입력해주세요</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">이름</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="홍길동"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">나이</label>
                  <input
                    type="number"
                    value={userData.age}
                    onChange={(e) => setUserData({...userData, age: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">성별</label>
                  <select
                    value={userData.gender}
                    onChange={(e) => setUserData({...userData, gender: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">선택</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">키 (cm)</label>
                  <input
                    type="number"
                    value={userData.height}
                    onChange={(e) => setUserData({...userData, height: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="170"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">체중 (kg)</label>
                  <input
                    type="number"
                    value={userData.weight}
                    onChange={(e) => setUserData({...userData, weight: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="70"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => setCurrentStep('welcome')} 
                className="flex-1 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                이전
              </button>
              <button 
                onClick={() => setCurrentStep('consent')} 
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. 국가건강검진 데이터 동의
  if (currentStep === 'consent') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <div className="text-center mb-8">
              <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">국가건강검진 데이터 연동</h2>
              <p className="text-gray-600">더 정확한 건강 분석을 위해 건강검진 데이터를 연동합니다</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3">연동되는 정보</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>혈압, 혈당, 콜레스테롤 등 기본 검진 결과</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>과거 질병 이력 및 진료 기록</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>가족력 정보</span>
                </li>
              </ul>
            </div>

            <label className="flex items-start space-x-3 mb-8 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 mt-1"
              />
              <span className="text-sm">개인정보 수집 및 이용에 동의합니다</span>
            </label>

            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentStep('basicInfo')} 
                className="flex-1 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                이전
              </button>
              <button
                onClick={() => setCurrentStep('loading')}
                disabled={!agreed}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-indigo-700 transition-colors"
              >
                연동하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. 데이터 연동 중
  if (currentStep === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md">
          <Activity className="w-16 h-16 text-indigo-600 mx-auto mb-6 animate-pulse" />
          <h3 className="text-2xl font-bold mb-4">건강검진 데이터 열람 중...</h3>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-gray-600">{loadingProgress}%</p>
        </div>
      </div>
    );
  }

  // 5. 간단한 건강 설문
  if (currentStep === 'survey') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold mb-2">건강 설문</h2>
            <p className="text-gray-600 mb-8">몇 가지 질문에 답변해주세요</p>

            <div className="space-y-8">
              {/* 흡연 여부 */}
              <div>
                <label className="block text-sm font-medium mb-3">흡연 여부</label>
                <div className="space-y-2">
                  {['비흡연', '과거흡연', '현재흡연'].map(option => (
                    <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="smoking"
                        checked={userData.smoking === option}
                        onChange={() => setUserData({...userData, smoking: option})}
                        className="mr-3"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 음주 빈도 */}
              <div>
                <label className="block text-sm font-medium mb-3">음주 빈도</label>
                <div className="space-y-2">
                  {['거의 안함', '주 1-2회', '주 3-4회', '거의 매일'].map(option => (
                    <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="drinking"
                        checked={userData.drinking === option}
                        onChange={() => setUserData({...userData, drinking: option})}
                        className="mr-3"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 기저 질환 */}
              <div>
                <label className="block text-sm font-medium mb-3">기저 질환 (복수선택 가능)</label>
                <div className="space-y-2">
                  {['없음', '고혈압', '당뇨', '고지혈증', '심장질환'].map(option => (
                    <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={userData.conditions.includes(option)}
                        onChange={(e) => {
                          if (option === '없음') {
                            setUserData({...userData, conditions: e.target.checked ? ['없음'] : []});
                          } else {
                            const newConditions = e.target.checked
                              ? [...userData.conditions.filter(c => c !== '없음'), option]
                              : userData.conditions.filter(c => c !== option);
                            setUserData({...userData, conditions: newConditions});
                          }
                        }}
                        className="mr-3"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 가족력 */}
              <div>
                <label className="block text-sm font-medium mb-3">부모, 형제, 자매 중 앓았던 질환 (복수선택 가능)</label>
                <div className="space-y-2">
                  {['없음', '뇌졸중', '심근경색', '고혈압', '당뇨', '기타'].map(option => (
                    <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={userData.familyHistory.includes(option)}
                        onChange={(e) => {
                          if (option === '없음') {
                            setUserData({...userData, familyHistory: e.target.checked ? ['없음'] : []});
                          } else {
                            const newHistory = e.target.checked
                              ? [...userData.familyHistory.filter(h => h !== '없음'), option]
                              : userData.familyHistory.filter(h => h !== option);
                            setUserData({...userData, familyHistory: newHistory});
                          }
                        }}
                        className="mr-3"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 운동 빈도 */}
              <div>
                <label className="block text-sm font-medium mb-3">운동 빈도</label>
                <div className="space-y-2">
                  {['거의 안함', '주 1-2회', '주 3-4회', '주 5회 이상'].map(option => (
                    <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="exercise"
                        checked={userData.exerciseFreq === option}
                        onChange={() => setUserData({...userData, exerciseFreq: option})}
                        className="mr-3"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 수면 상태 */}
              <div>
                <label className="block text-sm font-medium mb-3">스스로 생각하는 수면 상태</label>
                <div className="space-y-2">
                  {['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'].map(option => (
                    <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="sleep"
                        checked={userData.sleepQuality === option}
                        onChange={() => setUserData({...userData, sleepQuality: option})}
                        className="mr-3"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 수면 시간 */}
              <div>
                <label className="block text-sm font-medium mb-2">평균 수면 시간 (시간)</label>
                <input
                  type="number"
                  value={userData.sleepHours}
                  onChange={(e) => setUserData({...userData, sleepHours: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="7"
                  step="0.5"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => setCurrentStep('consent')} 
                className="flex-1 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                이전
              </button>
              <button
                onClick={() => setCurrentStep('analysis')}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                분석 시작
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. AI 분석 중
  if (currentStep === 'analysis' && analyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Activity className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold mb-2">AI 건강 분석 중</h3>
          <p className="text-gray-600 mb-6">당신의 건강 데이터를 분석하고 있습니다</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${analysisProgress}%` }}
            ></div>
          </div>
          <p className="text-gray-600">{analysisProgress}%</p>
        </div>
      </div>
    );
  }

  // 7. AI 건강 분석 리포트
  if (currentStep === 'analysis' && !analyzing) {
    // 건강검진 결과 데이터 (설문 기반 생성)
    const healthCheckData = {
      bloodPressure: userData.conditions.includes('고혈압') ? '145/95' : '120/80',
      bloodSugar: userData.conditions.includes('당뇨') ? 135 : 95,
      cholesterol: userData.conditions.includes('고지혈증') ? 250 : 180,
      hdl: userData.conditions.includes('고지혈증') ? 38 : 55,
      ldl: userData.conditions.includes('고지혈증') ? 160 : 110,
      triglyceride: userData.conditions.includes('고지혈증') ? 200 : 120
    };

    // 체성분 데이터
    const bodyComposition = {
      bodyFat: parseFloat(bmi) >= 25 ? '28.5' : '22.3',
      muscleMass: parseFloat(bmi) < 18.5 ? '45.2' : '52.8',
      bmi: bmi
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">AI 건강 분석 완료</h2>
              <p className="text-gray-600">{userData.name}님의 종합 건강 리포트</p>
            </div>

            {/* 체성분 분석 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <div className="w-2 h-6 bg-indigo-600 mr-3"></div>
                체성분 분석
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="text-sm text-gray-600 mb-1">BMI</div>
                  <div className="text-3xl font-bold text-blue-600">{bodyComposition.bmi}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {parseFloat(bmi) < 18.5 ? '저체중' : parseFloat(bmi) < 23 ? '정상' : parseFloat(bmi) < 25 ? '과체중' : '비만'}
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="text-sm text-gray-600 mb-1">체지방률</div>
                  <div className="text-3xl font-bold text-green-600">{bodyComposition.bodyFat}%</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {parseFloat(bodyComposition.bodyFat) > 25 ? '높음' : '정상'}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="text-sm text-gray-600 mb-1">골격근량</div>
                  <div className="text-3xl font-bold text-purple-600">{bodyComposition.muscleMass}kg</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {parseFloat(bodyComposition.muscleMass) < 50 ? '부족' : '양호'}
                  </div>
                </div>
              </div>
            </div>

            {/* 국가건강검진 결과 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <div className="w-2 h-6 bg-green-600 mr-3"></div>
                국가건강검진 결과
              </h3>
              <div className="grid gap-4">
                <div className={`${userData.conditions.includes('고혈압') ? 'bg-red-50 border-red-200' : 'bg-green-50'} rounded-xl p-6 border-2`}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">혈압</div>
                      <div className="text-xl font-bold">{healthCheckData.bloodPressure} mmHg</div>
                      {userData.conditions.includes('고혈압') && (
                        <div className="text-xs text-red-600 mt-1">⚠️ 주의 필요</div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">공복 혈당</div>
                      <div className="text-xl font-bold">{healthCheckData.bloodSugar} mg/dL</div>
                      {userData.conditions.includes('당뇨') && (
                        <div className="text-xs text-red-600 mt-1">⚠️ 주의 필요</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`${userData.conditions.includes('고지혈증') ? 'bg-orange-50 border-orange-200' : 'bg-blue-50'} rounded-xl p-6 border-2`}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">총 콜레스테롤</div>
                      <div className="text-lg font-bold">{healthCheckData.cholesterol}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">HDL</div>
                      <div className="text-lg font-bold">{healthCheckData.hdl}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">LDL</div>
                      <div className="text-lg font-bold">{healthCheckData.ldl}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">중성지방</div>
                      <div className="text-lg font-bold">{healthCheckData.triglyceride}</div>
                    </div>
                  </div>
                  {userData.conditions.includes('고지혈증') && (
                    <div className="text-xs text-orange-600 mt-3">⚠️ 콜레스테롤 수치 관리 필요</div>
                  )}
                </div>
              </div>
            </div>

            {/* 건강 위험 요소 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <div className="w-2 h-6 bg-orange-600 mr-3"></div>
                건강 위험 요소
              </h3>
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                <div className="space-y-3">
                  {userData.conditions.filter(c => c !== '없음').map((condition, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mr-3"></div>
                      <span className="text-sm font-medium">{condition}</span>
                    </div>
                  ))}
                  {userData.familyHistory.filter(h => h !== '없음').map((history, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-orange-400 mr-3"></div>
                      <span className="text-sm">가족력: {history}</span>
                    </div>
                  ))}
                  {userData.smoking === '현재흡연' && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                      <span className="text-sm font-medium">흡연</span>
                    </div>
                  )}
                  {(userData.drinking === '주 3-4회' || userData.drinking === '거의 매일') && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mr-3"></div>
                      <span className="text-sm">과음 ({userData.drinking})</span>
                    </div>
                  )}
                  {userData.exerciseFreq === '거의 안함' && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-3"></div>
                      <span className="text-sm">운동 부족</span>
                    </div>
                  )}
                  {(userData.sleepQuality === '나쁨' || userData.sleepQuality === '매우 나쁨') && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-3"></div>
                      <span className="text-sm">수면의 질 저하</span>
                    </div>
                  )}
                  {(userData.conditions.filter(c => c !== '없음').length === 0 && 
                    userData.familyHistory.filter(h => h !== '없음').length === 0 &&
                    userData.smoking !== '현재흡연' &&
                    userData.drinking !== '주 3-4회' && userData.drinking !== '거의 매일' &&
                    userData.exerciseFreq !== '거의 안함' &&
                    userData.sleepQuality !== '나쁨' && userData.sleepQuality !== '매우 나쁨') && (
                    <div className="flex items-center">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                      <span className="text-sm font-medium">특이사항 없음</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AI 건강 총평 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <div className="w-2 h-6 bg-indigo-600 mr-3"></div>
                AI 건강 총평
              </h3>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
                <p className="text-base text-gray-800 leading-relaxed">
                  <strong className="text-indigo-700">{userData.name}님의 종합 건강 상태:</strong><br/><br/>
                  
                  {/* BMI 평가 */}
                  {parseFloat(bmi) >= 25 ? '현재 BMI가 정상 범위를 초과하여 체중 관리가 필요합니다. ' : 
                   parseFloat(bmi) < 18.5 ? '현재 BMI가 낮아 영양 섭취와 근력 강화가 필요합니다. ' : 
                   '체중은 정상 범위를 유지하고 있습니다. '}
                  
                  {/* 질환별 평가 */}
                  {userData.conditions.includes('고혈압') && '고혈압 관리를 위해 저염식과 규칙적인 유산소 운동이 필요합니다. '}
                  {userData.conditions.includes('당뇨') && '혈당 조절을 위한 규칙적인 운동과 식단 관리가 중요합니다. '}
                  {userData.conditions.includes('고지혈증') && '콜레스테롤 수치 개선을 위해 저지방 식단을 권장합니다. '}
                  {userData.conditions.includes('심장질환') && '심장 건강을 위해 스트레스 관리와 규칙적인 검진이 중요합니다. '}
                  
                  {/* 가족력 평가 */}
                  {userData.familyHistory.includes('뇌졸중') && '가족력이 있어 뇌졸중 예방을 위한 혈압 관리가 중요합니다. '}
                  {userData.familyHistory.includes('심근경색') && '가족력이 있어 심혈관 질환 예방이 필요합니다. '}
                  {userData.familyHistory.includes('당뇨') && '가족력이 있어 혈당 수치를 주기적으로 확인하시길 권장합니다. '}
                  
                  {/* 생활습관 평가 */}
                  {userData.exerciseFreq === '거의 안함' && '주 3회 이상 규칙적인 운동을 시작하시길 권장드립니다. '}
                  {userData.smoking === '현재흡연' && '금연을 통한 건강 회복을 강력히 권장합니다. '}
                  {(userData.drinking === '주 3-4회' || userData.drinking === '거의 매일') && '음주량 조절이 필요합니다. '}
                  {(userData.sleepQuality === '나쁨' || userData.sleepQuality === '매우 나쁨') && '수면의 질 개선을 위한 생활습관 개선이 필요합니다. '}
                  
                  <br/>꾸준한 건강 관리를 통해 더 나은 건강 상태를 유지하실 수 있습니다.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep('goal')}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              건강 목표 설정하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 8. 목표 설정
  if (currentStep === 'goal') {
    const goals = userData.goals || [];
    
    const baseGoals = [
      { id: 'weight-loss', title: '체중 감량', icon: TrendingUp, desc: '건강한 체중 관리' },
      { id: 'muscle', title: '근력 강화', icon: Dumbbell, desc: '근육량 증가' },
      { id: 'sleep', title: '수면 관리', icon: Moon, desc: '수면의 질 개선' },
      { id: 'skin', title: '피부 건강', icon: Heart, desc: '피부 상태 개선' },
      { id: 'health', title: '건강 관리', icon: Target, desc: '전반적 건강 증진' }
    ];

    const allGoals = [...baseGoals];
    
    // AI 추천 목표 추가
    if (userData.conditions.includes('당뇨')) {
      allGoals.push({ id: 'diabetes', title: '당뇨 관리', icon: Activity, desc: '혈당 수치 관리' });
    }
    if (userData.conditions.includes('고혈압')) {
      allGoals.push({ id: 'blood-pressure', title: '혈압 관리', icon: Heart, desc: '혈압 정상화' });
    }
    if (userData.conditions.includes('고지혈증')) {
      allGoals.push({ id: 'cholesterol', title: '콜레스테롤 관리', icon: TrendingUp, desc: '지질 수치 개선' });
    }

    const recommendations = [];
    if (parseFloat(bmi) >= 25) recommendations.push('weight-loss');
    if (parseFloat(bmi) < 18.5) recommendations.push('muscle');
    if (userData.sleepQuality === '나쁨' || userData.sleepQuality === '매우 나쁨' || parseFloat(userData.sleepHours) < 6) recommendations.push('sleep');
    if (userData.conditions.includes('당뇨')) recommendations.push('diabetes');
    if (userData.conditions.includes('고혈압')) recommendations.push('blood-pressure');
    if (userData.conditions.includes('고지혈증')) recommendations.push('cholesterol');

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold mb-2">건강 목표 설정</h2>
            <p className="text-sm text-indigo-600 mb-8">💡 복수 선택 가능합니다</p>
            
            <div className="grid gap-4 mb-8">
              {allGoals.map((goal) => {
                const Icon = goal.icon;
                const isSelected = goals.includes(goal.id);
                const isRecommended = recommendations.includes(goal.id);
                
                return (
                  <div
                    key={goal.id}
                    onClick={() => {
                      if (isSelected) {
                        setUserData({...userData, goals: goals.filter(g => g !== goal.id)});
                      } else {
                        setUserData({...userData, goals: [...goals, goal.id]});
                      }
                    }}
                    className={`p-6 border-2 rounded-xl cursor-pointer relative transition-all ${
                      isSelected ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    {isRecommended && (
                      <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        AI 추천
                      </div>
                    )}
                    <div className="flex items-center">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-indigo-600' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-semibold">{goal.title}</h3>
                        <p className="text-sm text-gray-600">{goal.desc}</p>
                      </div>
                      {isSelected && <CheckCircle className="w-6 h-6 text-indigo-600" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentStep('analysis')} 
                className="flex-1 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                이전
              </button>
              <button
                onClick={() => setCurrentStep('plans')}
                disabled={goals.length === 0}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-indigo-700 transition-colors"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 9. 플랜 선택
  if (currentStep === 'plans') {
    const plans = [
      {
        id: 'starter',
        name: 'Starter',
        price: '39,900',
        badge: null,
        features: [
          '주 3회 식사대용 건강식품',
          '주 3회 음료 & 차',
          '기본 건강 리포트 (일일)'
        ],
        description: '체험형 플랜'
      },
      {
        id: 'standard',
        name: 'Standard',
        price: '65,900',
        badge: '🔥 인기',
        features: [
          '주 5회 식사대용 건강식품',
          '주 5회 음료 & 차',
          '1-2종 건강보조제',
          '심화 건강 리포트 (일일, 주간, 월간)'
        ],
        description: '건강한 습관 만들기'
      },
      {
        id: 'premium',
        name: 'Premium',
        price: '189,000',
        badge: '⭐ 추천',
        features: [
          '주 5회 건강한 식사',
          '주 5회 식사대용 건강식품',
          '주 5회 음료 & 차',
          '3-4종 건강보조제',
          '심화 건강 리포트 + AI 건강 상담'
        ],
        description: '프리미엄 건강 관리'
      }
    ];

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold mb-2 text-center">플랜 선택</h2>
            <p className="text-gray-600 mb-10 text-center">당신에게 맞는 헬스케어 플랜을 선택하세요</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => {
                const isSelected = userData.selectedPlan === plan.id;
                
                return (
                  <div
                    key={plan.id}
                    onClick={() => setUserData({...userData, selectedPlan: plan.id})}
                    className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      isSelected ? 'border-indigo-600 bg-indigo-50 shadow-xl scale-105' : 'border-gray-200 hover:border-indigo-300 hover:shadow-lg'
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                        {plan.badge}
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-3xl font-bold text-indigo-600">₩{plan.price}</span>
                        <span className="text-gray-600 ml-1">~/월</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {isSelected && (
                      <div className="absolute top-6 right-6">
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentStep('goal')} 
                className="flex-1 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                이전
              </button>
              <button
                onClick={() => setCurrentStep('foods')}
                disabled={!userData.selectedPlan}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-indigo-700 transition-colors"
              >
                식품 선택하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 10. 식품 선택
  if (currentStep === 'foods') {
    // 목표 기반 식단 추천
    const getMealOptions = () => {
      const hasWeightLoss = userData.goals.includes('weight-loss');
      const hasMuscle = userData.goals.includes('muscle');
      const hasDiabetes = userData.goals.includes('diabetes');
      
      if (hasWeightLoss) {
        return [
          { id: 'low-cal', name: '저칼로리 균형식', desc: '500kcal, 단백질 30g', price: 0 },
          { id: 'keto', name: '케토제닉 식단', desc: '450kcal, 지방 중심', price: 5000 },
          { id: 'intermittent', name: '간헐적 단식 세트', desc: '600kcal, 영양 밀도 높음', price: 3000 },
          { id: 'vegan-diet', name: '비건 다이어트', desc: '480kcal, 식물성', price: 4000 }
        ];
      } else if (hasMuscle) {
        return [
          { id: 'high-protein', name: '고단백 식단', desc: '700kcal, 단백질 50g', price: 6000 },
          { id: 'muscle-gain', name: '근육 증가 세트', desc: '800kcal, 단백질 60g', price: 8000 },
          { id: 'athlete', name: '운동선수 식단', desc: '900kcal, 균형잡힌 영양', price: 10000 },
          { id: 'power-meal', name: '파워 밀', desc: '750kcal, 복합 탄수화물', price: 7000 }
        ];
      } else if (hasDiabetes) {
        return [
          { id: 'low-gi', name: '저GI 식단', desc: '550kcal, 혈당 안정', price: 5000 },
          { id: 'diabetes-care', name: '당뇨 케어 세트', desc: '600kcal, 식이섬유 풍부', price: 7000 },
          { id: 'sugar-control', name: '혈당 조절 식단', desc: '580kcal, 복합탄수화물', price: 6000 },
          { id: 'balanced-dia', name: '균형 당뇨식', desc: '620kcal, 전문 영양사 설계', price: 8000 }
        ];
      } else {
        return [
          { id: 'balanced', name: '균형 잡힌 식단', desc: '650kcal, 영양 균형', price: 0 },
          { id: 'mediterranean', name: '지중해식 식단', desc: '700kcal, 심장 건강', price: 5000 },
          { id: 'korean-healthy', name: '한식 건강식', desc: '600kcal, 전통 한식', price: 4000 },
          { id: 'immunity', name: '면역력 강화식', desc: '680kcal, 항산화 성분', price: 6000 }
        ];
      }
    };

    const getHealthFoodOptions = () => {
      return [
        { id: 'protein-shake', name: '프로틴 쉐이크', desc: '단백질 25g, 바닐라맛', price: 0 },
        { id: 'meal-bar', name: '식사대용 바', desc: '영양 균형, 초콜릿맛', price: 2000 },
        { id: 'smoothie', name: '그린 스무디', desc: '채소+과일, 식이섬유', price: 3000 },
        { id: 'nutrition-pack', name: '올인원 영양팩', desc: '완전식, 모든 영양소', price: 5000 }
      ];
    };

    const getDrinkOptions = () => {
      return [
        { id: 'green-tea', name: '유기농 녹차', desc: '항산화, 카페인 적음', price: 0 },
        { id: 'herbal-tea', name: '허브티 세트', desc: '캐모마일+페퍼민트', price: 2000 },
        { id: 'detox-juice', name: '디톡스 주스', desc: '해독, 비타민 풍부', price: 4000 },
        { id: 'collagen-drink', name: '콜라겐 드링크', desc: '피부 건강, 저칼로리', price: 5000 }
      ];
    };

    const getSupplementRecommendations = () => {
      const supplements = [];
      
      if (userData.conditions.includes('고혈압') || userData.familyHistory.includes('고혈압')) {
        supplements.push({ id: 'omega3', name: '오메가3', desc: '심혈관 건강' });
      }
      if (userData.conditions.includes('당뇨') || userData.familyHistory.includes('당뇨')) {
        supplements.push({ id: 'chromium', name: '크롬 피콜리네이트', desc: '혈당 조절' });
      }
      if (userData.goals.includes('muscle')) {
        supplements.push({ id: 'bcaa', name: 'BCAA', desc: '근육 회복' });
      }
      if (userData.sleepQuality === '나쁨' || userData.sleepQuality === '매우 나쁨') {
        supplements.push({ id: 'magnesium', name: '마그네슘', desc: '수면 개선' });
      }
      if (userData.age >= 40) {
        supplements.push({ id: 'vitaminD', name: '비타민D', desc: '뼈 건강' });
      }
      
      // 기본 영양제
      if (supplements.length < 2) {
        supplements.push({ id: 'multivitamin', name: '종합비타민', desc: '전반적 건강' });
      }
      if (supplements.length < 3) {
        supplements.push({ id: 'probiotic', name: '프로바이오틱스', desc: '장 건강' });
      }
      
      return supplements.slice(0, 4);
    };

    const mealOptions = getMealOptions();
    const healthFoodOptions = getHealthFoodOptions();
    const drinkOptions = getDrinkOptions();
    const supplementOptions = getSupplementRecommendations();

    const showMeals = userData.selectedPlan === 'premium';
    const showSupplements = userData.selectedPlan === 'standard' || userData.selectedPlan === 'premium';

    return (
      <div className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold mb-2">식품 선택</h2>
            <p className="text-gray-600 mb-8">
              {userData.selectedPlan === 'premium' && '프리미엄 플랜: 건강한 식사 + 건강식품 + 음료 + 보조제'}
              {userData.selectedPlan === 'standard' && '스탠다드 플랜: 건강식품 + 음료 + 보조제'}
              {userData.selectedPlan === 'starter' && '스타터 플랜: 건강식품 + 음료'}
            </p>

            <div className="space-y-10">
              {/* Premium: 건강한 식사 */}
              {showMeals && (
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Utensils className="w-6 h-6 mr-2 text-indigo-600" />
                    건강한 식사 (주 5회)
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">목표에 맞는 식단을 선택하세요</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mealOptions.map((meal) => {
                      const isSelected = userData.selectedMeal === meal.id;
                      return (
                        <div
                          key={meal.id}
                          onClick={() => setUserData({...userData, selectedMeal: meal.id})}
                          className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                            isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg">{meal.name}</h4>
                            {meal.price > 0 && (
                              <span className="text-sm text-indigo-600 font-semibold">+₩{meal.price.toLocaleString()}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{meal.desc}</p>
                          {isSelected && (
                            <div className="flex items-center text-indigo-600 text-sm font-semibold">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              선택됨
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 식사대용 건강식품 */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Apple className="w-6 h-6 mr-2 text-green-600" />
                  식사대용 건강식품 (주 {userData.selectedPlan === 'starter' ? '3' : '5'}회)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {healthFoodOptions.map((food) => {
                    const isSelected = userData.selectedHealthFood === food.id;
                    return (
                      <div
                        key={food.id}
                        onClick={() => setUserData({...userData, selectedHealthFood: food.id})}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          isSelected ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg">{food.name}</h4>
                          {food.price > 0 && (
                            <span className="text-sm text-green-600 font-semibold">+₩{food.price.toLocaleString()}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{food.desc}</p>
                        {isSelected && (
                          <div className="flex items-center text-green-600 text-sm font-semibold">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            선택됨
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 음료 & 차 */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Coffee className="w-6 h-6 mr-2 text-orange-600" />
                  음료 & 차 (주 {userData.selectedPlan === 'starter' ? '3' : '5'}회)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {drinkOptions.map((drink) => {
                    const isSelected = userData.selectedDrink === drink.id;
                    return (
                      <div
                        key={drink.id}
                        onClick={() => setUserData({...userData, selectedDrink: drink.id})}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          isSelected ? 'border-orange-600 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg">{drink.name}</h4>
                          {drink.price > 0 && (
                            <span className="text-sm text-orange-600 font-semibold">+₩{drink.price.toLocaleString()}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{drink.desc}</p>
                        {isSelected && (
                          <div className="flex items-center text-orange-600 text-sm font-semibold">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            선택됨
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 건강보조제 (Standard, Premium) */}
              {showSupplements && (
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Pill className="w-6 h-6 mr-2 text-purple-600" />
                    건강보조제 ({userData.selectedPlan === 'standard' ? '1-2종' : '3-4종'}) - AI 추천
                  </h3>
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-4">
                    <p className="text-sm text-purple-900">
                      <strong>💡 AI가 {userData.name}님의 건강 상태를 분석하여 최적의 영양제를 추천했습니다.</strong><br/>
                      아래 추천 영양제가 마음에 들지 않으면 변경할 수 있습니다.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {supplementOptions.map((supplement) => (
                      <div
                        key={supplement.id}
                        className="p-5 border-2 border-purple-600 bg-purple-50 rounded-xl"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                            <h4 className="font-bold text-lg">{supplement.name}</h4>
                          </div>
                          <button className="text-xs text-purple-600 underline">변경</button>
                        </div>
                        <p className="text-sm text-gray-600 ml-7">{supplement.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 선택 완료 버튼 */}
            <div className="mt-10 flex gap-4">
              <button 
                onClick={() => setCurrentStep('plans')} 
                className="flex-1 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                이전
              </button>
              <button
                onClick={() => {
                  // 선택 완료 시 영양제 자동 설정
                  if (showSupplements && userData.selectedSupplements.length === 0) {
                    setUserData({
                      ...userData,
                      selectedSupplements: supplementOptions.map(s => s.id)
                    });
                  }
                  setCurrentStep('dashboard');
                }}
                disabled={
                  !userData.selectedHealthFood || 
                  !userData.selectedDrink || 
                  (showMeals && !userData.selectedMeal)
                }
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-indigo-700 transition-colors"
              >
                선택 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 대시보드
  if (currentStep === 'dashboard') {
    // 홈 탭
    if (dashboardTab === 'home') {
      return (
        <div className="min-h-screen bg-gray-50 pb-20">
          {/* 헤더 */}
          <div className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{userData.name}님의 헬스케어</h1>
                  <p className="text-sm text-gray-600">오늘도 건강한 하루 되세요!</p>
                </div>
              </div>
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto p-4">
            {/* 오늘의 일일 리포트 */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                오늘의 일일 리포트
              </h2>
              <div className="bg-white/20 rounded-xl p-4 mb-4">
                <p className="text-sm mb-2">건강 점수</p>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">85</span>
                  <span className="text-lg ml-2 mb-1">/100</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs mb-1">운동</p>
                  <p className="text-lg font-bold">양호</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs mb-1">식단</p>
                  <p className="text-lg font-bold">우수</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs mb-1">수면</p>
                  <p className="text-lg font-bold">보통</p>
                </div>
              </div>
            </div>

            {/* 웨어러블 데이터 */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">실시간 건강 데이터</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">심박수</span>
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="text-2xl font-bold text-red-600">72 <span className="text-sm">bpm</span></div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">혈중산소포화도</span>
                    <Droplets className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">98<span className="text-sm">%</span></div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">운동량</span>
                    <Activity className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">345<span className="text-sm">kcal</span></div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">수면</span>
                    <Moon className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">7.2<span className="text-sm">시간</span></div>
                </div>
              </div>
            </div>

            {/* 이번 주 제공 식단 */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">이번 주 제공 식단</h3>
              <div className="space-y-3">
                {['월', '화', '수', '목', '금'].map((day, idx) => (
                  <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                        <Utensils className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{day}요일</p>
                        <p className="text-sm text-gray-600">
                          {userData.selectedMeal && '식사 • '}
                          {userData.selectedHealthFood && '건강식품 • '}
                          {userData.selectedDrink && '음료'}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* 건강 목표 진행상황 */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">건강 목표 진행상황</h3>
              <div className="space-y-4">
                {userData.goals.slice(0, 3).map((goalId) => {
                  const goalNames = {
                    'weight-loss': '체중 감량',
                    'muscle': '근력 강화',
                    'sleep': '수면 관리',
                    'skin': '피부 건강',
                    'health': '건강 관리',
                    'diabetes': '당뇨 관리',
                    'blood-pressure': '혈압 관리',
                    'cholesterol': '콜레스테롤 관리'
                  };
                  const progress = Math.floor(Math.random() * 40) + 50;
                  
                  return (
                    <div key={goalId}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{goalNames[goalId]}</span>
                        <span className="text-sm text-gray-600">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all" 
                          style={{width: `${progress}%`}}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 하단 네비게이션 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-around">
              <button
                onClick={() => setDashboardTab('home')}
                className="flex flex-col items-center text-indigo-600"
              >
                <Heart className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">홈</span>
              </button>
              <button
                onClick={() => setDashboardTab('report')}
                className="flex flex-col items-center text-gray-400"
              >
                <FileText className="w-6 h-6 mb-1" />
                <span className="text-xs">건강리포트</span>
              </button>
              <button
                onClick={() => setDashboardTab('mypage')}
                className="flex flex-col items-center text-gray-400"
              >
                <User className="w-6 h-6 mb-1" />
                <span className="text-xs">마이페이지</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 건강리포트 탭
    if (dashboardTab === 'report') {
      return (
        <div className="min-h-screen bg-gray-50 pb-20">
          <div className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">건강 리포트</h1>
            </div>
          </div>

          <div className="max-w-6xl mx-auto p-4">
            {/* 총평 리포트 */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white mb-6">
              <h2 className="text-xl font-bold mb-3">지금까지의 총평</h2>
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sm leading-relaxed">
                  {userData.name}님은 지난 4주간 꾸준히 건강 관리를 실천하셨습니다. 
                  체중이 2.3kg 감소했으며, 평균 수면 시간이 30분 증가했습니다. 
                  꾸준한 운동과 식단 관리로 전반적인 건강 지표가 개선되고 있습니다.
                </p>
              </div>
            </div>

            {/* 리포트 종류 탭 */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              <button
                onClick={() => setReportTab('daily')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  reportTab === 'daily' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                일일 리포트
              </button>
              <button
                onClick={() => setReportTab('weekly')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  reportTab === 'weekly' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                주간 리포트
              </button>
              <button
                onClick={() => setReportTab('monthly')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  reportTab === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                월간 리포트
              </button>
            </div>

            {/* 일일 리포트 */}
            {reportTab === 'daily' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">오늘의 활동</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="w-8 h-8 text-green-500 mr-3" />
                        <div>
                          <p className="font-medium">운동</p>
                          <p className="text-sm text-gray-600">30분 걷기 완료</p>
                        </div>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Utensils className="w-8 h-8 text-orange-500 mr-3" />
                        <div>
                          <p className="font-medium">식단</p>
                          <p className="text-sm text-gray-600">계획된 식사 3/3</p>
                        </div>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Droplets className="w-8 h-8 text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium">수분 섭취</p>
                          <p className="text-sm text-gray-600">1.5L / 2L</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">75%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 주간 리포트 */}
            {reportTab === 'weekly' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">이번 주 활동 요약</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">평균 운동 시간</p>
                      <p className="text-2xl font-bold text-blue-600">35분</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">식단 준수율</p>
                      <p className="text-2xl font-bold text-green-600">85%</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">평균 수면</p>
                      <p className="text-2xl font-bold text-purple-600">7.2시간</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">평균 심박수</p>
                      <p className="text-2xl font-bold text-orange-600">72 bpm</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">주간 총평</p>
                    <p className="text-sm text-gray-700">
                      이번 주는 전반적으로 양호한 한 주였습니다. 
                      꾸준한 운동과 식단 관리로 목표에 한 걸음 다가갔습니다.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 월간 리포트 */}
            {reportTab === 'monthly' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">이번 달 변화</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">체중 변화</span>
                        <span className="text-sm text-green-600 font-bold">-2.3kg ↓</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">체지방률</span>
                        <span className="text-sm text-green-600 font-bold">-1.8% ↓</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '55%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">근육량</span>
                        <span className="text-sm text-blue-600 font-bold">+0.8kg ↑</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '40%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">과거 변화 추이</h3>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700">
                      지난 3개월간 체중이 총 5.2kg 감소했으며, 
                      BMI가 24.8에서 23.1로 개선되었습니다. 
                      꾸준한 노력으로 건강 지표가 지속적으로 향상되고 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 하단 네비게이션 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-around">
              <button
                onClick={() => setDashboardTab('home')}
                className="flex flex-col items-center text-gray-400"
              >
                <Heart className="w-6 h-6 mb-1" />
                <span className="text-xs">홈</span>
              </button>
              <button
                onClick={() => setDashboardTab('report')}
                className="flex flex-col items-center text-indigo-600"
              >
                <FileText className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">건강리포트</span>
              </button>
              <button
                onClick={() => setDashboardTab('mypage')}
                className="flex flex-col items-center text-gray-400"
              >
                <User className="w-6 h-6 mb-1" />
                <span className="text-xs">마이페이지</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 마이페이지 탭
    if (dashboardTab === 'mypage') {
      const planNames = {
        starter: 'Starter',
        standard: 'Standard',
        premium: 'Premium'
      };
      const planPrices = {
        starter: '39,900',
        standard: '65,900',
        premium: '189,000'
      };

      return (
        <div className="min-h-screen bg-gray-50 pb-20">
          <div className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">마이페이지</h1>
            </div>
          </div>

          <div className="max-w-6xl mx-auto p-4">
            {/* 프로필 */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-4">
                  {userData.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{userData.name}</h3>
                  <p className="text-gray-600">{userData.age}세 • {userData.gender === 'male' ? '남성' : '여성'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">키</p>
                  <p className="text-lg font-bold">{userData.height}cm</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">체중</p>
                  <p className="text-lg font-bold">{userData.weight}kg</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">BMI</p>
                  <p className="text-lg font-bold">{bmi}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">가입일</p>
                  <p className="text-lg font-bold">2025.10</p>
                </div>
              </div>
            </div>

            {/* 구독 플랜 */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">구독 플랜</h3>
                <button className="text-sm text-indigo-600 font-semibold">변경</button>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-2xl font-bold">{planNames[userData.selectedPlan]}</h4>
                  <Shield className="w-8 h-8" />
                </div>
                <p className="text-3xl font-bold mb-2">₩{planPrices[userData.selectedPlan]}<span className="text-lg">~/월</span></p>
                <p className="text-sm opacity-90">다음 결제일: 2025.11.24</p>
              </div>
            </div>

            {/* 로그인 정보 */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">로그인 정보</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">이메일</p>
                    <p className="font-medium">example@email.com</p>
                  </div>
                  <button className="text-sm text-indigo-600">수정</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">비밀번호</p>
                    <p className="font-medium">••••••••</p>
                  </div>
                  <button className="text-sm text-indigo-600">변경</button>
                </div>
              </div>
            </div>

            {/* 웨어러블 장비 */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">웨어러블 장비</h3>
                <button className="text-sm text-indigo-600 font-semibold flex items-center">
                  <LinkIcon className="w-4 h-4 mr-1" />
                  연결
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <p className="font-semibold">Apple Watch Series 9</p>
                      <p className="text-sm text-green-600">연결됨</p>
                    </div>
                  </div>
                  <button className="text-sm text-gray-600">관리</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="w-8 h-8 text-gray-400 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-600">새 기기 추가</p>
                      <p className="text-sm text-gray-500">다른 웨어러블 장비 연결</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* 설정 */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">설정</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>알림 설정</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>개인정보 처리방침</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>서비스 이용약관</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors text-red-600">
                  <span>로그아웃</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* 하단 네비게이션 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-around">
              <button
                onClick={() => setDashboardTab('home')}
                className="flex flex-col items-center text-gray-400"
              >
                <Heart className="w-6 h-6 mb-1" />
                <span className="text-xs">홈</span>
              </button>
              <button
                onClick={() => setDashboardTab('report')}
                className="flex flex-col items-center text-gray-400"
              >
                <FileText className="w-6 h-6 mb-1" />
                <span className="text-xs">건강리포트</span>
              </button>
              <button
                onClick={() => setDashboardTab('mypage')}
                className="flex flex-col items-center text-indigo-600"
              >
                <User className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">마이페이지</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return <div className="min-h-screen flex items-center justify-center"><p>현재 단계: {currentStep}</p></div>;
}
