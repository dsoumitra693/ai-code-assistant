
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "ai-code-assistant" is now active!');

	let webView = vscode.commands.registerCommand('ai-code-assistant.openWebView', () => {
		let panel = vscode.window.createWebviewPanel(
			'aiCodeAssistant',
			'AI Code Assistant',
			vscode.ViewColumn.One,
			{
				enableScripts: true,	
				localResourceRoots: [
					vscode.Uri.joinPath(context.extensionUri, 'media'),
				],
			}	
		);
		panel.webview.html = `
		<H1>AI Code Assistant</H1>
		<div id="container">
			<div id="input">
				<textarea id="codeInput" rows="10" cols="50"></textarea>
				<button id="generateCode">Generate Code</button>
			</div>
			<div id="output">
				<textarea id="codeOutput" rows="10" cols="50"></textarea>	
				</div>
				</div>
		`;
	})
}

// This method is called when your extension is deactivated
export function deactivate() {}
