/*
 * CV 데이터 — 이 파일만 고치면 사이트 전체가 갱신됩니다.
 *
 * 표기 규칙
 *  - 제목 안의 *별표*는 이탤릭(작품명·학술지명)으로 표시됩니다.
 *  - themes: 연구 주제 태그. 첫 번째 태그가 연도별 차트의 색을 정합니다.
 *      dh     디지털인문학
 *      theory 정신분석·비평이론
 *      amlit  미국문학
 *      film   영화
 *  - 기간(start/end)은 "YYYY" 또는 "YYYY.MM". end를 비워 두면 '현재'로 표시됩니다.
 */
window.CV = {
  person: {
    nameKo: "김용수",
    nameEn: "Yongsoo Kim",
    email: "vadoropupille@gmail.com",
    officeKo: "인문1관 (대학본부관) 2613",
    officeEn: "Humanities Bldg. 1 (Main Administration Bldg.), Room 2613",
    links: [
      { label: "ResearchGate", url: "https://www.researchgate.net/profile/Yongsoo-Kim-10" },
      { label: "GitHub", url: "https://github.com/vadoro" }
    ],
    roles: [
      { ko: "한림대학교 영어영문학과/디지털인문예술전공 교수", en: "Professor of English and Digital Arts & Humanities, Hallym University" },
      { ko: "한국디지털인문학협의회(KADH) 회장", en: "President, Korean Association for Digital Humanities (KADH)" },
      { ko: "한국비평이론학회 회장", en: "President, The Criticism and Theory Society of Korea" }
    ]
  },

  themes: {
    dh:     { ko: "디지털인문학", en: "Digital Humanities" },
    theory: { ko: "정신분석·비평이론", en: "Psychoanalysis & Theory" },
    amlit:  { ko: "미국문학", en: "American Literature" },
    film:   { ko: "영화", en: "Film" }
  },

  /*
   * 표지 연결망의 키워드 사전.
   * 논문·저서·학술 발표·강연 제목에 match 의 문자열 중 하나라도 들어 있으면 그 키워드가 나온 것으로 셉니다.
   * 같은 제목에 함께 나온 키워드끼리 선으로 이어집니다. group 은 노드 색(주제)입니다.
   */
  keywords: [
    { ko: "디지털인문학", en: "Digital Humanities", group: "dh", match: ["디지털인문학", "디지털 인문학", "Digital Humanities", "DH "] },
    { ko: "연결망", en: "Networks", group: "dh", match: ["연결망", "Network", "네트워크"] },
    { ko: "의미연결망", en: "Semantic networks", group: "dh", match: ["의미연결망", "의미 연결망", "Semantic Network", "공기어"] },
    { ko: "지형도", en: "Topography", group: "dh", match: ["지형도"] },
    { ko: "학술지", en: "Journals", group: "dh", match: ["학술지", "Journal of English"] },
    { ko: "계량서지", en: "Bibliometrics", group: "dh", match: ["Bibliometric", "인용"] },
    { ko: "교육", en: "Education", group: "dh", match: ["교육", "Pedagogy"] },
    { ko: "Gephi", en: "Gephi", group: "dh", match: ["Gephi"] },
    { ko: "AI", en: "AI", group: "dh", match: ["AI", "인공지능"] },
    { ko: "데이터", en: "Data", group: "dh", match: ["데이터", "Data"] },
    { ko: "융합", en: "Convergence", group: "dh", match: ["융합"] },
    { ko: "라캉", en: "Lacan", group: "theory", match: ["라캉", "Lacan"] },
    { ko: "정신분석", en: "Psychoanalysis", group: "theory", match: ["정신분석", "Psychoanaly"] },
    { ko: "욕망", en: "Desire", group: "theory", match: ["욕망", "Desire"] },
    { ko: "윤리", en: "Ethics", group: "theory", match: ["윤리", "Ethics"] },
    { ko: "여성성", en: "The Feminine", group: "theory", match: ["여성", "Feminin"] },
    { ko: "실재", en: "The Real", group: "theory", match: ["실재", "the Real"] },
    { ko: "승화", en: "Sublimation", group: "theory", match: ["Sublimation"] },
    { ko: "목소리", en: "Voice", group: "theory", match: ["목소리"] },
    { ko: "담론", en: "Discourse", group: "theory", match: ["담론"] },
    { ko: "비평이론", en: "Criticism & Theory", group: "theory", match: ["비평 이론", "비평과 이론", "비평과이론", "비평이론", "비평/이론"] },
    { ko: "바그너", en: "Wagner", group: "theory", match: ["바그너"] },
    { ko: "영화", en: "Film", group: "film", match: ["영화", "Film"] },
    { ko: "응시", en: "The Gaze", group: "film", match: ["응시", "Gaze"] },
    { ko: "폭력", en: "Violence", group: "film", match: ["폭력", "Violence"] },
    { ko: "봉준호", en: "Bong Joon-ho", group: "film", match: ["Joon-Ho Bong"] },
    { ko: "포크너", en: "Faulkner", group: "amlit", match: ["포크너", "Faulkner"] },
    { ko: "인종", en: "Race", group: "amlit", match: ["인종", "린칭"] },
    { ko: "서사", en: "Narrative", group: "amlit", match: ["서사", "Narrative", "Character", "이야기"] },
    { ko: "영미문학", en: "English Studies", group: "amlit", match: ["영미문학", "영문학", "영어영문학", "English Literary", "English Studies", "English Literature"] }
  ],

  education: [
    { start: "1987", end: "1993", ko: "한림대학교 영어영문학과", degree: "BA" },
    { start: "1994", end: "1996", ko: "The University of Tulsa, Dept. of English", degree: "MA" },
    { start: "1996", end: "2001", ko: "State University of New York at Buffalo, Dept. of English", degree: "PhD" }
  ],

  career: [
    { start: "2004",    end: "",        ko: "한림대학교 영어영문학과 교수" },
    { start: "2010.03", end: "2011.02", ko: "Columbia University 영화학과 방문교수" },
    { start: "2011.03", end: "2012.05", ko: "한림대학교 국제교육원 영어교육센터장" },
    { start: "2016.04", end: "2018.01", ko: "한림대학교 영어영문학과장" },
    { start: "2017.02", end: "2018.11", ko: "한림대학교 디지털인문학연구소장" },
    { start: "2018.07", end: "2020.06", ko: "한림대학교 일송자유교양대학장" },
    { start: "2021.08", end: "2023.06", ko: "한림대학교 일송기념도서관장" },
    { start: "2024.09", end: "",        ko: "한림대학교 디지털인문예술전공 주임교수" }
  ],

  societies: [
    { start: "2021", end: "2025", ko: "한국비평이론학회 부회장" },
    { start: "2023", end: "2025", ko: "한국디지털인문학협의회 편집위원장" },
    { start: "2024", end: "2025", ko: "새한영어영문학회 지회장" },
    { start: "2025", end: "",     ko: "한국비평이론학회 회장" },
    { start: "2025", end: "2026", ko: "DH2026 Co-Chair" },
    { start: "2026", end: "",     ko: "한국디지털인문학협의회(KADH) 회장" }
  ],

  awards: [
    { year: "2024", ko: "Teaching Portfolio 우수 수업상", note: "‘영미문학과 네트워크’", org: "한림대학교" },
    { year: "2023", ko: "Hallym Hybrid Learning Plus 우수 수업상", note: "H-MetaVersity ‘창의코딩 - 모두의 SW 리터러시’", org: "한림대학교" },
    { year: "2019", ko: "우수 논문상", note: "", org: "한국비평이론학회" },
    { year: "2011, 2012", ko: "우수 강의상", note: "", org: "한림대학교" }
  ],

  articles: [
    { year: 2025, title: "한국 영어영문학 연구 70년의 지형도: 의미연결망 분석과 학술지 『영어영문학』(1955-2024)", venue: "영어영문학", detail: "71.4 (2025): 773-810", doi: "10.15794/jell.2025.71.4.002", themes: ["dh"] },
    { year: 2025, title: "학술지 <영어영문학 연구>의 공시적, 통시적 연구 동향: 공기어 연결망 분석(2000-2024)", venue: "영어영문학 연구", detail: "67.2 (2025): 1-32", doi: "10.18853/jjell.2025.67.2.001", themes: ["dh"] },
    { year: 2025, title: "<19세기 영어권 문학>의 학술 논의 지형도: 제목의 의미연결망 1998-2023", venue: "19세기영어권문학", detail: "29.1 (2025): 33-87", doi: "10.24152/NCLE.2025.3.29.1.33", themes: ["dh"] },
    { year: 2025, title: "학술지 <새한영어영문학>의 50년(1973-2022): 논문 제목에 나타난 연구의 지형과 변화 양상", venue: "새한영어영문학", detail: "67.1 (2025): 23-57", themes: ["dh"] },
    { year: 2024, title: "Network Analysis of the Narrator and Characters in Fitzgerald’s *The Great Gatsby*", venue: "Korean Journal of Digital Humanities", detail: "1.2 (2024): 13-23", doi: "10.23287/KJDH.2024.1.2.2", themes: ["dh", "amlit"] },
    { year: 2024, title: "Character as a Web of Words: Towards a Network Theory of Narrative", venue: "비평과 이론", detail: "29.2 (2024): 125-49", themes: ["dh"] },
    { year: 2023, title: "한국 영문학 비평 이론의 지형도 2: 『비평과 이론』 25년(1996-2020)의 인용 및 의미 연결망", venue: "비평과 이론", detail: "28.2 (2023): 77-113", themes: ["dh"] },
    { year: 2022, title: "지식정보 사회에서의 영미문학교육", venue: "영미문학교육", detail: "26.2 (2022): 29-50", doi: "10.19068/jtel.2022.26.2.02", themes: ["dh"] },
    { year: 2022, title: "한국 영문학 비평 이론의 지형도: 인용문헌 연결망 분석과 <비평과 이론>의 20년(1996-2015)", venue: "비평과이론", detail: "27.1 (2022): 57-94", themes: ["dh"] },
    { year: 2021, title: "사회 연결망 분석과 문학 연구: 영미문학과 한국문학을 중심으로", venue: "비평과이론", detail: "26.2 (2021): 55-76", themes: ["dh"] },
    { year: 2019, title: "세계문학과 디지털인문학 방법론: 한국 학계의 모레티 연구", venue: "비평과이론", themes: ["dh"] },
    { year: 2018, title: "영미문학과 디지털인문학: 미국 디지털 영문학 연구 동향", venue: "비평과이론", themes: ["dh"] },
    { year: 2017, title: "디지털인문학과 영미문학교육: 4학기 동안의 실험", venue: "영미문학교육", themes: ["dh"] },
    { year: 2017, title: "한국의 디지털인문학: 위기, 희망, 현실", venue: "비평과이론", themes: ["dh"] },
    { year: 2016, title: "실재적 대상으로서의 목소리: 라캉의 <세미나 10권>과 그 너머", venue: "비평과이론", themes: ["theory"] },
    { year: 2016, title: "불안, 희열, 분노: 포크너의 <메마른 구월>에 나타난 린칭과 인종혐오", venue: "안과밖", themes: ["amlit", "theory"] },
    { year: 2015, title: "목소리의 정신분석을 향하여: 바그너의 오페라 <파르지팔>의 경우", venue: "비평과이론", themes: ["theory"] },
    { year: 2014, title: "치유와 폭력 사이: 라캉의 분석가담론에 나타난 도착과 분석의 윤리", venue: "비평과이론", themes: ["theory"] },
    { year: 2013, title: "서평-새로운 바그너, 미래의 예술: 알랭 바디우 지음, 김성호 옮김 {바그너는 위험한가}(북인더갭 2012)", venue: "안과밖", themes: ["theory"], review: true },
    { year: 2012, title: "라캉의 대학담론과 자본주의: {세미나 17}을 중심으로", venue: "비평과이론", themes: ["theory"] },
    { year: 2011, title: "유령의 시선: 오슨 웰즈의 <시민 케인>에 나타난 라캉의 응시와 ‘영화-눈’", venue: "비평과이론", themes: ["film", "theory"] },
    { year: 2009, title: "인종 문제의 여성적 해결: 포크너의 <모세여, 내려가라>", venue: "현대영미소설", themes: ["amlit", "theory"] },
    { year: 2008, title: "The Source of Violence: The Lacanian Gaze and the Real in Joon-Ho Bong’s Film, *Memories of Murder*", venue: "The Journal of Criticism and Theory", detail: "13.2 (2008): 229-49", themes: ["film", "theory"] },
    { year: 2008, title: "Violence and the Beyond: Films of Joon-Ho Bong and Chan-Wook Park", venue: "Studies in Humanities", detail: "14 (2008): 31-44", themes: ["film"] },
    { year: 2006, title: "The Status of Film in Major Korean Newspapers", venue: "Studies in Humanities", detail: "12 (2006): 7-28", themes: ["film"] },
    { year: 2005, title: "Violence, Politics, and Lacanian Psychoanalysis: The Logic of Torture and the Gaze of Perversion in Abu Ghraib and *The Passion of the Christ*", venue: "The Journal of Criticism and Theory", detail: "10.1 (2005): 155-71", themes: ["theory", "film"] },
    { year: 2005, title: "The Unforgettable Other: Femininity and the Aesthetics of Gaps in William Faulkner’s *If I Forget Thee, Jerusalem*", venue: "Studies in Modern Fiction", detail: "12.1 (2005): 59-80", themes: ["amlit", "theory"] },
    { year: 2003, title: "Sleeping with the Evil: Body and Ethics in Ki-Duk Kim’s Film, *Bad Guy*", venue: "The Journal of Literature and Film", detail: "4.1 (2003): 5-24", themes: ["film"] },
    { year: 2002, title: "The Ethics of the Feminine in William Faulkner’s *As I Lay Dying*", venue: "Studies in Modern Fiction", detail: "9.2 (2002): 255-75", themes: ["amlit", "theory"] },
    { year: 2002, title: "The Radical Politics of Sublimation: Desire, Ethics, and the Feminine in Lacan", venue: "The Journal of Criticism and Theory", detail: "6.2 (2002): 5-24", themes: ["theory"] },
    { year: 2001, title: "Forced Choice and the Ethics of Desire in Luc Besson’s Film, *La Femme Nikita*", venue: "The Journal of Literature and Film", detail: "2.2 (2001): 31-44", themes: ["film", "theory"] },
    { year: 2001, title: "‘Like a Ghost in Broad Day’: The Politics of the Death Drive and Sublimation in William Faulkner’s *The Sound and the Fury*", venue: "Studies in Modern Fiction", detail: "8.2 (2001): 259-84", themes: ["amlit", "theory"] },
    { year: 2001, title: "Identity, Difference, and the Dissolution of Power in Poe’s ‘Morella’", venue: "The Nineteenth Century Literature in English", detail: "5 (2001): 155-67", themes: ["amlit"] },
    { year: 2001, title: "Lacan’s Theory of Desire", venue: "The 21st Century Literature", detail: "16 (2001): 123-32", themes: ["theory"] }
  ],

  books: [
    { year: 2026, title: "디지털 인문학의 길잡이", role: "공저", publisher: "서울대", themes: ["dh"] },
    { year: 2026, title: "미래 교육 리부트: AI시대, 배움의 새로운 길을 찾다", role: "공저", publisher: "나남", themes: ["dh"] },
    { year: 2025, title: "디지털 시대의 이야기들: 뉴미디어와 현대 서사의 진화", role: "공저", publisher: "동인", themes: ["dh"] },
    { year: 2019, title: "*Digital Humanities and Scholarly Research Trends in the Asia-Pacific*", role: "공저", publisher: "IGI Global", themes: ["dh"] },
    { year: 2008, title: "자크 라캉", role: "단독", publisher: "살림", themes: ["theory"] }
  ],

  translations: [
    { year: 2012, title: "역사를 읽는 방법: 텍스트를 어떻게 읽고 해석할 것인가", author: "퀜틴 스키너", role: "공역", publisher: "돌베개", original: "Quentin Skinner, *Visions of Politics, Volume 1: Regarding Method* (Cambridge University Press, 2002)", themes: [] },
    { year: 2010, title: "정치, 사회적 개념의 역사: 비판적 소개", author: "멜빈 릭터", role: "공역", publisher: "소화", original: "Melvin Richter, *The History of Political and Social Concepts: A Critical Introduction* (Oxford University Press, 1995)", themes: [] }
  ],

  /* type: keynote(기조 강연) | talk(주제 발표) | lecture(특강·강연·초청 강연) */
  lectures: [
    { year: 2026, date: "2026.05.30", type: "keynote", label: "기조 강연", title: "비평이론 30년과 그 너머", where: "한국비평이론학회 2026년 봄 학술대회, “동시대 비평이론의 지형과 새로운 비평의 가능성,” 충북대학교" },
    { year: 2025, date: "2025.11.06", type: "lecture", label: "특강", title: "공기어 연결망을 통한 서사 분석", where: "경북대학교 영어영문학과" },
    { year: 2025, date: "2025.10.23", type: "lecture", label: "강연", title: "생성형 AI 시대, 디지털인문학의 세계", where: "유라시아재단, “석학강좌-디지털 AI시대 동아시아의 역할과 미래,” 경성대 중앙도서관" },
    { year: 2025, date: "2025.10.21", type: "lecture", label: "특강", title: "디지털인문학과 연결망 분석: 영문학 연구 사례", where: "단국대학교 한문교육연구소, 제20회 한연포럼" },
    { year: 2025, date: "2024.06.11-13, 2025.06.30-07.02", type: "lecture", label: "특강", title: "디지털인문학과 네트워크 분석: Gephi 실습", where: "국립중앙도서관" },
    { year: 2024, date: "2024.01.29", type: "lecture", label: "특강", title: "Gephi를 활용한 네트워크 분석 및 시각화", where: "영남대학교 인문교육학술원" },
    { year: 2023, date: "2023.12.28", type: "lecture", label: "특강", title: "Gephi를 활용한 네트워크 분석", where: "디지털인문학 겨울 워크숍, 한양대학교 인문과학대학" },
    { year: 2023, date: "2023.10.14", type: "keynote", label: "기조 강연", title: "디지털인문학과 영문학 연구의 만남", where: "새한영어영문학회 2023년 가을학술발표회, “디지털 마음의 풍경: 신경정신분석과 디지털인문학의 현황과 미래,” 부산대학교" },
    { year: 2023, date: "2023.06.21-23", type: "lecture", label: "특강", title: "디지털인문학과 연결망 분석: Gephi 실습", where: "국립중앙도서관" },
    { year: 2023, date: "2023.05.17, 24", type: "lecture", label: "특강", title: "생성 AI 시대의 영어영문학: 스토리텔링 창작과 데이터 시각화", where: "강원대학교 영어영문학과" },
    { year: 2022, date: "2022.12.09", type: "lecture", label: "강연", title: "디지털인문학: 연구와 교육의 새로운 가능성", where: "숙명여대 문과대학 학술회의, “디지털 시대의 인문학: 방향과 과제,” 숙명여대" },
    { year: 2022, date: "2022.11.05", type: "talk", label: "주제 발표", title: "한림대 디지털인문예술전공: DH 교육의 성과와 과제", where: "2022 디지털인문학대회, “디지털인문학 교육: 협업, 도전, 상생의 인문학,” 한국학중앙연구원" },
    { year: 2022, date: "2022.11.02", type: "lecture", label: "특강", title: "디지털 인문학: 인문대생의 미래를 위하여", where: "강원대학교 인문대학" },
    { year: 2022, date: "2022.10.12", type: "talk", label: "주제 발표", title: "인문 융합 교육의 성과와 과제", where: "제4회 디지털 인재양성 100인 포럼, “대학의 디지털 융합인재 양성 사례 발표 및 정책 방향,” 성균관대학교 자연과학캠퍼스" },
    { year: 2022, date: "2022.09.21", type: "talk", label: "주제 발표", title: "디지털 기술과 인문학의 융합: 한림대 디지털인문예술전공", where: "NRC-KAIST 공동 심포지움, “융합 학문의 정착과 제도화,” 세종국책연구단지" },
    { year: 2022, date: "2022.5.27", type: "keynote", label: "기조 강연", title: "디지털 시대의 영어영문학: 디지털인문학", where: "2022년 한국중앙영어영문학회 학술대회, 온라인" },
    { year: 2021, date: "2021.12.02", type: "lecture", label: "특강", title: "인문학 데이터마이닝 교과목 방향성 모색", where: "강원대학교 인문대학, 온라인" },
    { year: 2021, date: "2021.11.22", type: "lecture", label: "초청 강연", title: "영어영문학의 새로운 방법론: 디지털인문학", where: "경북대학교 영어영문학과, 온라인" },
    { year: 2021, date: "2021.6.30", type: "lecture", label: "초청 강연", title: "뉴노멀 시대의 인문학적 상상력", subtitle: "The Humanities and Imagination in the Age of the New Normal", where: "한국영어영문학회 대학원생 세미나, 온라인" },
    { year: 2021, date: "2021.01.29", type: "lecture", label: "특강", title: "디지털 리터러시 교육: 교양으로서의 디지털인문학", where: "동의대학교, 온라인" },
    { year: 2019, date: "2019.12.06", type: "lecture", label: "강연", title: "디지털인문학 교육 실험", where: "울산과기원" },
    { year: 2011, date: "May 19th, 2011", type: "lecture", label: "Graduate School Special Lecture", where: "Dept. of English, Korea University, Seoul, Korea" },
    { year: 2011, date: "2011", type: "lecture", label: "Special Lecture on Psychoanalytic Film Criticism", where: "Hallym Institute of Humanities, Chuncheon, Korea" },
    { year: 2006, date: "2006", type: "lecture", label: "Special Lecture on William Faulkner", where: "The English Language and Literature Association of Korea, Seoul, Korea" },
    { year: 2005, date: "2005", type: "lecture", label: "Special Lecture on Jacques Lacan", where: "Kyunghee University, Seoul, Korea" },
    { year: 2004, date: "2004", type: "lecture", label: "Graduate School Lecture", where: "Dept. of English, Pusan National University, Pusan, Korea" }
  ],

  conferences: [
    {
      date: "2025.07.16", city: "Lisbon", country: "Portugal", abroad: true,
      title: "Digital Intellectual History of Modern Korean Literary Studies: Bibliometric Analysis of Korea Citation Index and OpenAlex Data Sets",
      session: "Open access to bibliographical data, manuscripts collections and women biographies",
      event: "*Digital Humanities 2025: Accessibility and Citizenship*, Alliance of Digital Humanities Organizations",
      venue: "Lisbon, Portugal. 14-18 July 2025",
      links: [{ label: "zenodo.16404467", url: "https://doi.org/10.5281/zenodo.16404467" }]
    },
    {
      date: "2025.01.08", city: "Ulsan", country: "Korea",
      title: "영미문학과 네트워크: 디지털인문학 학부 교육 실험",
      event: "2025 “네트워크형 DH 교육 모델 연구” 워크샵, UNIST 디지털 인문학 연구센터",
      venue: "UNIST (울산과기원). 2025.01.08 - 2025.01.09",
      links: [{ label: "워크숍 페이지", url: "https://network-education-model.notion.site/dh2025" }]
    },
    {
      date: "2024.12.14", city: "Seoul", country: "Korea",
      title: "A Semantic Network Analysis of *The Journal of English Language and Literature*",
      session: "The Criticism and Theory Society of Korea",
      event: "The 70th Anniversary International Conference of The English Language and Literature Association of Korea, *Rethinking the Global in English Studies*",
      venue: "Seoul National University, Seoul, South Korea. Dec. 12-14, 2024"
    },
    {
      date: "2024.11.02", city: "Busan", country: "Korea",
      title: "디지털 인공지능 리터러시 교육과 디지털인문학의 역할",
      event: "2024 한국비평이론학회 가을학술대회 및 비평이론학교, “AI와 디지털 시대 인문학 역할 및 인문교육이 나아가야할 방향”",
      venue: "부경대학교"
    },
    {
      date: "2024.06.20", city: "Seoul", country: "Korea",
      title: "디지털인문학 교육: 대학의 문턱을 넘어 협업하기",
      event: "2024 인문사회성과 EXPO, “국민과 함께 하는 인문사회융합 성과,” 교육부, 한국연구재단",
      venue: "더케이호텔(서울 양재). 2024.6.19-21"
    },
    {
      date: "2024.06.01", city: "Seoul", country: "Korea",
      title: "<19세기 영어권문학>의 학술 논의 지형도: 제목의 의미연결망 1998-2023",
      event: "19세기 영어권문학회 2024 봄 학술대회, “디지털인문학, 기술, 의료: 융합으로 보는 연구와 교육”",
      venue: "서울대학교"
    },
    {
      date: "2023.12.16", city: "Seoul", country: "Korea",
      title: "Digital English Literary Studies: Concepts and Case Studies",
      session: "Exploring the New Frontiers of Digital Humanities in English Literary Studies (special session)",
      event: "2023 ELLAK International Conference, *Literary Inquiry as 21st Century Vocation: Reclaiming Aesthetics, Criticism and Pedagogy*, The English Language and Literature Association of Korea",
      venue: "Hanyang University, Seoul, South Korea. Dec. 15-16, 2023"
    },
    {
      date: "2023.07.13", city: "Graz", country: "Austria", abroad: true,
      title: "English Literature and Network Analysis: Toward Networked Digital Humanities Pedagogy in the South Korean Higher Education System",
      session: "Beyond the Boundaries of Individual Universities: Allegiance to Digital Humanities Education in Korea",
      event: "*Digital Humanities 2023: Collaboration as Opportunity*, Alliance of Digital Humanities Organizations",
      venue: "Graz, Austria. 11-14 July 2023",
      links: [
        { label: "zenodo.8181178", url: "https://doi.org/10.5281/zenodo.8181178" },
        { label: "DH 2023: Book of Abstracts", url: "https://zenodo.org/records/7961822" }
      ]
    },
    {
      date: "2022.05.21", city: "Busan", country: "Korea",
      title: "한국 영문학 비평 이론의 지형도 2: 학술지 <비평과 이론>의 25년(1996-2020)",
      event: "한국비평이론학회 창립 30주년 기념 학술대회, “2022년, 비평/이론의 미래를 묻는다”",
      venue: "부산대학교"
    }
  ]
};
