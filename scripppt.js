// ==========================================================================
// 🚀 ECHO HIRE - REAL-TIME GOOGLE GEMINI SIMULATOR CLIENT-SIDE AI ENGINE
// ==========================================================================

const aiInterviewerEngine = {
    currentQuestionIndex: 1,

    questions: {
        1: "Hi Aarav! Thanks for joining today. Let's start. Can you tell me about a project you're most proud of and your role in it?",
        2: "Excellent stack choices. Now, how do you handle state management in a large-scale application to prevent unnecessary re-renders?",
        3: "Great architectural awareness. Tell me about a time you had a major technical conflict with a team member. How did you resolve it?",
        4: "Brilliant behavioral framework. Let's move deeper into infrastructure scalability: How do you configure microservices during sudden user traffic surges?",
        5: "Final check: How do you ensure high data security, token encryption, and database recovery protocols in production model distributed applications?"
    },

    // 🎯 INTEL ENGINE MATRIX: Har type ke answer par alag calculations aur reply
    analyzeWithGoogleAPI: function(userText, questionIndex) {
        const text = userText.toLowerCase().trim();
        let evaluation = { isValid: true, scoreDelta: 0, statusText: "Evaluating", perception: "", aiReply: "" };

        // ❌ Penalty Scenario 1: Agar answer bohot chota hai
        if (text.length < 15) {
            evaluation.isValid = false;
            evaluation.scoreDelta = 15;
            evaluation.statusText = "Critical Fail";
            evaluation.perception = "❌ GOOGLE AI ANALYTICS: Response density too low. Real interviewer requires deeper technical explanations.";
            evaluation.aiReply = "Your response lacks structural depth. Can you explicitly elaborate on the tools, libraries, or configurations you used to avoid bottlenecks?";
            return evaluation;
        }

        // ❌ Penalty Scenario 2: Agar irrelevant / faltu text likha
        if (text === "ok" || text === "yes" || text === "no" || text === "i don't know" || text.includes("nothing") || text === "fine" || text === "ok fine") {
            evaluation.isValid = false;
            evaluation.scoreDelta = 10;
            evaluation.statusText = "Wrong Answer";
            evaluation.perception = "❌ GOOGLE AI DETECTED: Irrelevant out-of-context response variables. Subject matter evaluation metrics failed completely.";
            evaluation.aiReply = "❌ That is an incorrect or generic response. As your interviewer, I expect a concrete technical answer. Review my feedback notes and try again.";
            return evaluation;
        }

        // 🎯 DYNAMIC ARCHITECTURAL SCORING VECTOR WEIGHTS (Smart Keyword Counter)
        let techPoints = 40; // Base score for any good answer

        // Har ek engineering word par score points add honge
        if (text.includes("project") || text.includes("mern") || text.includes("build") || text.includes("develop") || text.includes("portal")) techPoints += 35;
        if (text.includes("redux") || text.includes("zustand") || text.includes("slice") || text.includes("selector")) techPoints += 45;
        if (text.includes("memo") || text.includes("callback") || text.includes("optimization")) techPoints += 15;
        if (text.includes("redis") || text.includes("cache") || text.includes("balancer")) techPoints += 20;
        if (text.includes("scale") || text.includes("surge") || text.includes("microservices") || text.includes("traffic")) techPoints += 30;
        if (text.includes("node") || text.includes("api") || text.includes("sql") || text.includes("benchmark")) techPoints += 15;

        // Final score allocation bounds
        let finalCalculatedScore = Math.min(96, Math.max(35, techPoints));
        evaluation.scoreDelta = finalCalculatedScore;

        if (finalCalculatedScore >= 75) {
            evaluation.statusText = "Outstanding";
            evaluation.perception = "✅ GOOGLE AI PARSED: Domain proficiency verified successfully. Technical metrics match elite system architect benchmarks.";
            evaluation.aiReply = this.currentQuestionIndex + 1 <= 5 ? this.questions[this.currentQuestionIndex + 1] : "Thank you Aarav. All evaluation sequences completely terminated. Final report locked in database schemas.";
        } else {
            evaluation.statusText = "Good";
            evaluation.perception = "✅ GOOGLE AI VERIFIED: Response context accepted. Candidate owns baseline knowledge but can expand on system scaling bottlenecks.";
            evaluation.aiReply = this.currentQuestionIndex + 1 <= 5 ? this.questions[this.currentQuestionIndex + 1] : "Thank you Aarav. All evaluation sequences completely terminated. Final report locked in database schemas.";
        }

        return evaluation;
    }
};

let interviewState = {
    candidate: { name: "Aarav Kumar", role: "Software Engineer" },
    liveAnalysis: {
        overallConfidence: 0, // 🎯 STARTS PERFECTLY AT 0
        statusText: "Ready",
        interviewerPerception: "System calibrated. Connecting Google AI pipelines. Awaiting your opening response variables to ignite telemetry maps...",
        keyInsights: { confidence: "→ Idle", clarity: "→ Idle", structure: "→ Idle", enthusiasm: "→ Idle" },
        proTip: "Initialize your first technical response parameter block. Sui (needle) gauge will scale based on data complexity tracks."
    },
    chatLogsCache: [],
    scoreHistory: [0]
};

let confidenceChart;
let analyticalTimelineChart;

function renderGaugeChart(scoreValue) {
    const canvasElement = document.getElementById('confidenceGauge');
    if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d');
    if (confidenceChart) confidenceChart.destroy();

    const remainingValue = 100 - scoreValue;

    confidenceChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [scoreValue, remainingValue],
                backgroundColor: ['#4f46e5', '#f1f5f9'],
                borderWidth: 0,
                borderRadius: [10, 0]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            circumference: 180,
            rotation: -90,
            cutout: '85%',
            plugins: { legend: { display: false }, tooltip: { enabled: false } }
        }
    });
}

function resetToQuestionOne() {
    if (document.getElementById('question-count-label')) document.getElementById('question-count-label').innerText = "Question 1 of 5";
    const progressBar = document.querySelector('.w-48 div');
    if (progressBar) progressBar.style.width = "20%";

    updateQuestionProgressDots(1);
    syncLiveDashboardLabels();

    const chatContainer = document.getElementById('chat-bubble-container');
    if (chatContainer && interviewState.chatLogsCache.length === 0) {
        interviewState.chatLogsCache.push({
            sender: "ai",
            time: "10:30 AM",
            text: `Hi Aarav! Thanks for joining today. Let's start. <strong>Can you tell me about a project you're most proud of and your role in it?</strong>`
        });
        renderChatFromCacheLogs();
    }
}

function syncLiveDashboardLabels() {
    if (document.getElementById('score-number')) document.getElementById('score-number').innerText = interviewState.liveAnalysis.overallConfidence;
    if (document.getElementById('score-status')) document.getElementById('score-status').innerText = interviewState.liveAnalysis.statusText;
    if (document.getElementById('perception-box-text')) document.getElementById('perception-box-text').innerText = interviewState.liveAnalysis.interviewerPerception;
    if (document.getElementById('pro-tip-text')) document.getElementById('pro-tip-text').innerText = interviewState.liveAnalysis.proTip;

    updateDynamicTrendBadges();
}

function updateDynamicTrendBadges() {
    let insightsBadgeColor = "text-emerald-600";
    if (interviewState.liveAnalysis.statusText === "Wrong Answer" || interviewState.liveAnalysis.statusText === "Critical Fail") insightsBadgeColor = "text-rose-600";
    else if (interviewState.liveAnalysis.statusText === "Needs Work") insightsBadgeColor = "text-amber-500";

    if (document.getElementById('insight-confidence')) document.getElementById('insight-confidence').innerHTML = `<span class="${insightsBadgeColor} font-semibold flex items-center gap-1">↑ ${interviewState.liveAnalysis.statusText}</span>`;
    if (document.getElementById('insight-clarity')) document.getElementById('insight-clarity').innerHTML = `<span class="${insightsBadgeColor} font-semibold flex items-center gap-1">↑ ${interviewState.liveAnalysis.statusText}</span>`;
    if (document.getElementById('insight-structure')) document.getElementById('insight-structure').innerHTML = `<span class="${insightsBadgeColor} font-semibold flex items-center gap-1">↑ ${interviewState.liveAnalysis.statusText}</span>`;
    if (document.getElementById('insight-enthusiasm')) document.getElementById('insight-enthusiasm').innerHTML = `<span class="${insightsBadgeColor} font-semibold flex items-center gap-1">↑ ${interviewState.liveAnalysis.statusText}</span>`;
}

function renderChatFromCacheLogs() {
    const chatContainer = document.getElementById('chat-bubble-container');
    if (!chatContainer) return;
    chatContainer.innerHTML = '';

    interviewState.chatLogsCache.forEach(msg => {
        const bubble = document.createElement('div');
        if (msg.sender === 'ai') {
            bubble.className = "flex gap-3 mb-4 items-start animate-fade-in";
            bubble.innerHTML = `
                <div class="bg-indigo-100 p-2 rounded-full text-indigo-600 font-bold text-sm flex-shrink-0">🤖</div>
                <div>
                  <div class="text-xs text-slate-400 font-medium mb-1">AI Interviewer • ${msg.time}</div>
                  <div class="bg-indigo-50 text-slate-800 p-4 rounded-2xl rounded-tl-none max-w-xl text-sm border border-indigo-100 leading-relaxed">${msg.text}</div>
                </div>`;
        } else {
            bubble.className = "flex gap-3 mb-4 items-start justify-end text-right animate-fade-in";
            bubble.innerHTML = `
                <div>
                  <div class="text-xs text-slate-400 font-medium mb-1">${msg.time} • You</div>
                  <div class="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none max-w-xl text-sm text-left leading-relaxed">${msg.text}</div>
                </div>`;
        }
        chatContainer.appendChild(bubble);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function switchTabInterfaceView(activeTabId) {
    const chatContainer = document.getElementById('chat-bubble-container');
    if (!chatContainer) return;

    const tabs = ['nav-interview-btn', 'nav-analysis-btn', 'nav-history-btn', 'nav-tips-btn'];
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link, idx) => {
        link.id = tabs[idx];
        link.className = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors";
    });

    document.getElementById(activeTabId).className = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-indigo-50 text-indigo-600 transition-colors";

    if (activeTabId === 'nav-interview-btn') {
        renderChatFromCacheLogs();
    } else if (activeTabId === 'nav-analysis-btn') {
        chatContainer.innerHTML = `
            <div class="p-2 space-y-4 w-full h-full animate-fade-in">
                <div class="flex flex-col">
                    <h2 class="text-base font-bold text-slate-900">Advanced Performance Metrics Graph</h2>
                    <p class="text-xs text-slate-400">Google AI token analysis metrics tracked dynamically over each submitted question node.</p>
                </div>
                <div class="w-full h-64 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <canvas id="analyticalTimelineChart" class="w-full h-full"></canvas>
                </div>
            </div>
        `;

        setTimeout(() => {
            const ctx = document.getElementById('analyticalTimelineChart').getContext('2d');
            if (analyticalTimelineChart) analyticalTimelineChart.destroy();

            analyticalTimelineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Start (Boot)', 'Q1: Intro', 'Q2: State Layer', 'Q3: Technical EQ', 'Q4: Infrastructure', 'Q5: Safety Check'],
                    datasets: [{
                        label: 'Realtime Cognitive Competency Path Tracker',
                        data: [
                            interviewState.scoreHistory[0],
                            interviewState.scoreHistory[1] !== undefined ? interviewState.scoreHistory[1] : null,
                            interviewState.scoreHistory[2] !== undefined ? interviewState.scoreHistory[2] : null,
                            interviewState.scoreHistory[3] !== undefined ? interviewState.scoreHistory[3] : null,
                            interviewState.scoreHistory[4] !== undefined ? interviewState.scoreHistory[4] : null,
                            interviewState.scoreHistory[5] !== undefined ? interviewState.scoreHistory[5] : null
                        ],
                        borderColor: '#4f46e5',
                        backgroundColor: 'rgba(79, 70, 229, 0.04)',
                        borderWidth: 3,
                        tension: 0.35,
                        fill: true,
                        pointBackgroundColor: '#4f46e5',
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { min: 0, max: 100 } }
                }
            });
        }, 80);
    } else if (activeTabId === 'nav-history-btn') {
        chatContainer.innerHTML = `
            <div class="p-2 space-y-4 w-full animate-fade-in">
                <h2 class="text-base font-bold text-slate-900">Session History Registry Table</h2>
                <div class="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
                    <table class="min-w-full divide-y divide-slate-200 text-left text-xs">
                        <thead class="bg-slate-50 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                            <tr>
                                <th class="p-3.5">Assessment Token</th>
                                <th class="p-3.5">Target Role Profile</th>
                                <th class="p-3.5">Live Score Index</th>
                                <th class="p-3.5">API Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 font-medium">
                            <tr>
                                <td class="p-3.5 text-slate-400">#EH-9821</td>
                                <td class="p-3.5 text-slate-700">Software Engineer (Current Session)</td>
                                <td class="p-3.5 font-bold text-indigo-600" id="history-live-score-cell">${interviewState.liveAnalysis.overallConfidence}/100</td>
                                <td class="p-3.5"><span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[9px]">LIVE UPDATING</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else if (activeTabId === 'nav-tips-btn') {
        let personalizedTipTitle = "💡 Tip: System Architecture Frameworks";
        let personalizedTipDesc = "Configure raw context answers using libraries and technical infrastructure specifications to scale scoring matrices.";

        if (interviewState.liveAnalysis.statusText === "Wrong Answer" || interviewState.liveAnalysis.statusText === "Critical Fail") {
            personalizedTipTitle = "⚠️ Emergency AI Coach Note: Increase Keyword Weightage Density";
            personalizedTipDesc = "Your score crashed. Instantly append structural terminologies (selectors, slices, clusters, Redis layers, load distribution parameters) to satisfy Google API validation limits.";
        } else if (interviewState.liveAnalysis.statusText === "Outstanding" || interviewState.liveAnalysis.statusText === "Excellent") {
            personalizedTipTitle = "🔥 Elite Architectural Tip: Address Cache Invalidation";
            personalizedTipDesc = "Outstanding data trajectory. To preserve maximum metrics, explicitly define state cleanups and memory lifecycle invalidation triggers.";
        }

        chatContainer.innerHTML = `
            <div class="p-2 space-y-4 w-full animate-fade-in">
                <h2 class="text-base font-bold text-slate-900">AI Adaptive Pro-Coaching Guidance</h2>
                <div class="grid grid-cols-1 gap-3 text-xs">
                    <div class="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl space-y-1">
                        <div class="font-bold text-indigo-700 flex items-center gap-1.5" id="adaptive-tip-title">${personalizedTipTitle}</div>
                        <p class="text-slate-600 font-medium leading-relaxed" id="adaptive-tip-desc">${personalizedTipDesc}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

function setupInteractionHandlers() {
    const sendBtn = document.getElementById('send-message-btn');
    const textInput = document.getElementById('chat-input-field');
    const liveTrigger = document.getElementById('live-status-indicator');
    const avatarBubble = document.querySelector('.w-9.h-9');

    const tabs = ['nav-interview-btn', 'nav-analysis-btn', 'nav-history-btn', 'nav-tips-btn'];
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link, idx) => {
        link.id = tabs[idx];
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTabInterfaceView(link.id);
        });
    });

    if (avatarBubble) {
        avatarBubble.style.cursor = "pointer";
        avatarBubble.addEventListener('click', () => {
            const newName = prompt("Enter Candidate Full Name:", interviewState.candidate.name);
            if (newName && newName.trim() !== "") {
                interviewState.candidate.name = newName.trim();
                document.getElementById('candidate-display-name').innerText = interviewState.candidate.name;
                avatarBubble.innerText = interviewState.candidate.name.charAt(0).toUpperCase();
            }
        });
    }

    // 🎯 SMART AUTO-DRIVE SIMULATOR: Har question ke liye alag answer trigger karega!
    if (liveTrigger) {
        liveTrigger.style.cursor = "pointer";
        liveTrigger.addEventListener('click', () => {
            switchTabInterfaceView('nav-interview-btn');

            if (aiInterviewerEngine.currentQuestionIndex === 1) {
                textInput.value = "I engineered a high-volume analytical streaming portal utilizing MERN stack utilities, Node backend, and REST APIs.";
            } else if (aiInterviewerEngine.currentQuestionIndex === 2) {
                textInput.value = "I implement Redux Toolkit global slices and apply strict component selectors along with useMemo to block excessive virtual DOM re-renders under traffic load.";
            } else if (aiInterviewerEngine.currentQuestionIndex === 3) {
                textInput.value = "I settled the database choice conflict objectively by running query benchmarking scripts and aligning with the team.";
            } else {
                textInput.value = "We deployed horizontal auto-scaling nodes alongside decoupled microservices infrastructure layer targets and Redis caching clusters.";
            }
            sendBtn.click();
        });
    }

    if (sendBtn && textInput) {
        sendBtn.addEventListener('click', () => {
            const userText = textInput.value.trim();
            if (!userText) return;

            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            interviewState.chatLogsCache.push({ sender: "user", time: currentTime, text: userText });
            textInput.value = '';
            renderChatFromCacheLogs();

            const chatContainer = document.getElementById('chat-bubble-container');
            const typingIndicator = document.createElement('div');
            typingIndicator.id = "ai-typing-indicator";
            typingIndicator.className = "flex gap-3 mb-4 items-start animate-pulse";
            typingIndicator.innerHTML = `
                <div class="bg-indigo-100 p-2 rounded-full text-indigo-600 font-bold text-sm">🤖</div>
                <div class="bg-indigo-50 text-slate-500 border border-indigo-100 p-3 rounded-xl rounded-tl-none text-xs italic">Google AI API streaming token parameter validation evaluations...</div>
            `;
            chatContainer.appendChild(typingIndicator);
            chatContainer.scrollTop = chatContainer.scrollHeight;

            setTimeout(() => {
                executeCoreSimulationPipeline(userText, currentTime, chatContainer);
            }, 1200);
        });
    }
}

function executeCoreSimulationPipeline(userText, currentTime, chatContainer) {
    if (document.getElementById('ai-typing-indicator')) document.getElementById('ai-typing-indicator').remove();

    const evaluation = aiInterviewerEngine.analyzeWithGoogleAPI(userText, aiInterviewerEngine.currentQuestionIndex);

    interviewState.liveAnalysis.overallConfidence = evaluation.scoreDelta;
    interviewState.liveAnalysis.statusText = evaluation.statusText;
    interviewState.liveAnalysis.interviewerPerception = evaluation.perception;

    interviewState.scoreHistory.push(interviewState.liveAnalysis.overallConfidence);
    interviewState.chatLogsCache.push({ sender: "ai", time: currentTime, text: evaluation.aiReply });

    renderChatFromCacheLogs();

    document.getElementById('score-number').innerText = interviewState.liveAnalysis.overallConfidence;
    document.getElementById('score-status').innerText = interviewState.liveAnalysis.statusText;
    document.getElementById('perception-box-text').innerText = interviewState.liveAnalysis.interviewerPerception;

    updateDynamicTrendBadges();
    renderGaugeChart(interviewState.liveAnalysis.overallConfidence);

    if (evaluation.isValid) {
        aiInterviewerEngine.currentQuestionIndex++;
        if (aiInterviewerEngine.currentQuestionIndex > 5) return;

        if (document.getElementById('question-count-label')) {
            document.getElementById('question-count-label').innerText = `Question ${aiInterviewerEngine.currentQuestionIndex} of 5`;
        }
        const bar = document.querySelector('.w-48 div');
        if (bar) bar.style.width = `${aiInterviewerEngine.currentQuestionIndex * 20}%`;

        updateQuestionProgressDots(aiInterviewerEngine.currentQuestionIndex);
    }
}

function updateQuestionProgressDots(stepNumber) {
    for (let i = 1; i <= 5; i++) {
        const dot = document.getElementById(`step-dot-${i}`);
        if (!dot) continue;
        if (i === stepNumber) dot.className = "w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs transition-all duration-300 ring-2 ring-indigo-200";
        else if (i < stepNumber) dot.className = "w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs transition-all duration-300";
        else dot.className = "w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 font-bold text-xs transition-all duration-300 bg-white";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    resetToQuestionOne();
    renderGaugeChart(interviewState.liveAnalysis.overallConfidence);
    setupInteractionHandlers();
});