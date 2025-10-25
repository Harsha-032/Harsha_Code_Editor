
export const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'html', label: 'HTML' },
];

export const DEFAULT_CODE: Record<string, string> = {
  javascript: `// Welcome to Harsha's Editor!
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
`,
  python: `# Welcome to Harsha's Editor!
def greet(name):
    print(f"Hello, {name}!")

greet("World")
`,
  java: `// Welcome to Harsha's Editor!
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
}
`,
  c: `// Welcome to Harsha's Editor!
#include <stdio.h>

int main() {
   printf("Hello, World!");
   return 0;
}
`,
  cpp: `// Welcome to Harsha's Editor!
#include <iostream>

int main() {
    std::cout << "Hello, World!";
    return 0;
}
`,
  html: `<!-- Welcome to Harsha's Editor! -->
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
`,
};
