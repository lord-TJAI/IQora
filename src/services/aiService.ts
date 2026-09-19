import { apiClient } from './api/client';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  contextChip?: string;
  suggestedFollowups?: string[];
}

export interface ScanResult {
  subject: string;
  chapter: string;
  concept: string;
  masteryPercentage: number;
  detectedText: string;
  explanation: string;
  keyFormula?: string;
  stepByStep: string[];
}

export const aiService = {
  async sendChatMessage(
    message: string,
    context: { subject: string; chapter: string; concept: string; mastery: number }
  ): Promise<AIChatMessage> {
    if (USE_MOCKS) {
      await delay(650); // realistic AI thinking delay
      let responseText = `You are currently working on **${context.concept}** (${context.mastery}% mastery). `;

      const lower = message.toLowerCase();
      if (lower.includes('hint') || lower.includes('clue')) {
        responseText += `Here is a targeted hint: Remember that the electric potential $V$ decreases in the direction of the electric field lines. The relation is given by $E = -\\frac{dV}{dr}$. If you are calculating work done by an external force, $W_{ext} = q\\Delta V = q(V_{final} - V_{initial})$.`;
      } else if (lower.includes('explain') || lower.includes('simple')) {
        responseText += `Think of electric potential like gravitational altitude for charges! High potential (+V) is like being on top of a hill for a positive charge; it naturally wants to slide down to lower potential. When you push it *up* the hill against the electric field, YOU have to do positive work.`;
      } else if (lower.includes('example') || lower.includes('problem')) {
        responseText += `Let's solve one together: If a charge of $+3\\,\\mu\\text{C}$ moves from $A$ ($V_A = 10\\,\\text{V}$) to $B$ ($V_B = 50\\,\\text{V}$), the change in potential is $\\Delta V = 50 - 10 = 40\\,\\text{V}$. The external work done is $W = q\\Delta V = 3\\times 10^{-6} \\times 40 = 1.2\\times 10^{-4}\\,\\text{J}$.`;
      } else {
        responseText += `I notice your recent practice indicated difficulty with negative signs in potential differences. Would you like me to walk you through a 2-minute visual breakdown, or give you a quick 3-question quiz to check your understanding?`;
      }

      return {
        id: `ai-msg-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contextChip: `${context.subject} • ${context.concept}`,
        suggestedFollowups: [
          'Explain the negative sign in E = -dV/dr',
          'Give me a 1-question check',
          'What are equipotential surfaces?',
        ],
      };
    }

    return apiClient<AIChatMessage>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
  },

  async processVoiceInput(audioData: string): Promise<{ transcript: string; reply: string }> {
    if (USE_MOCKS) {
      await delay(900);
      return {
        transcript: 'Can you explain why the work done by electrostatic force in a closed loop is zero?',
        reply: 'Electrostatic force is a conservative force! The work done around any closed loop is $\\oint \\vec{E} \\cdot d\\vec{r} = 0$. Because potential depends only on the initial and final positions, returning to the start yields $\\Delta V = 0$, so no net work is done.',
      };
    }
    return apiClient('/ai/voice', { method: 'POST', body: JSON.stringify({ audioData }) });
  },

  async scanQuestion(imageDataUrl: string): Promise<ScanResult> {
    if (USE_MOCKS) {
      await delay(1200); // realistic vision processing
      return {
        subject: 'Physics',
        chapter: 'Electrostatics',
        concept: 'Electric Potential & Potential Gradient',
        masteryPercentage: 51,
        detectedText: 'An electric dipole of moment p is placed in a uniform electric field E. Derive the expression for the torque acting on it and the potential energy stored.',
        explanation: 'This is a classical Class 12 CBSE/State board derivation. The torque $\\vec{\\tau} = \\vec{p} \\times \\vec{E}$, and the potential energy is $U = -\\vec{p} \\cdot \\vec{E} = -pE\\cos\\theta$.',
        keyFormula: 'U = -\\vec{p} \\cdot \\vec{E} = -pE \\cos\\theta',
        stepByStep: [
          'Forces $+qE$ and $-qE$ form a couple with arm length $2a\\sin\\theta$.',
          'Torque $\\tau = qE(2a\\sin\\theta) = pE\\sin\\theta \\implies \\vec{\\tau} = \\vec{p} \\times \\vec{E}$.',
          'Work done in rotating dipole through $d\\theta$: $dW = \\tau d\\theta = pE\\sin\\theta d\\theta$.',
          'Integrating from $90^\\circ$ to $\\theta$: $U = \\int_{90^\\circ}^\\theta pE\\sin\\theta d\\theta = -pE\\cos\\theta$.',
        ],
      };
    }
    return apiClient<ScanResult>('/ai/scan', { method: 'POST', body: JSON.stringify({ imageDataUrl }) });
  },

  async generateTestQuestions(topic: string, count = 5): Promise<any[]> {
    if (USE_MOCKS) {
      await delay(800);
      return [
        {
          prompt: `For ${topic}: Calculate the electric field intensity at distance r from a uniformly charged infinite plane sheet of surface charge density σ.`,
          options: ['σ / (2ε₀)', 'σ / ε₀', '2σ / ε₀', 'σ / (4πε₀r²)'],
          correctAnswer: 'σ / (2ε₀)',
          explanation: 'Using cylindrical Gaussian surface perpendicular to the sheet, total flux Φ = 2EA = (σA)/ε₀, giving E = σ / (2ε₀), independent of distance.',
        },
        {
          prompt: `What is the angle between electric field lines and equipotential surfaces at all points?`,
          options: ['90° (perpendicular)', '0° (parallel)', '45°', '180°'],
          correctAnswer: '90° (perpendicular)',
          explanation: 'No work is done moving along an equipotential surface (dW = 0 = qE·dr = qE dr cos θ), which requires cos θ = 0, so θ = 90°.',
        },
      ];
    }
    return apiClient('/ai/generate-test', { method: 'POST', body: JSON.stringify({ topic, count }) });
  },
};
