"use client";

import { Copy, Download } from "lucide-react";

import { FaShare } from "react-icons/fa";

import { getFilePlugin } from "@react-pdf-viewer/get-file";

import Link from "next/link";
import QR from "./qr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PdfViewerProps {
  url: string;
  name: string;
}

export default function PdfViewer({ url, name }: PdfViewerProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <iframe className="h-[75vh] w-[80%]" src={`${url}`}></iframe>
    </div>
  );
}
