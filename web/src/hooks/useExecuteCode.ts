import createFile from "../utils/createFile";
import executeBash from "../utils/executeBash";
import extractCode from "../utils/extractCode";
import { CodeBlock } from "../utils/type";

export default function useExecuteCode() {
    const executeCode = async (code: CodeBlock) => {
        if (!code.fileName) createFile(code);
        return executeBash(code)

    }
    const executePlan = async (plan: string) => {
        const codeBlocks:CodeBlock[] = extractCode(plan);
        for (const codeBlock of codeBlocks) {
            await executeCode(codeBlock);
        }
    }
    return { executePlan }
}