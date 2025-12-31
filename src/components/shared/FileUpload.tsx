/**
 * File Upload Component
 * SMK Marhas Admin Dashboard
 */

'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image, File } from 'lucide-react';

interface FileUploadProps {
    accept?: string;
    multiple?: boolean;
    maxSize?: number; // in MB
    onUpload?: (files: File[]) => void;
}

export function FileUpload({ accept = '*', multiple = false, maxSize = 5, onUpload }: FileUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;
        const validFiles = Array.from(newFiles).filter(f => f.size <= maxSize * 1024 * 1024);
        const updated = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1);
        setFiles(updated);
        onUpload?.(updated);
    };

    const removeFile = (index: number) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onUpload?.(updated);
    };

    const getIcon = (type: string) => {
        if (type.startsWith('image/')) return Image;
        if (type.includes('pdf') || type.includes('document')) return FileText;
        return File;
    };

    return (
        <div className="space-y-3">
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${isDragging ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/5' : 'border-[var(--border-light)] hover:border-[var(--brand-primary)]'}`}
            >
                <Upload size={32} className="text-[var(--text-muted)] mb-3" />
                <p className="text-[var(--text-primary)] font-medium">Klik atau drag file ke sini</p>
                <p className="text-sm text-[var(--text-muted)]">Max {maxSize}MB per file</p>
                <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(e) => handleFiles(e.target.files)} className="hidden" />
            </div>

            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file, i) => {
                        const Icon = getIcon(file.type);
                        return (
                            <div key={i} className="flex items-center gap-3 p-3 bg-[var(--bg-hover)] rounded-lg">
                                <Icon size={20} className="text-[var(--brand-primary)]" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{file.name}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); removeFile(i); }} className="p-1 hover:bg-[var(--bg-active)] rounded">
                                    <X size={16} className="text-[var(--text-muted)]" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
