import { useState, useRef, useEffect } from "react";

const PLANTS = [
  { id: 1, name: "몬스테라", latinName: "Monstera deliciosa", emoji: "🌿", water: "7~14일", light: "밝은 간접광", temp: "18~30°C", humidity: "보통~높음", difficulty: "쉬움", shortDesc: "넓은 잎으로 공간을 채우는 인기 관엽식물", care: "겉흙이 마르면 충분히 물을 주세요. 직사광선을 피하고 밝은 간접광이 좋아요. 잎에 먼지가 쌓이면 젖은 천으로 닦아주세요.", tips: ["잎의 구멍이 많을수록 빛을 잘 받고 있다는 신호예요", "지지대를 세워주면 더 잘 자라요", "과습 주의 — 뿌리 썩음의 주요 원인이에요"], toxic: false },
  { id: 2, name: "산세베리아", latinName: "Sansevieria trifasciata", emoji: "🌵", water: "14~30일", light: "저광~밝은 간접광", temp: "15~35°C", humidity: "낮음", difficulty: "아주 쉬움", shortDesc: "공기정화 능력이 뛰어난 강인한 식물", care: "물을 거의 주지 않아도 돼요. 겨울에는 한 달에 한 번도 충분해요. 과습에 매우 취약하니 흙이 완전히 마른 후에만 물을 주세요.", tips: ["NASA 선정 공기정화 식물이에요", "어두운 곳에서도 잘 자라요", "물을 너무 많이 주면 뿌리가 썩어요"], toxic: true },
  { id: 3, name: "고무나무", latinName: "Ficus elastica", emoji: "🪴", water: "7~14일", light: "밝은 간접광~약한 직사광", temp: "15~30°C", humidity: "보통", difficulty: "쉬움", shortDesc: "광택나는 넓은 잎이 멋진 인테리어 식물", care: "겉흙 2~3cm가 마르면 물을 주세요. 잎이 아래로 쳐지면 물이 부족하다는 신호예요.", tips: ["잎을 닦아주면 광택이 살아나요", "직사광선은 잎을 태울 수 있어요", "화분을 자주 움직이면 잎이 떨어질 수 있어요"], toxic: true },
  { id: 4, name: "포토스", latinName: "Epipremnum aureum", emoji: "🍃", water: "7~10일", light: "저광~밝은 간접광", temp: "15~30°C", humidity: "보통", difficulty: "아주 쉬움", shortDesc: "어디서나 잘 자라는 식물 입문 추천종", care: "흙이 마르면 듬뿍 물을 주세요. 행잉 화분이나 선반 위에 올리면 덩굴이 멋있게 늘어져요.", tips: ["수경재배도 가능해요", "덩굴을 잘라 물에 꽂으면 새 식물이 자라요", "형광등 빛에서도 잘 자라요"], toxic: true },
  { id: 5, name: "페페로미아", latinName: "Peperomia obtusifolia", emoji: "🌱", water: "10~14일", light: "간접광", temp: "16~28°C", humidity: "보통~낮음", difficulty: "쉬움", shortDesc: "작고 귀여운 다육형 관엽식물", care: "과습에 약해요. 잎에 주름이 생기면 물을 줘야 한다는 신호예요.", tips: ["테라리움에 넣기 좋아요", "잎꽂이로 번식이 쉬워요", "화분 크기가 작아도 잘 자라요"], toxic: false },
  { id: 6, name: "알로에 베라", latinName: "Aloe barbadensis", emoji: "🌵", water: "14~21일", light: "밝은 직사광~간접광", temp: "13~30°C", humidity: "낮음", difficulty: "쉬움", shortDesc: "피부 진정 효과로 유명한 다육식물", care: "건조하게 관리하세요. 물을 자주 주면 뿌리가 썩어요.", tips: ["잎을 잘라 피부에 바르면 진정 효과가 있어요", "화분 배수구가 꼭 있어야 해요", "겨울에는 물주기를 더 줄여요"], toxic: false },
  { id: 7, name: "드라세나", latinName: "Dracaena marginata", emoji: "🌴", water: "10~14일", light: "간접광~밝은 간접광", temp: "15~30°C", humidity: "보통~낮음", difficulty: "쉬움", shortDesc: "날카로운 잎이 인상적인 공기정화 식물", care: "흙이 충분히 말랐을 때 물을 주세요. 정수된 물이 더 좋아요.", tips: ["수돗물의 불소 성분에 민감해요", "공기정화 능력이 뛰어나요", "줄기를 잘라 번식시킬 수 있어요"], toxic: true },
  { id: 8, name: "필로덴드론", latinName: "Philodendron hederaceum", emoji: "🌿", water: "7~10일", light: "밝은 간접광", temp: "18~30°C", humidity: "높음", difficulty: "쉬움", shortDesc: "하트 모양 잎이 사랑스러운 인기 관엽식물", care: "흙 표면이 마르면 물을 주세요. 분무기로 잎에 물을 뿌려주면 더 잘 자라요.", tips: ["하트리프 품종이 가장 인기 있어요", "지지대를 세우면 위로 올라가요", "잎이 노랗게 되면 과습 신호예요"], toxic: true },
];

const C = { bg: "#f5f2ea", surface: "#ffffff", green: "#1a3d28", greenMid: "#2d7048", greenLight: "#4a9862", greenPale: "#c0e2cc", greenBg: "#ebf5ef", text: "#181814", muted: "#74726a", border: "#e2ddd0", red: "#c23b3b", amber: "#b87800", amberBg: "#fff8e0", amberBorder: "#f0d070", navBg: "#0f2418" };

async function claudeCall(messages, system) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "응답을 받지 못했어요.";
  } catch { return "네트워크 오류가 발생했어요. 다시 시도해주세요."; }
}

async function claudeVision(base64, mimeType, prompt, system) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514", max_tokens: 1000, system,
        messages: [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: mimeType, data: base64 } }, { type: "text", text: prompt }] }],
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "진단을 완료하지 못했어요.";
  } catch { return "오류가 발생했어요. 다시 시도해주세요."; }
}

function HomeScreen({ setScreen, myPlants }) {
  const tips = ["겨울엔 물주기 횟수를 평소의 절반으로 줄이세요.", "화분 받침에 물이 고이면 뿌리 썩음의 원인이 돼요.", "잎에 먼지가 쌓이면 광합성 효율이 떨어져요.", "대부분의 식물은 직사광선보다 밝은 간접광을 좋아해요.", "냉난방기 바람이 직접 닿는 곳은 식물에게 좋지 않아요.", "분갈이는 봄이 가장 좋은 시기예요."];
  const tip = tips[new Date().getDate() % tips.length];
  const overdueCount = myPlants.filter((p) => { const next = new Date(p.lastWatered); next.setDate(next.getDate() + p.interval); next.setHours(0,0,0,0); return next <= new Date(); }).length;
  const actions = [{ icon: "🤖", label: "AI 식물 상담", sub: "궁금한 것 뭐든지", screen: "chat", bg: "#e8f0fe" }, { icon: "🔍", label: "식물 진단", sub: "사진으로 상태 확인", screen: "diagnosis", bg: "#fef3e8" }, { icon: "📖", label: "식물 도감", sub: "관리법 찾아보기", screen: "library", bg: C.greenBg }, { icon: "🌱", label: "내 식물", sub: "물주기 일정 관리", screen: "myplants", bg: "#f3effe" }];
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 88 }}>
      <div style={{ background: C.green, padding: "56px 24px 28px" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.18em", marginBottom: 10 }}>POWERPLANT</div>
        <div style={{ fontFamily: "Georgia, serif", fontWeight: 300, fontSize: 26, color: "white", lineHeight: 1.35 }}>안녕하세요 🌿</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>오늘도 식물과 함께하는 하루</div>
      </div>
      {overdueCount > 0 && (
        <div onClick={() => setScreen("myplants")} style={{ margin: "16px 16px 0", background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer" }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: C.amber }}>💧 물주기 알림</div>
          <div style={{ fontSize: 14, color: C.text, marginTop: 4 }}>{overdueCount}개의 식물에게 물을 줄 시간이에요!</div>
          <div style={{ fontSize: 12, color: C.greenMid, marginTop: 6 }}>내 식물 보기 →</div>
        </div>
      )}
      <div style={{ margin: "16px 16px 0", background: C.greenBg, border: `1px solid ${C.greenPale}`, borderRadius: 14, padding: "18px 20px" }}>
        <div style={{ fontSize: 11, color: C.greenLight, letterSpacing: "0.1em", fontWeight: 500, marginBottom: 8 }}>오늘의 식물 팁</div>
        <div style={{ fontSize: 14, color: C.green, lineHeight: 1.65 }}>{tip}</div>
      </div>
      <div style={{ padding: "20px 16px 0" }}>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 12, fontWeight: 500 }}>무엇을 도와드릴까요?</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {actions.map((a) => (
            <button key={a.screen} onClick={() => setScreen(a.screen)} style={{ background: a.bg, border: "none", borderRadius: 14, padding: "18px 16px", textAlign: "left", cursor: "pointer" }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{a.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{a.label}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{a.sub}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "22px 16px 0" }}>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 12, fontWeight: 500 }}>인기 식물</div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
          {PLANTS.slice(0, 5).map((p) => (
            <button key={p.id} onClick={() => setScreen("library")} style={{ flexShrink: 0, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px", textAlign: "center", cursor: "pointer", minWidth: 76 }}>
              <div style={{ fontSize: 28 }}>{p.emoji}</div>
              <div style={{ fontSize: 12, color: C.text, marginTop: 6, fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{p.difficulty}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LibraryScreen() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = PLANTS.filter((p) => p.name.includes(search) || p.latinName.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingBottom: 88 }}>
      <div style={{ background: C.green, padding: "56px 24px 20px", flexShrink: 0 }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "white", fontWeight: 300, marginBottom: 14 }}>식물 도감</div>
        <input placeholder="🔎 식물 이름 검색..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "10px 16px", borderRadius: 10, border: "none", fontSize: 14, background: "rgba(255,255,255,0.15)", color: "white", outline: "none" }} />
      </div>
      <div style={{ overflowY: "auto", padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {filtered.map((p) => (
          <button key={p.id} onClick={() => setSelected(p)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px", textAlign: "left", cursor: "pointer" }}>
            <div style={{ fontSize: 38, marginBottom: 10 }}>{p.emoji}</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: C.text }}>{p.name}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2, fontStyle: "italic" }}>{p.latinName}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, background: C.greenBg, color: C.greenMid, padding: "3px 8px", borderRadius: 20 }}>{p.difficulty}</span>
              <span style={{ fontSize: 10, background: "#f0f0ee", color: C.muted, padding: "3px 8px", borderRadius: 20 }}>💧 {p.water}</span>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 200, display: "flex", alignItems: "flex-end" }} onClick={() => setSelected(null)}>
          <div style={{ background: C.surface, borderRadius: "20px 20px 0 0", padding: "24px", width: "100%", maxHeight: "82vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <div><div style={{ fontSize: 42, marginBottom: 8 }}>{selected.emoji}</div><div style={{ fontSize: 22, fontWeight: 500, color: C.text }}>{selected.name}</div><div style={{ fontSize: 13, color: C.muted, fontStyle: "italic" }}>{selected.latinName}</div></div>
              <button onClick={() => setSelected(null)} style={{ background: "#f0f0f0", border: "none", borderRadius: 20, width: 32, height: 32, fontSize: 14, cursor: "pointer", color: C.muted }}>✕</button>
            </div>
            <div style={{ background: C.greenBg, borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}><div style={{ fontSize: 14, color: C.greenMid, lineHeight: 1.6 }}>{selected.shortDesc}</div></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[{ icon: "💧", label: "물주기", value: selected.water }, { icon: "☀️", label: "빛", value: selected.light }, { icon: "🌡️", label: "온도", value: selected.temp }, { icon: "💨", label: "습도", value: selected.humidity }].map((item) => (
                <div key={item.label} style={{ background: "#f8f7f4", borderRadius: 10, padding: "12px" }}><div style={{ fontSize: 18, marginBottom: 4 }}>{item.icon}</div><div style={{ fontSize: 11, color: C.muted }}>{item.label}</div><div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginTop: 3 }}>{item.value}</div></div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 8 }}>관리 방법</div><div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{selected.care}</div></div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 10 }}>케어 팁</div>
              {selected.tips.map((t, i) => (<div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}><div style={{ width: 5, height: 5, borderRadius: "50%", background: C.greenLight, marginTop: 5, flexShrink: 0 }} /><div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{t}</div></div>))}
            </div>
            {selected.toxic && (<div style={{ background: "#fff3f3", border: "1px solid #fcc", borderRadius: 10, padding: "10px 14px", display: "flex", gap: 10 }}><div style={{ fontSize: 16 }}>⚠️</div><div style={{ fontSize: 12, color: C.red, lineHeight: 1.5 }}>반려동물이나 어린이에게 독성이 있을 수 있어요</div></div>)}
          </div>
        </div>
      )}
    </div>
  );
}

const CHAT_SYSTEM = `당신은 파워플랜트(POWERPLANT)의 식물 케어 전문가 어시스턴트입니다.
항상 한국어로 답변하세요. 따뜻하고 친근하지만 전문적으로 답변하세요.
식물 관련 질문에만 답변하고, 다른 주제는 "식물에 관한 질문만 도와드릴 수 있어요 🌿"라고 안내하세요.
간결하고 실용적인 조언을 해주세요. 필요 시 이모지를 적절히 사용하세요.`;

function ChatScreen() {
  const [messages, setMessages] = useState([{ role: "assistant", text: "안녕하세요! 파워플랜트 식물 케어 상담사예요 🌿\n\n식물 관리에 대해 궁금한 것이 있으면 뭐든지 물어보세요!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const suggestions = ["물을 얼마나 자주 줘야 해요?", "잎이 노랗게 변하는 이유는?", "분갈이는 언제 하나요?", "햇빛이 부족하면 어떻게 되나요?"];
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);
    const apiMessages = messages.slice(1).map((m) => ({ role: m.role, content: m.text }));
    apiMessages.push({ role: "user", content: text });
    const reply = await claudeCall(apiMessages, CHAT_SYSTEM);
    setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    setLoading(false);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100dvh" }}>
      <div style={{ background: C.green, padding: "56px 24px 20px", flexShrink: 0 }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "white", fontWeight: 300 }}>AI 식물 상담</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Powered by Claude · 무엇이든 물어보세요</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
            {m.role === "assistant" && <div style={{ width: 28, height: 28, borderRadius: 14, background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🌿</div>}
            <div style={{ maxWidth: "76%", background: m.role === "user" ? C.green : C.surface, color: m.role === "user" ? "white" : C.text, borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px", padding: "11px 14px", fontSize: 14, lineHeight: 1.65, border: m.role === "assistant" ? `1px solid ${C.border}` : "none", whiteSpace: "pre-wrap" }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🌿</div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "4px 18px 18px 18px", padding: "14px 18px" }}>
              <div style={{ display: "flex", gap: 5 }}>{[0,1,2].map((i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.greenLight, animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />)}</div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      {messages.length <= 1 && (
        <div style={{ padding: "0 16px 10px", display: "flex", gap: 8, overflowX: "auto", flexShrink: 0 }}>
          {suggestions.map((s) => <button key={s} onClick={() => send(s)} style={{ flexShrink: 0, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "8px 14px", fontSize: 12, color: C.text, cursor: "pointer", whiteSpace: "nowrap" }}>{s}</button>)}
        </div>
      )}
      <div style={{ padding: "10px 16px 90px", background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", gap: 10, flexShrink: 0 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)} placeholder="식물에 대해 물어보세요..." style={{ flex: 1, padding: "10px 16px", borderRadius: 24, border: `1px solid ${C.border}`, fontSize: 14, outline: "none", background: C.bg }} />
        <button onClick={() => send(input)} disabled={loading || !input.trim()} style={{ width: 42, height: 42, borderRadius: 21, background: input.trim() && !loading ? C.green : C.border, border: "none", color: "white", fontSize: 18, cursor: input.trim() && !loading ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>↑</button>
      </div>
    </div>
  );
}

function MyPlantsScreen({ myPlants, setMyPlants }) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState(PLANTS[0].name);
  const [newInterval, setNewInterval] = useState(7);

  const getStatus = (p) => {
    const next = new Date(p.lastWatered); next.setDate(next.getDate() + p.interval); next.setHours(0,0,0,0);
    const today = new Date(); today.setHours(0,0,0,0);
    const diff = Math.round((next - today) / 86400000);
    if (diff < 0) return { label: `${Math.abs(diff)}일 지남`, color: C.red, urgent: true };
    if (diff === 0) return { label: "오늘 물주기", color: C.amber, urgent: true };
    if (diff <= 2) return { label: `${diff}일 후`, color: C.amber, urgent: false };
    return { label: `${diff}일 후`, color: C.greenMid, urgent: false };
  };
  const waterNow = (id) => setMyPlants((prev) => prev.map((p) => p.id === id ? { ...p, lastWatered: new Date().toISOString().split("T")[0] } : p));
  const removePlant = (id) => setMyPlants((prev) => prev.filter((p) => p.id !== id));
  const addPlant = () => {
    if (!newName.trim()) return;
    const plant = PLANTS.find((p) => p.name === newType);
    setMyPlants((prev) => [...prev, { id: Date.now(), name: newName, type: newType, emoji: plant?.emoji || "🌱", lastWatered: new Date().toISOString().split("T")[0], interval: newInterval }]);
    setNewName(""); setNewType(PLANTS[0].name); setNewInterval(7); setAdding(false);
  };
  const urgentPlants = myPlants.filter((p) => getStatus(p).urgent);

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 88 }}>
      <div style={{ background: C.green, padding: "56px 24px 24px" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "white", fontWeight: 300 }}>내 식물</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>{myPlants.length}개의 식물을 키우고 있어요</div>
      </div>
      {urgentPlants.length > 0 && (
        <div style={{ margin: "16px 16px 0", background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: C.amber, marginBottom: 6 }}>💧 지금 물을 줘야 해요</div>
          {urgentPlants.map((p) => <div key={p.id} style={{ fontSize: 14, color: "#5a4200", marginTop: 4 }}>{p.emoji} {p.name}</div>)}
        </div>
      )}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {myPlants.map((p) => { const s = getStatus(p); return (
          <div key={p.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}><div style={{ fontSize: 34 }}>{p.emoji}</div><div><div style={{ fontSize: 15, fontWeight: 500, color: C.text }}>{p.name}</div><div style={{ fontSize: 12, color: C.muted }}>{p.type} · {p.interval}일마다</div></div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 12, color: s.color, fontWeight: 500 }}>💧 {s.label}</div><div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>마지막: {p.lastWatered}</div></div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={() => waterNow(p.id)} style={{ flex: 1, background: s.urgent ? C.greenBg : "#f5f5f3", border: `1px solid ${s.urgent ? C.greenPale : C.border}`, borderRadius: 8, padding: "8px", fontSize: 13, color: s.urgent ? C.greenMid : C.muted, cursor: "pointer", fontWeight: s.urgent ? 500 : 400 }}>💧 물줬어요</button>
              <button onClick={() => removePlant(p.id)} style={{ width: 36, background: "none", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.muted, cursor: "pointer" }}>🗑</button>
            </div>
          </div>
        ); })}
        <button onClick={() => setAdding(true)} style={{ background: "none", border: `2px dashed ${C.border}`, borderRadius: 14, padding: "20px", fontSize: 14, color: C.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>+ 식물 추가하기</button>
      </div>
      {adding && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 200, display: "flex", alignItems: "flex-end" }} onClick={() => setAdding(false)}>
          <div style={{ background: C.surface, borderRadius: "20px 20px 0 0", padding: "28px 24px", width: "100%", maxWidth: 430, margin: "0 auto" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 500, color: C.text, marginBottom: 22 }}>식물 추가</div>
            <div style={{ marginBottom: 16 }}><div style={{ fontSize: 12, color: C.muted, marginBottom: 7 }}>식물 이름 (별명)</div><input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="예: 거실 몬스테라" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, outline: "none", background: C.bg }} /></div>
            <div style={{ marginBottom: 16 }}><div style={{ fontSize: 12, color: C.muted, marginBottom: 7 }}>식물 종류</div><select value={newType} onChange={(e) => setNewType(e.target.value)} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, background: "white", outline: "none" }}>{PLANTS.map((p) => <option key={p.id} value={p.name}>{p.emoji} {p.name}</option>)}</select></div>
            <div style={{ marginBottom: 24 }}><div style={{ fontSize: 12, color: C.muted, marginBottom: 7 }}>물주기 주기: <span style={{ color: C.green, fontWeight: 500 }}>{newInterval}일마다</span></div><input type="range" min={1} max={30} step={1} value={newInterval} onChange={(e) => setNewInterval(Number(e.target.value))} style={{ width: "100%" }} /><div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted, marginTop: 4 }}><span>1일</span><span>30일</span></div></div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setAdding(false)} style={{ flex: 1, padding: "13px", borderRadius: 10, border: `1px solid ${C.border}`, background: "none", fontSize: 14, cursor: "pointer", color: C.muted }}>취소</button>
              <button onClick={addPlant} style={{ flex: 2, padding: "13px", borderRadius: 10, border: "none", background: newName.trim() ? C.green : C.border, color: "white", fontSize: 14, cursor: newName.trim() ? "pointer" : "default", fontWeight: 500 }}>추가하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const DIAGNOSIS_SYSTEM = `당신은 식물 상태를 진단하는 전문가입니다.
사진을 보고 아래 순서로 분석해주세요:
🌿 식물 종류 — 어떤 식물인지 (추정)
💚 건강 상태 — 건강함 / 주의 필요 / 치료 필요
🔍 발견된 문제 — 문제가 있다면 구체적으로
💡 즉각적인 조치 — 지금 당장 해야 할 것
🛡️ 예방 방법 — 앞으로 어떻게 관리할지
따뜻하고 이해하기 쉽게, 간결하게 한국어로 설명해주세요.`;

function DiagnosisScreen() {
  const [imgSrc, setImgSrc] = useState(null);
  const [imgBase64, setImgBase64] = useState(null);
  const [imgType, setImgType] = useState("image/jpeg");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileKey, setFileKey] = useState(0);
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { const d = e.target.result; setImgSrc(d); setImgBase64(d.split(",")[1]); setImgType(file.type || "image/jpeg"); setResult(null); };
    reader.readAsDataURL(file);
  };
  const diagnose = async () => {
    if (!imgBase64) return;
    setLoading(true);
    const reply = await claudeVision(imgBase64, imgType, "이 식물의 상태를 진단해주세요.", DIAGNOSIS_SYSTEM);
    setResult(reply); setLoading(false);
  };
  const reset = () => { setImgSrc(null); setImgBase64(null); setResult(null); setLoading(false); setFileKey((k) => k + 1); };

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 88 }}>
      <div style={{ background: C.green, padding: "56px 24px 24px" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "white", fontWeight: 300 }}>식물 진단</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Powered by Claude · 사진으로 상태를 분석해드려요</div>
      </div>
      <div style={{ padding: "20px 16px" }}>
        {!imgSrc ? (
          <>
            <div onClick={() => fileRef.current?.click()} style={{ background: C.greenBg, border: `2px dashed ${C.greenPale}`, borderRadius: 18, padding: "52px 24px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>📷</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: C.green, marginBottom: 8 }}>식물 사진 업로드</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>잎, 줄기, 뿌리 등 문제가 있는 부분을<br />가까이서 찍어주세요</div>
            </div>
            <input key={fileKey} ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files?.[0])} />
            <div style={{ marginTop: 20, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 12 }}>진단 가능한 증상</div>
              {["🍂 잎 변색 (노랑, 갈색, 검정)", "💧 과습 / 뿌리 썩음", "🌵 수분 부족 / 건조", "🐛 병해충 감염", "☀️ 햇빛 부족 / 과다", "🌱 영양 결핍"].map((item) => <div key={item} style={{ fontSize: 13, color: C.muted, marginBottom: 7 }}>{item}</div>)}
            </div>
          </>
        ) : (
          <>
            <img src={imgSrc} style={{ width: "100%", borderRadius: 14, objectFit: "cover", maxHeight: 260 }} />
            {!result && !loading && <button onClick={diagnose} style={{ marginTop: 16, width: "100%", padding: "14px", borderRadius: 12, border: "none", background: C.green, color: "white", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>🔍 AI 진단 시작</button>}
            {loading && (
              <div style={{ marginTop: 16, background: C.greenBg, borderRadius: 14, padding: "28px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 15, color: C.greenMid, fontWeight: 500 }}>분석 중...</div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>AI가 식물 상태를 꼼꼼히 살펴보고 있어요</div>
              </div>
            )}
            {result && (
              <div style={{ marginTop: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 18px" }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.green, marginBottom: 14 }}>진단 결과</div>
                <div style={{ fontSize: 14, color: C.text, lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{result}</div>
              </div>
            )}
            <button onClick={reset} style={{ marginTop: 14, width: "100%", padding: "12px", borderRadius: 10, border: `1px solid ${C.border}`, background: "none", fontSize: 14, color: C.muted, cursor: "pointer" }}>다른 사진 분석하기</button>
          </>
        )}
      </div>
    </div>
  );
}

function BottomNav({ screen, setScreen }) {
  const items = [{ id: "home", label: "홈", icon: "🏠" }, { id: "library", label: "도감", icon: "📖" }, { id: "chat", label: "AI상담", icon: "💬" }, { id: "myplants", label: "내 식물", icon: "🌱" }, { id: "diagnosis", label: "진단", icon: "🔍" }];
  return (
    <div style={{ position: "fixed", bottom: 0, width: "100%", maxWidth: 430, height: 74, background: C.navBg, display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.07)", zIndex: 100 }}>
      {items.map((item) => { const active = screen === item.id; return (
        <button key={item.id} onClick={() => setScreen(item.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: active ? "rgba(255,255,255,0.08)" : "none", border: "none", cursor: "pointer", padding: "8px 10px", borderRadius: 10 }}>
          <div style={{ fontSize: active ? 22 : 20, opacity: active ? 1 : 0.5 }}>{item.icon}</div>
          <div style={{ fontSize: 10, color: active ? "#9ed190" : "rgba(255,255,255,0.45)", fontWeight: active ? 500 : 400 }}>{item.label}</div>
        </button>
      ); })}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [myPlants, setMyPlants] = useState([
    { id: 1, name: "거실 몬스테라", type: "몬스테라", emoji: "🌿", lastWatered: new Date(Date.now() - 9 * 86400000).toISOString().split("T")[0], interval: 7 },
    { id: 2, name: "침실 산세베리아", type: "산세베리아", emoji: "🌵", lastWatered: new Date(Date.now() - 5 * 86400000).toISOString().split("T")[0], interval: 21 },
  ]);
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif', background: C.bg, maxWidth: 430, margin: "0 auto", minHeight: "100dvh", display: "flex", flexDirection: "column", position: "relative" }}>
      <style>{`* { box-sizing: border-box; } button:active { opacity: 0.75; transform: scale(0.98); } input::placeholder { color: #b0ada5; } ::-webkit-scrollbar { display: none; } @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); opacity: 0.4; } 40% { transform: translateY(-5px); opacity: 1; } }`}</style>
      {screen === "home" && <HomeScreen setScreen={setScreen} myPlants={myPlants} />}
      {screen === "library" && <LibraryScreen />}
      {screen === "chat" && <ChatScreen />}
      {screen === "myplants" && <MyPlantsScreen myPlants={myPlants} setMyPlants={setMyPlants} />}
      {screen === "diagnosis" && <DiagnosisScreen />}
      <BottomNav screen={screen} setScreen={setScreen} />
    </div>
  );
}
