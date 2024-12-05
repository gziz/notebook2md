import { NotebookFile } from '../types/notebook';

export const parseNotebook = async (file: File): Promise<NotebookFile> => {
  const content = await file.text();
  const notebook = JSON.parse(content);
  
  return {
    id: crypto.randomUUID(),
    name: file.name,
    content: notebook
  };
};

export const convertToMarkdown = (notebook: NotebookFile): string => {
  let markdown = `# ${notebook.name}\n\n`;

  notebook.content.cells.forEach((cell) => {
    if (cell.cell_type === 'markdown') {
      markdown += cell.source.join('') + '\n\n';
    } else if (cell.cell_type === 'code') {
      markdown += '```python\n' + cell.source.join('') + '\n```\n\n';
    }
  });

  return markdown;
};