# three-shader-reader README

The "three-shader-reader" is a Visual Studio Code extension designed to simplify shader development in Three.js projects. This extension automatically replaces #include <...> directives in your GLSL code with the actual content from the corresponding .glsl.js files.

## Features

- **List Shader Files**: Easily browse shader files located in `node_modules/three/src/renderers/shaders/ShaderLib`.
- **View Shader Content**: Click on a shader file to view its content in the main editor pane.

- **Resolve Includes**: Automatically replaces `#include <...>` directives with the content of the corresponding `.glsl.js` files.

- **Code Folding**: Use code folding regions to expand or collapse the included content.

## Usage

1. Open a Three.js project in Visual Studio Code.
2. Navigate to the "GLSL Include Resolver" panel on the left sidebar.
3. Click on a shader file to view its content, with `#include <...>` directives automatically resolved.

## Installation

1. Open Visual Studio Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "three-shader-reader"
4. Click "Install"

## Usage

1. Open a Three.js project in Visual Studio Code.
2. Navigate to the "GLSL Include Resolver" panel on the left sidebar.
3. Click on a shader file to view its content, with `#include <...>` directives automatically resolved.

## How to Contribute

If you encounter any issues or have feature requests, please open an issue on the GitHub repository.

## License

This extension is released under the MIT License.
Feel free to copy and paste this into your README.md file, and modify it as needed to better suit your extension.
