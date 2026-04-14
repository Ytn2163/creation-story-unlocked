import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onFileClear: () => void;
}

const FileUpload = ({ file, onFileSelect, onFileClear }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  if (file) {
    return (
      <div className="flex items-center gap-4 rounded-xl border-2 border-primary/20 bg-primary/5 p-6 animate-fade-in">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{file.name}</p>
          <p className="text-sm text-muted-foreground">
            {(file.size / 1024).toFixed(1)} КБ
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onFileClear}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all ${
        isDragActive
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/40 hover:bg-muted/50"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">
            {isDragActive ? "Отпустите файл здесь" : "Загрузите техническое задание"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Поддерживаются PDF, DOCX и TXT (до 10 МБ)
          </p>
        </div>
        <Button variant="outline" size="sm" type="button">
          Выбрать файл
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
