import { ReactNode } from "react";
import { PdfIcon, DocxIcon, XlxsIcon, CsvIcon } from "src/assets/icons";

interface HandledFile {
  fileIcon?: ReactNode;
  displayedFileName?: string;
}

export const handleFile = (fileString: string): HandledFile => {
  const result: HandledFile = {};
  // handle icons
  const extension = fileString.slice(fileString.lastIndexOf("."));
  if (extension === ".doc" || extension === ".docx") {
    result.fileIcon = <DocxIcon style={{ fill: "blue", width: "30px" }} />;
  } else if (extension === ".xlxs" || extension === ".xlx") {
    result.fileIcon = <XlxsIcon style={{ fill: "green", width: "30px" }} />;
  } else if (extension === ".csv") {
    result.fileIcon = <CsvIcon style={{ fill: "orange", width: "30px" }} />;
  } else {
    result.fileIcon = <PdfIcon style={{ fill: "crimson", width: "30px" }} />;
  }

  // handle file length
  if (fileString.length > 20) {
    result.displayedFileName = `${fileString.substring(0, 15)}...`;
  } else {
    result.displayedFileName = fileString;
  }
  return result;
};
