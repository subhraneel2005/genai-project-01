import { create } from "zustand";

interface PdfStore {
  pdfUploaded: boolean;
  setPdfUploaded: (uploaded: boolean) => void;
  pdfName: string;
  setPdfName: (name: string) => void;
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
  pdfDataUrl: string | null;
  setPdfDataUrl: (url: string | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const usePdfStore = create<PdfStore>((set) => ({
  pdfUploaded: false,
  setPdfUploaded: (uploaded: boolean) => set({ pdfUploaded: uploaded }),
  pdfName: "",
  setPdfName: (name: string) => set({ pdfName: name }),
  pdfFile: null,
  setPdfFile: (file: File | null) => set({ pdfFile: file }),
  pdfDataUrl: null,
  setPdfDataUrl: (url: string | null) => set({ pdfDataUrl: url }),
  open: false,
  setOpen: (open) => set({ open }),
}));
