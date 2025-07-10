import React, { useState } from 'react'
import { Calendar, Clock, Users, Target, Lightbulb, Cog, CheckCircle, FileText, BarChart2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
// import './App.css' // This line caused the error and has been removed.

function App() {
  const [activeWeek, setActiveWeek] = useState(1)

  // 7주차 데이터
  const weeklyData = [
    {
      week: 1,
      title: "프로젝트 착수 및 문제 정의",
      icon: Target,
      color: "bg-red-500",
      content: {
        meeting: "IC-PBL+ 프로젝트의 주제로 '로봇 지능' 분야, 특히 최근 LLM/VLM이 활발히 적용되는 로봇 계획(Robot Planning)을 다루어보자. 가장 영향력 있는 최신 연구를 분석하는 것부터 시작하자. SuSIE 논문을 분석해보니, 제로샷 일반화는 뛰어나지만 실제 로봇의 물리적, 시간적 제약을 전혀 고려하지 못한다. 이것을 우리 프로젝트의 핵심 문제로 정의하고 해결 방안을 모색해보자.",
        goal: "현실의 제약을 이해하는 지능형 AI 플래너 개발",
        todos: [
          "[강현] SuSIE 논문의 한계점(정적 계획, 문맥 부재, 비현실성) 심층 분석 및 정리",
          "[민재] 로봇 플래닝 분야 선행 연구 추가 리서치 (SuSIE 외 대안 모델)",
          "[공통] 프로젝트 최종 목표 설정: '현실의 제약을 이해하는 지능형 AI 플래너 개발'"
        ]
      }
    },
    {
      week: 2,
      title: "근본 원인 탐색: '상황 인지'의 부재",
      icon: Lightbulb,
      color: "bg-orange-500",
      content: {
        meeting: "SuSIE의 모든 문제는 결국 플래너가 '현재 상황'을 모르기 때문에 발생한다. 그렇다면 질문은 명확하다. 어떻게 하면 로봇에게 현재 상태의 핵심 의미(Semantic)를 효과적으로 전달할 수 있을까?",
        goal: "단순 픽셀 정보는 너무 방대하고 노이즈가 많다. '팔이 뻗어진 상태', '물체를 쥔 상태'와 같이 추상적이고 압축된 정보가 필요하다. 이 '의미 요약'이 우리 기술의 핵심이 될 것이다.",
        todos: [
          "[민재] 이미지에서 고수준 Semantic 정보를 추출하는 기술(Representation Learning) 리서치",
          "[강현] '상태 요약 정보'가 플래닝에 미치는 영향에 대한 가설 수립",
          "[공통] '의미 요약'을 위한 기술적 방향성(이산화, 군집화 등) 논의"
        ]
      }
    },
    {
      week: 3,
      title: "기술적 돌파구 발견: DisCo-Diff",
      icon: Cog,
      color: "bg-yellow-500",
      content: {
        meeting: "이미지 분포를 몇 개의 '이산 잠재 변수(Discrete Latent Variable)'로 압축하는 DisCo-Diff의 접근법이 우리가 찾던 '의미 요약'과 정확히 일치한다. 이 구조를 차용하면 해결의 실마리를 찾을 수 있겠다.",
        goal: "DisCo-Diff의 이산 잠재 변수는 이미지의 전역적인 모드를 포착하므로, 로봇의 전체적인 상태를 표현하는 데 매우 적합하다. 이것을 '상태 코드북(State Codebook)'으로 정의하고 활용하자.",
        todos: [
          "[강현] DisCo-Diff의 Encoder-Codebook-Decoder 구조 상세 분석",
          "[민재] DisCo-Diff의 이산 잠재 변수를 SuSIE 아키텍처에 통합하는 방안 모색",
          "[공통] 코드북 학습을 위한 시스템 아키텍처 초안 설계"
        ]
      }
    },
    {
      week: 4,
      title: "솔루션 융합 설계: DiscSIE v0.1",
      icon: Cog,
      color: "bg-green-500",
      content: {
        meeting: "SuSIE의 U-Net Cross-Attention에 텍스트뿐만 아니라, 우리가 만든 '상태 코드북' 임베딩을 함께 주입하는 것이 가장 효과적이겠다. '무엇을'과 '현재 어떤 상태에서'라는 두 정보를 동시에 고려하게 되는 것이다.",
        goal: "모델 전체를 재학습하는 것은 비현실적이니, LoRA 기법을 도입해 Cross-Attention 모듈만 효율적으로 튜닝하는 방안을 채택하자. 이는 기술의 실현 가능성을 크게 높여준다.",
        todos: [
          "[민재] 텍스트와 코드북 임베딩의 융합 방식(Concatenation)을 포함한 상세 아키텍처 설계",
          "[강현] LoRA 적용의 기술적 세부 사항 및 예상 효과 정리",
          "[공통] DiscSIE의 핵심 메커니즘(상황 인지, 정보 융합) 최종 확정"
        ]
      }
    },
    {
      week: 5,
      title: "솔루션 고도화: 동적 계획 메커니즘",
      icon: Cog,
      color: "bg-blue-500",
      content: {
        meeting: "이제 SuSIE의 또 다른 한계인 '정적 계획' 문제를 해결하자. '시간'이 아닌, '의미 있는 상태 변화'가 있을 때만 계획을 갱신해야 한다. 우리가 만든 코드북이 바로 그 상태 변화를 측정할 기준이 될 수 있다.",
        goal: "매 스텝마다 코드북 벡터 간의 코사인 유사도를 계산해 '의미론적 진행도(Semantic Progress)'를 측정하고, 이 값이 임계치를 넘을 때만 디퓨전 모델을 호출하여 다음 Subgoal을 생성하는 동적 계획 루프를 설계하자.",
        todos: [
          "[강현] 동적 계획 알고리즘의 순서도(Flowchart) 작성",
          "[민재] progress(t) 함수의 임계값 설정에 대한 논의 및 기준 정립",
          "[공통] '동적 계획' 메커니즘을 최종 솔루션에 통합"
        ]
      }
    },
    {
      week: 6,
      title: "평가 계획 및 논리 검증",
      icon: BarChart2,
      color: "bg-teal-500",
      content: {
        meeting: "실제 실험이 어려운 상황에서, 우리의 아이디어를 어떻게 가장 설득력 있게 증명할 수 있을까? 표준 벤치마크(CALVIN)를 활용한 '예상 성능 평가'가 최선이다.",
        goal: "CALVIN 벤치마크에서 DiscSIE가 SuSIE 대비 연쇄 성공률을 기하급수적으로 향상시키는 이유를 '오류 누적 방지'와 '효율적 시간 배분'이라는 두 가지 근거로 명확히 설명하고, 이를 그래프로 시각화하자.",
        todos: [
          "[민재] CALVIN 및 실제 로봇 환경에서의 예상 성능 수치 추정 및 근거 작성",
          "[강현] 예상 성능을 보여주는 라인/막대 그래프 시각화 자료 제작",
          "[공통] 솔루션 평가(Evaluation) 섹션의 논리 구조 완성"
        ]
      }
    },
    {
      week: 7,
      title: "최종 보고서 및 향후 계획",
      icon: CheckCircle,
      color: "bg-purple-500",
      content: {
        meeting: "지금까지의 과정을 종합하여 최종 보고서를 작성하자. 각 섹션의 내용이 유기적으로 연결되고, 우리의 고민과 해결 과정이 잘 드러나도록 다듬어야 한다.",
        goal: "프로젝트의 한계(2단계 학습, 최적 코드북 사이즈 등)를 명확히 인정하고, 이를 극복하기 위한 향후 연구 계획을 구체적으로 제시하여 프로젝트의 지속적인 발전 가능성을 보여주자.",
        todos: [
          "[강현/민재] 최종 보고서 전체 작성 및 상호 검토/피드백",
          "[공통] 최종 제출 준비"
        ]
      }
    }
  ]

  // 수정된 간트 차트 데이터
  const ganttData = [
    {
      phase: "Phase 1: 문제 정의 및 분석",
      tasks: [
        { name: "1.1. 프로젝트 목표 설정 및 방향성 논의", weeks: [true, false, false, false, false, false, false] },
        { name: "1.2. 선행 연구(SuSIE) 심층 분석 및 한계점 도출", weeks: [true, true, false, false, false, false, false] }
      ]
    },
    {
      phase: "Phase 2: 핵심 기술 탐색 및 설계",
      tasks: [
        { name: "2.1. '상황 인지' 문제 해결을 위한 기술 탐색", weeks: [false, true, false, false, false, false, false] },
        { name: "2.2. DisCo-Diff 기반 '상태 코드북' 아이디어 착안", weeks: [false, false, true, false, false, false, false] },
        { name: "2.3. DiscSIE v0.1 아키텍처 설계 (정보 융합, LoRA)", weeks: [false, false, false, true, false, false, false] }
      ]
    },
    {
      phase: "Phase 3: 솔루션 고도화 및 평가",
      tasks: [
        { name: "3.1. '동적 계획' 메커니즘 도입 및 설계", weeks: [false, false, false, false, true, false, false] },
        { name: "3.2. 예상 성능 평가 계획 수립 (CALVIN 벤치마크)", weeks: [false, false, false, false, false, true, false] }
      ]
    },
    {
      phase: "Phase 4: 최종 정리 및 보고",
      tasks: [
        { name: "4.1. 최종 보고서 작성 및 시각 자료 제작", weeks: [false, false, false, false, false, true, true] },
        { name: "4.2. 발표 준비 및 향후 연구 계획 수립", weeks: [false, false, false, false, false, false, true] }
      ]
    }
  ];

  // 7주차 요약 데이터
  const summary = [
    "1주차: SuSIE의 한계점('정적/비현실적 계획')을 발견하고, '상황을 이해하는 플래너 개발'을 목표로 설정.",
    "2주차: 문제의 근본 원인이 '추상적 상태 정보의 부재'임을 파악하고, '의미 요약'을 핵심 과제로 선정.",
    "3주차: DisCo-Diff의 '이산 잠재 변수' 아이디어를 발견하고, 이를 '상태 코드북'으로 활용하는 돌파구를 마련.",
    "4주차: SuSIE의 Cross-Attention에 '상태 코드북'을 융합하고 LoRA로 효율적 학습을 꾀하는 DiscSIE 아키텍처 설계.",
    "5주차: '상태 코드북'의 변화량을 기준으로 계획을 갱신하는 '동적 계획' 메커니즘을 도입하여 솔루션 고도화.",
    "6주차: 표준 벤치마크(CALVIN) 기반의 '예상 성능 평가' 계획을 수립하고, 논리적 근거와 시각화 방안을 구체화.",
    "7주차: 전체 과정을 종합한 최종 보고서를 작성하고, 프로젝트의 한계 및 향후 연구 계획을 수립하여 마무리."
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                DiscSIE 프로젝트 회의록
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                7주간 프로젝트 진행 과정 요약
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-gray-500 dark:text-gray-400">2025년 프로젝트</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              주간 타임라인
            </TabsTrigger>
            <TabsTrigger value="gantt" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              간트 차트
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              요약본
            </TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
              {weeklyData.map((week) => {
                const IconComponent = week.icon
                return (
                  <Button
                    key={week.week}
                    variant={activeWeek === week.week ? "default" : "outline"}
                    className="h-full p-3 flex flex-col items-center justify-start gap-2 text-center"
                    onClick={() => setActiveWeek(week.week)}
                  >
                    <div className={`p-2 rounded-full ${week.color} text-white mb-1`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col justify-center flex-grow">
                      <div className="font-semibold text-sm">{week.week}주차</div>
                      <div className="text-xs opacity-80 break-words">{week.title}</div>
                    </div>
                  </Button>
                )
              })}
            </div>

            {/* Active Week Content */}
            {weeklyData.map((week) => (
              activeWeek === week.week && (
                <Card key={week.week} className="shadow-lg animate-in fade-in-50 duration-500">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full ${week.color} text-white`}>
                        <week.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{week.week}주차: {week.title}</CardTitle>
                        <CardDescription className="text-lg">
                          프로젝트 진행 상세 내용
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        회의 내용
                      </h3>
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          "{week.content.meeting}"
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        핵심 결정사항
                      </h3>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          "{week.content.goal}"
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        To-Do List
                      </h3>
                      <div className="space-y-2">
                        {week.content.todos.map((todo, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{todo}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </TabsContent>

          {/* Gantt Chart Tab */}
          <TabsContent value="gantt">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">간트 차트 (Gantt Chart)</CardTitle>
                <CardDescription>
                  7주간 프로젝트 단계별 진행 일정
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold w-2/5">주요 활동 (Task)</th>
                        {[...Array(7)].map((_, i) => (
                          <th key={i} className="text-center p-4 font-semibold">{i + 1}주</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ganttData.map((phaseData, phaseIndex) => (
                        <React.Fragment key={phaseIndex}>
                          <tr className="border-b bg-slate-50 dark:bg-slate-800">
                            <td colSpan={8} className="p-3 font-semibold text-slate-800 dark:text-slate-200">{phaseData.phase}</td>
                          </tr>
                          {phaseData.tasks.map((task, taskIndex) => (
                            <tr key={taskIndex} className="border-b hover:bg-slate-100 dark:hover:bg-slate-700/50">
                              <td className="p-3 pl-8 text-sm text-slate-600 dark:text-slate-400">{task.name}</td>
                              {task.weeks.map((isActive, weekIndex) => (
                                <td key={weekIndex} className="text-center p-2">
                                  {isActive && <div className="bg-blue-500 h-5 w-full rounded-md mx-auto" style={{ maxWidth: '90%' }}></div>}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">요약 회의록 (Key Meeting Minutes)</CardTitle>
                <CardDescription>
                  프로젝트 진행 과정 핵심 요약
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">[7주간 프로젝트 핵심 진행 과정 요약]</h3>
                  {summary.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Badge variant="outline" className="mt-1 flex-shrink-0">
                        {index + 1}주차
                      </Badge>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>DiscSIE 프로젝트 회의록 - 2025년 7주간 진행 과정</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
