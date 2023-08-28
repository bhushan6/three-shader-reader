const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

class ThreeShaderViewProvider {
  constructor(workspaceRoot) {
    this.workspaceRoot = workspaceRoot;
  }

  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    if (!this.workspaceRoot) {
      vscode.window.showInformationMessage("No dependency in empty workspace");
      return Promise.resolve([]);
    }

    return new Promise((resolve) => {
      const folderPath = path.join(
        this.workspaceRoot,
        "node_modules",
        "three",
        "src",
        "renderers",
        "shaders",
        "ShaderLib"
      );
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          resolve([]);
          return;
        }
        resolve(
          files.map((file) => {
            const filePath = path.join(folderPath, file);
            const treeItem = new vscode.TreeItem(file);
            treeItem.command = {
              command: "extension.openFile",
              title: "Open File",
              arguments: [filePath],
            };
            return treeItem;
          })
        );
      });
    });
  }
}

module.exports = ThreeShaderViewProvider;
