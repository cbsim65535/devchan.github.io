---
title: API Gateway는 왜 구조 설계의 시작점이어야 하는가
layout: default
date: 2025-04-16
tags: [설계철학]
summary: API Gateway는 선언(OpenAPI), 인증(OAuth), 흐름 제어가 분산된 시대를 통합하는 실천 도구다. 설계자는 흐름을 설계하는 사람이며, 그 시작점은 Gateway가 되어야 한다.
---

# API Gateway는 왜 구조 설계의 시작점이어야 하는가

## 1. 흐름 없는 구조 – API 시대의 설계 문제

현대 시스템에서 API는 더 이상 단순한 기술 요소가 아니다.  
비즈니스의 흐름, 기능 호출, 인증과 보안, 데이터 분배의 중심이 되고 있다.

하지만 우리가 마주한 현실은 다음과 같다:

- API 호출은 많지만 흐름은 없다.
- 문서는 존재하지만, 구조는 없다.
- 인증은 이루어지지만, 신뢰의 경계는 불명확하다.
- 호출은 가능하지만, 흐름은 해석되지 않는다.

이러한 상황에서 설계자는 **흐름을 따라 구조를 설명할 수 없게** 된다.

> 구조는 흐름에서 시작된다.  
> 흐름을 설명할 수 없다면 구조를 설계할 수 없다.

이 글은 설계자의 관점에서 **흐름 중심의 구조 설계**를 어떻게 시작해야 하는지를 다룬다.  
그리고 그 출발점으로서 **API Gateway**를 재해석하려는 시도이다.

---

## 2. 선언·인증·제어 – 각자의 문제로 시작된 기술들

우리가 사용하는 API 기술의 핵심 요소들,  
즉 **OpenAPI**, **OAuth**, **API Gateway**는  
처음부터 함께 설계된 일체형 구조가 아니었다.

각 기술은 **서로 다른 문제를 독립적으로 해결하기 위해 출발**했다.  
이들은 시대적 요구에 따라 다음과 같이 등장했다:

| 기술 | 목적 | 출발 시기 | 초기 목표 |
|------|------|------------|-----------|
| **Swagger / OpenAPI** | API 명세 선언 | 2011 (Tony Tam) | API 문서화 및 테스트 자동화 |
| **OAuth** | 인증 위임 | 2007–2010 | 사용자 비밀번호 없이 제3자 접근 허용 |
| **API Gateway** | 흐름 제어 / 라우팅 | 2014–2015~ | L7 프록시로서 트래픽 분배 및 API 라우팅 |

---

### 이들은 왜 처음부터 함께 연결되지 않았는가?

사실, 연결될 필요가 없었다.  
**문제의 성격이 달랐고, 등장 시점도 달랐으며,**  
서로를 고려할 만큼 시스템이 복잡하지도 않았다.

- OpenAPI는 API를 문서화하고 테스트하기 위한 개발자의 도구였다.  
- OAuth는 보안과 사용자 권한 위임을 위한 인증 프로토콜이었다.  
- API Gateway는 서비스 간 라우팅과 버전 관리를 위한 운영 구조였다.

> 이들은 애초에 '하나의 흐름'이 아니었다.  
> **흩어진 것이 아니라, 따로 태어난 것이었다.**

---

### 그런데 왜 지금 우리는 이 분리를 불편하게 느끼는가?

시스템이 성장하고, API가 비즈니스의 중심이 되면서  
설계자는 이제 **흐름 전체를 해석하고 제어**해야 한다.

- 명세(OpenAPI)와 실행(Gateway), 신뢰(OAuth)가 따로 움직이면  
  → 하나의 구조로 이해하기 어려워진다.
- 인증은 했지만 어디에서? 왜? 어떻게 위임되었는지 알 수 없다.
- 경로는 있지만, 흐름을 설명할 수 없다.

> 과거에는 문제 없던 분리가  
> **이제는 흐름 없는 구조로서의 한계**로 다가온다.

---

## 3. 시스템은 왜 흐름으로 수렴되어야 하는가

시스템이 작고 단순할 때는  
문서, 인증, 라우팅이 따로 작동해도 문제 되지 않았다.  
하지만 API가 **서비스의 주 경로이자 비즈니스의 인터페이스**가 되면서,  
설계자는 점점 더 **전체 흐름을 하나의 구조로 설명해야 할 필요**를 느끼게 되었다.

---

### 흐름이란 무엇인가?

흐름이란 **하나의 요청이 시스템을 통과하며 겪는 모든 과정**이다:

- 어떤 경로로 들어왔는가? (Route)
- 어떤 방식으로 인증되었는가? (Auth)
- 어떤 리소스를 거쳐, 어떤 응답을 받았는가?
- 이 요청은 어디서 실패했고, 어떤 로그를 남겼는가? (Observability)

이러한 흐름이 **명확하게 설계되고 연결되어 있어야**  
설계자는 시스템을 이해하고, 제어하고, 개선할 수 있다.

---

### 문제는 '흐름의 단절'이다

각 기술은 여전히 잘 동작한다.  
- OpenAPI는 선언을 제공하고,  
- OAuth는 인증을 수행하며,  
- Gateway는 라우팅을 처리한다.

그러나 이들이 하나의 흐름으로 이어지지 않으면,  
**설계자는 구조를 설명할 수 없고, 문제를 추적할 수도 없다.**

- 인증은 되었지만, 어느 경로에서 어떤 조건으로?
- 호출은 실패했지만, 어떤 흐름에서 어디가 막혔는가?
- 요청은 로그에 남았지만, 관측 지표와 어떻게 연결되는가?

---

### 흐름이 다시 연결되는 결정들이 만들어졌다

흐름은 단지 개념이 아니라,  
실제로 **다시 연결될 수 있는 기술적 지점들이 등장했다.**

- OpenAPI는 단순 문서화를 넘어,  
  Gateway 설정과 인증 흐름을 선언으로부터 가져올 수 있게 되었다.
- OAuth는 Gateway 내부에서 인증 연동과 사용자 정보 전파가 가능해졌다.
- 관측 지표는 API Gateway 수준에서 Trace ID와 연결되고,  
  요청 흐름은 분산 추적 구조로 시각화할 수 있게 되었다.

이제 흐름은 **이론이 아니라 실행 가능한 구조**가 되었다.  
설계자는 단절된 요소들을 하나의 흐름으로 엮는 **결정의 주체**가 되어

---

## 4. API Gateway는 단순한 기능으로 정의되지 않았다

API Gateway는 처음에는 단순한 라우팅 도구였다.  
- 마이크로서비스로 분리된 API 요청을 받아,
- 각 서비스로 전달하고,
- 버전과 경로를 구분하는 **프록시 역할**이 그 출발점이었다.

그러나 시스템이 확장되고 복잡해지면서,  
Gateway는 더 이상 단순한 기능으로 남을 수 없게 되었다.

---

### 흐름의 중심에서 역할이 확장되다

- **경로의 시작점**: URI는 이제 설계의 일부다.  
  예측 가능한 패턴, 트래픽 분산 전략, 캐싱 정책은 모두 URI 설계에 달려 있다.

- **인증의 결정 지점**: OAuth, JWT, IAM 등 인증의 위치와 방식은  
  Gateway 수준에서 처리되거나 위임되어야 한다.

- **관측의 집결지**: 요청과 응답, 지연과 장애, Trace ID와 Correlation ID까지  
  모든 흐름의 흔적은 Gateway를 지나간다.

---

### 설계자는 이 흐름을 다루는 사람이다

API Gateway는 이제 **설계의 구조적 의도가 구현되는 지점**이 되었다.

- 흐름의 시작과 끝을 설계하고,  
- 인증의 신뢰 경계를 정의하며,  
- 요청의 패턴과 관측의 경계를 설계하는 행위가  
  모두 Gateway에서 실행된다.

> Gateway는 단순한 설정이 아니라,  
> **흐름을 구조로 만드는 설계의 도구**가 되었다.


---

## 5. 설계자는 어디서부터 실천해야 하는가

설계는 추상적 계획이 아니라,  
**흐름을 구조로 구체화하는 실천**이다.

API Gateway는 그 실천이 시작되는 첫 지점이며,  
설계자는 다음 세 가지 구조적 판단을 통해 흐름을 구성하게 된다.

---

### ✅ 1. 경로 설계 (Route Design)

- URI는 단순한 주소가 아니라 **흐름의 시작점**이다.
- 다음과 같은 요소들이 URI 설계에 영향을 준다:
  - API 버전 관리
  - 리소스 구조화 (자원 중심)
  - 권한 경계와 역할 기반 접근 제어
  - 멀티 테넌시 구조
- **예측 가능한 URI 패턴**은 다음과 같은 구조적 효과를 가져온다:
  - 캐싱 정책과 유효성 관리
  - 보안 설정(WAF, IP 제한)
  - 트래픽 라우팅 최적화

---

### ✅ 2. 인증 구조 (Authentication Structure)

- 인증 방식(JWT, OAuth2.0, IAM 등)을 **어떻게 선택하고 배치할 것인가?**
- 인증을 Gateway 내부에서 처리할 것인가,  
  혹은 Lambda Authorizer 등 외부 계층으로 위임할 것인가?
- 중요한 것은 **인증의 위치**와 **신뢰 위임의 범위**를  
  **흐름 속에서 구조적으로 결정**하는 것이다.

---

### ✅ 3. 관측 전략 (Observability)

- API 시스템의 흐름을 **해석 가능하게 만드는 구조**가 필요하다.
- 주요 항목:
  - 요청/응답 코드, 호출 지연, 장애 패턴 등 주요 로그
  - Trace ID / Correlation ID를 통한 **분산 추적**
  - 실시간 지표 수집 및 시각화 연동 (예: AWS CloudWatch, ELK, Datadog)

> 관측되지 않는 흐름은 통제할 수 없고,  
> 통제할 수 없는 시스템은 설계되지 않은 시스템이다.

---

### 이 세 가지는 서로 연결되어야 한다

- 경로 설계는 인증 흐름을 결정하고,  
- 인증 구조는 관측 전략의 전제 조건이 된다.  
- 세 가지가 함께 구성되어야  
  **흐름 중심의 구조 설계가 완성**된다.

> API Gateway는 이 세 흐름이 만나는 실행 지점이며,  
> 설계자의 판단이 손쉽게 풀수 있는 설계 도구가 된다.

## 6. 오해에서 벗어나 구조로 전환하자

많은 개발자들에게 API Gateway는  
여전히 **트래픽을 중계하는 설정 도구**로 인식된다.

- timeout 설정
- 인증 우회 처리
- 동적 라우팅 구성
- Lambda 연동이나 캐시 설정 등

이러한 기능들은 분명히 중요하다.  
하지만 문제는, **이 모든 설정이 구조 없이 반복**된다는 것이다.

---

### 기능은 반복되지만, 구조는 설계되지 않는다

Gateway는 사용되지만,  
설계자는 그 흐름을 **왜 그렇게 설정했는지 설명하지 못한다.**

- 호출은 가능하지만, 흐름은 해석되지 않는다.  
- 인증은 동작하지만, 신뢰의 경계는 없다.  
- 로그는 남지만, 구조는 보이지 않는다.

> 기능 중심 설정은 실행되지만,  
> 구조 중심 설계는 설명할 수 있어야 한다.

---

### 구조 중심 사고로의 전환이 필요하다

이제는 Gateway를  
단순한 설정의 모음이 아닌,  
**설계자의 구조적 판단이 담기는 지점**으로 보아야 한다.

- 왜 이 URI 패턴을 사용했는가?  
- 왜 이 위치에 인증을 걸었는가?  
- 왜 이 지점에서 분기하고, 어떤 기준으로 관측하는가?

이 질문에 대답할 수 있는 상태가 되어야  
Gateway는 비로소 **설정이 아닌 구조가 된다.**

---

> Gateway는 더 이상 DevOps만의 도구가 아니다.  
> 설계자가 흐름을 통제하고,  
> 구조를 설명하며,  
> 실행 가능한 설계를 만드는 데 활용해야 하는 **설계자의 도구**다.

---

## 7. Gateway를 시작점으로 삼는 설계 전략

흐름은 더 이상 문서로만 설명되지 않는다.  
설계자는 이제 API Gateway를 통해 **선언된 명세를 실행 가능한 구조로 연결**해야 한다.

이 과정은 세 가지 흐름 – 정의, 인증, 관측 – 을  
Gateway를 중심으로 엮는 **구조적 실천 전략**으로 정리될 수 있다.

---

### 📌 1. 선언된 구조를 실행에 연결하기 (OpenAPI → Gateway)

- OpenAPI를 기반으로 API Gateway 설정을 자동화하거나 가져올 수 있다.
- AWS API Gateway, Google Cloud Endpoints, Kong, Apigee 등에서  
  OpenAPI 기반의 라우팅/인증 연동을 공식 지원한다.
- 명세로부터 실행 구조를 만드는 첫 실천이 가능해진 것이다.

---

### 🔐 2. 인증은 흐름 속에서 결정되어야 한다

- 인증은 단순히 ‘있다/없다’가 아니라,  
  어디에서, 누구에 의해, 어떤 조건으로 이루어지는지가 중요하다.
- Gateway 수준에서 다음과 같은 구조를 설계해야 한다:
  - JWT/OAuth2.0/IAM 중 어떤 인증을 선택할 것인가
  - 인증 위치: Gateway 내부 vs Lambda Authorizer
  - 신뢰 위임 범위: 내부 시스템 전체인가, 외부 클라이언트 일부인가

---

### 👁 3. 관측은 흐름을 해석하기 위한 도구다

- 구조적으로 의미 있는 로그와 지표는  
  Gateway에서 시작되어야 한다.
- 주요 설계 요소:
  - Trace ID / Correlation ID 부여
  - 응답 코드별 분기 추적
  - 호출 지연, 실패율 등 메트릭 정리
  - AWS CloudWatch, ELK, Datadog 등 외부 시각화 연계

---

> 이 전략은 단순한 기능 나열이 아니다.  
> **설계자가 흐름을 구조로 만들기 위해 실천할 수 있는 출발점**이다.  
>  
> Gateway를 시작점으로 설정한다는 것은,  
> 선언, 신뢰, 실행, 해석이 **하나의 흐름 안에서 연결되도록 구조를 설계**한다는 뜻이다.

---

## 8. 결론 – 구조는 출발점에서 결정된다

시스템은 API로 열리고,  
설계는 흐름을 읽는 데서 시작된다.

API Gateway는 단순히 요청을 전달하는 도구가 아니다.  
이제는 설계자가 **흐름을 구조로 설명하고 제어할 수 있는 출발점**이 된다.

---

### 설계자의 언어는 흐름이다

- Swagger, OpenAPI, OAuth는 모두 선언이었다.  
- 하지만 설계자는 선언만으로 시스템을 운영할 수 없다.
- **실행 가능한 구조**, **해석 가능한 흐름**, **신뢰 가능한 인증 경계**는  
  하나의 구조 속에서 통합되어야 한다.

---

### Gateway는 그 구조가 시작되는 장소다

- API Gateway는 이제  
  URI, 인증, 관측이 함께 설계되는 **통합된 설계 지점**이다.
- 선언을 실행으로, 흐름을 구조로, 구조를 해석으로 이어주는  
  설계자의 첫 실천 공간이다.

---

> 구조는 문서가 아니라 흐름으로부터 시작된다.  
>  
> 설계자는 흐름을 구성하고,  
> Gateway는 그 흐름을 현실에서 작동시키는 **구조의 기점**이 된다.

> **API Gateway는 구조 설계자의 의도가 가장 먼저 실현되는 출발점이다.**

---

## 📚 참고 및 인용 출처

### A. 기술별 출발점

- Tony Tam, *“Swagger: Simplifying API Development for Everyone”*, Swagger 프로젝트 시작 발표 (2011)  
  ↳ 현재의 OpenAPI Initiative로 발전: [https://swagger.io/specification/](https://swagger.io/specification/)

- OAuth 1.0 초기 제안: Blaine Cook, Leah Culver 외, *OAuth Core 1.0* (2007), IETF RFC5849 참고  
  ↳ OAuth 역사 요약: [https://oauth.net/core/1.0/](https://oauth.net/core/1.0/)

- Amazon API Gateway 출시 (2015): *Amazon API Gateway – Create, Publish, Maintain, Monitor, and Secure APIs at Any Scale*  
  ↳ 공식 블로그: [https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

---

### B. 구조적 통합이 필연적이 된 이유

- Martin Fowler, *Microservices* (2014): 마이크로서비스 도입에 따른 API 분산 구조 설명  
  ↳ [https://martinfowler.com/articles/microservices.html](https://martinfowler.com/articles/microservices.html)

- Google Cloud Docs: *API Design Guide*, 명세·인증·구조 통합 강조  
  ↳ [https://cloud.google.com/endpoints/docs/openapi](https://cloud.google.com/endpoints/docs/openapi)

---

### C. OpenAPI → 실행 구조 연결 사례

- AWS API Gateway 공식 문서: *Import a REST API using OpenAPI*  
  ↳ [https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-import-api.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-import-api.html)

- Google Cloud Endpoints 공식 문서: *Using OpenAPI with ESP*  
  ↳ [https://cloud.google.com/endpoints/docs/openapi/get-started-cloud-functions](https://cloud.google.com/endpoints/docs/openapi/get-started-cloud-functions)

- Kong & Apigee: OpenAPI 기반 구성 예시  
  - Kong Dev Portal: [https://docs.konghq.com/](https://docs.konghq.com/)  
  - Apigee Docs: [https://cloud.google.com/apigee/docs](https://cloud.google.com/apigee/docs)

---

### D. 흐름 중심 설계 가이드라인

- AWS Well-Architected Framework – AWS Serverless Lens  
  ↳ [https://aws.amazon.com/ko/blogs/korea/new-serverless-lens-in-aws-well-architected-tool/](https://aws.amazon.com/ko/blogs/korea/new-serverless-lens-in-aws-well-architected-tool/)

- Google API Design Guide: URI 설계, 인증 경계 가이드  
  ↳ [https://cloud.google.com/apis/design](https://cloud.google.com/apis/design)

- Microsoft REST API Guidelines: OAuth 연계, 명세 중심 설계 강조  
  ↳ [https://github.com/microsoft/api-guidelines](https://github.com/microsoft/api-guidelines)

---