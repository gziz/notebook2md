export interface NotebookCell {
  cell_type: string;
  source: string[];
  metadata?: Record<string, unknown>;
}

export interface NotebookFile {
  id: string;
  name: string;
  content: {
    cells: NotebookCell[];
    metadata: Record<string, unknown>;
    nbformat: number;
    nbformat_minor: number;
  };
}