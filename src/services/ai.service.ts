import { OpenAI } from 'openai';
import type { ChatCompletionTool } from 'openai/resources/chat/completions';

import UtilityMethods from '../utils/functions/UtilityMethods.js';

import BadRequestError from '../utils/errors/BadRequestError.js';
import ExternalServerError from '../utils/errors/ExternalServerError.js';
import BaseError from '../utils/errors/BaseError.js';

import type { IOrganization } from '../models/interfaces/organization.interfaces.js';
import type { IPatternFeedback } from '../models/interfaces/analysis.interfaces.js';

/* main methods */

const aiProcessTranscript = async (organization: IOrganization, transcript: string): Promise<IPatternFeedback[]> => {
  try {
    const methodKey: string = '[aiProcessTranscript]';
    console.info(`${methodKey} - ${new Date()} - start`);

    const apiKey: string | undefined = organization?.credentials?.openai?.apiKey || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new BadRequestError(`Missing OpenAI API key for organization: ${organization.name}`);
    }

    const openai = new OpenAI({ apiKey });
    const formattedPatterns = UtilityMethods.formatPatternsForAI(organization.securityPatterns);
    const prompt = _buildPrompt(organization.aiPrompt, formattedPatterns, transcript);

    const { model, analysisFunctionName, analysisTool } = _getAiConfig();

    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      tools: [analysisTool],
      tool_choice: { type: 'function', function: { name: analysisFunctionName } },
      temperature: 0.0,
    });

    const toolCall = completion.choices[0]?.message?.tool_calls?.[0];
    if (toolCall?.type !== 'function' || toolCall?.function?.name !== analysisFunctionName) {
      throw new ExternalServerError('AI failed to call the structured output function.');
    }

    const response: any = JSON.parse(toolCall.function.arguments);
    if (!response || !Array.isArray(response.patterns)) {
      throw new ExternalServerError('Invalid JSON structure received from AI.');
    }

    console.info(`${methodKey} - ${new Date()} - success`, JSON.stringify(response));
    return response.patterns as IPatternFeedback[];
  } catch (error) {
    console.error(`[aiProcessTranscript] - ${new Date()}`, error);
    if (!(error instanceof BaseError)) {
      throw new ExternalServerError(error instanceof Error ? error.message : JSON.stringify(error, null, 2));
    }
    throw error;
  }
};

/* helpers */

const _getAiConfig = (): {
  model: string;
  analysisFunctionName: string;
  analysisTool: ChatCompletionTool;
} => {
  const analysisFunctionName: string = 'analyze_transcript';
  const aiOutputSchema: any = {
    type: 'object',
    properties: {
      patterns: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'O título do padrão de segurança analisado.' },
            feedback: { type: 'string', description: 'O feedback detalhado e específico gerado.' },
            checklists: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string', description: 'O nome exato do item de checklist.' },
                  passed: { type: 'boolean', description: 'Verdadeiro se o item foi cumprido, Falso caso contrário.' },
                },
                required: ['name', 'passed'],
              },
            },
          },
          required: ['title', 'feedback', 'checklists'],
        },
      },
    },
    required: ['patterns'],
  };
  const analysisTool: ChatCompletionTool = {
    type: 'function',
    function: {
      name: analysisFunctionName,
      description: 'Use this function to output the final flight safety analysis in the required JSON format.',
      parameters: aiOutputSchema,
    },
  };

  return { model: 'gpt-4o-mini', analysisFunctionName, analysisTool };
};

const _buildPrompt = (prompt: string, securityPatterns: string, transcript: string): string => {
  return `
      CONTEXTO: Você é um analista de segurança de aviação.
      PROMPT DA ORGANIZAÇÃO: ${prompt}

      # OBJETIVO E ESTILO DA ANÁLISE:
      1. Seja objetivo e conciso no feedback.
      2. Para cada checklist, o valor 'passed' deve ser **true** se a transcrição contiver evidências claras de cumprimento ou comunicação. Se houver falha, omissão ou ambiguidade, use **false**.
      3. A análise deve ser **determinística**. Para o mesmo input, a saída JSON deve ser idêntica.

      PADRÕES DE SEGURANÇA E CHECKLISTS:
      ---
      ${securityPatterns}
      ---

      TRANSCRIPT:
      ---
      ${transcript}
      ---
      FORMATO DE SAÍDA: Gere uma resposta estritamente em formato JSON que corresponda ao schema da função fornecida.
    `;
};

export { aiProcessTranscript };
