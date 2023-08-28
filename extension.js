// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const ThreeShaderViewProvider = require("./threeShaderdProvider");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
let textEditor;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const workspaceRoot = vscode.workspace.rootPath;
  console.log(
    workspaceRoot,
    "::::::::::::::::::::::::::::::::::::::::::::::::::"
  );
  const threeShaderProvider = new ThreeShaderViewProvider(workspaceRoot);
  vscode.window.registerTreeDataProvider(
    "threeShaderView",
    threeShaderProvider
  );

  const disposable = vscode.commands.registerCommand(
    "extension.openFile",
    async (filePath) => {
      fs.readFile(filePath, "utf8", async (err, data) => {
        if (err) {
          vscode.window.showErrorMessage("Could not read file");
          return;
        }

        const includeLines = data.match(/^\s*#include <.*>$/gm);
        if (includeLines) {
          for (const line of includeLines) {
            const fileName = line.match(/<(.*)>/)[1] + ".glsl.js";
            const includePath = path.join(
              workspaceRoot,
              "node_modules",
              "three",
              "src",
              "renderers",
              "shaders",
              "ShaderChunk",
              fileName
            );

            // Read the content of the include file
            const includeContentRaw = fs.readFileSync(includePath, "utf8");

            const includeContent = includeContentRaw.match(/`([^`]+)`/)[1];

            // Replace the include line with the content of the include file
            data = data.replace(
              line,
              `\n\n// ${line.trim()}\n// #region ${line}\n${includeContent}\n// #endregion\n\n`
            );
          }
        }

        if (!textEditor) {
          // Create a new untitled document with the file content
          const document = await vscode.workspace.openTextDocument({
            language: "javascript", // You can specify the language here
            content: data,
          });

          // Show the document in the main view
          textEditor = await vscode.window.showTextDocument(document);
        } else {
          // Update the existing document with new content
          textEditor.edit((editBuilder) => {
            const lastLine = textEditor.document.lineAt(
              textEditor.document.lineCount - 1
            );
            const fullRange = new vscode.Range(
              new vscode.Position(0, 0),
              lastLine.range.end
            );
            editBuilder.replace(fullRange, data);
            vscode.commands.executeCommand("editor.foldAll");
          });
        }
      });
    }
  );

  context.subscriptions.push(disposable);
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "three-shader-reader" is now active!');

  // // The command has been defined in the package.json file
  // // Now provide the implementation of the command with  registerCommand
  // // The commandId parameter must match the command field in package.json
  // let disposable = vscode.commands.registerCommand('three-shader-reader.helloWorld', function () {
  // 	// The code you place here will be executed every time your command is executed

  // 	// Display a message box to the user
  // 	vscode.window.showInformationMessage('Hello World from Three Shader reader!');
  // });

  // context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
