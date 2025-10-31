import { create } from "zustand";

interface PdfStore {
  pdfUploaded: boolean;
  setPdfUploaded: (uploaded: boolean) => void;
  pdfName: string;
  setPdfName: (pdf: string) => void;
}

export const usePdfStore = create<PdfStore>((set) => ({
  pdfUploaded: false,
  setPdfUploaded: (uploaded: boolean) => set({ pdfUploaded: uploaded }),
  pdfName: "jghjhjh",
  setPdfName: (pdf: string) => set({ pdfName: pdf }),
}));
