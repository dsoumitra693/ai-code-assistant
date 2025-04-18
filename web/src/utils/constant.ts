export const SYSTEM_PROMPT = 'You are a helpful assistant that generates specific Node.js code to accomplish tasks. Provide clear, executable code snippets and commands.'
export const USER_PROMPT = (taskDescription: string) => `Generate a step-by-step plan with Node.js code to accomplish this task: ${taskDescription} Format your response as numbered steps with code snippets or shell commands to execute. The code should be complete and ready to run.`;
export const MODEL = import.meta.env.VITE_OPENAI_MODEL || 'DeepSeek-V3-0324'
export const API_ENDPOINT = import.meta.env.VITE_OPENAI_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions'
export const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
export const MAX_TOKENS = 1000
export const TEMPERATURE = 0.7
export const TIMEOUT = 30000
