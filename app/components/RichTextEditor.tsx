'use client';

import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'image'],
                        ['clean']
                    ]
                }
            });

            quillInstance.current.on('text-change', () => {
                if (quillInstance.current) {
                    onChange(quillInstance.current.root.innerHTML);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update content if it changes externally (e.g. initial load)
    useEffect(() => {
        if (quillInstance.current && content && quillInstance.current.root.innerHTML !== content) {
            // Only update if content is different to prevent cursor jumping
            // This is a simple check, might need more robust diffing for complex cases
            if (quillInstance.current.getText().trim() === '') {
                quillInstance.current.root.innerHTML = content;
            }
        }
    }, [content, onChange]);

    const insertProTip = () => {
        if (quillInstance.current) {
            const range = quillInstance.current.getSelection(true);
            const html = `
                <div class="bg-[#111] border border-white/10 rounded-lg p-6 my-8 font-mono text-sm text-gray-400">
                    <div class="flex justify-between text-xs uppercase tracking-widest text-gray-500 mb-4 border-b border-white/10 pb-2">
                        <span>Pro Tip</span>
                    </div>
                    <p>Enter your tip here...</p>
                </div>
                <p><br/></p>
            `;
            quillInstance.current.clipboard.dangerouslyPasteHTML(range.index, html);
        }
    };

    const insertVideo = () => {
        if (quillInstance.current) {
            const range = quillInstance.current.getSelection(true);
            const html = `
                <div class="my-12">
                    <div class="bg-[#111] border border-white/10 rounded-xl p-1 overflow-hidden">
                        <div class="aspect-video bg-gray-800 flex items-center justify-center relative group cursor-pointer">
                            <div class="w-16 h-16 bg-accent rounded-full flex items-center justify-center pl-1 shadow-lg">
                                ▶
                            </div>
                        </div>
                        <div class="p-4 flex justify-between items-center">
                            <span class="text-sm font-bold text-gray-300">Video Title</span>
                            <span class="text-xs text-gray-500 font-mono">00:00</span>
                        </div>
                    </div>
                </div>
                <p><br/></p>
            `;
            quillInstance.current.clipboard.dangerouslyPasteHTML(range.index, html);
        }
    };

    return (
        <div className="bg-[#111] border border-white/10 rounded-lg overflow-hidden text-white flex flex-col">
            <style jsx global>{`
                .ql-toolbar {
                    border: none !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                    background: #0a0a0a;
                }
                .ql-container {
                    border: none !important;
                    font-family: var(--font-mono);
                    font-size: 0.875rem;
                }
                .ql-editor {
                    min-height: 300px;
                    color: #fff;
                }
                .ql-toolbar .ql-stroke {
                    stroke: #888;
                }
                .ql-toolbar .ql-fill {
                    fill: #888;
                }
                .ql-toolbar button:hover .ql-stroke {
                    stroke: #fff;
                }
                .ql-toolbar button:hover .ql-fill {
                    fill: #fff;
                }
                .ql-toolbar button.ql-active .ql-stroke {
                    stroke: #ff5500;
                }
                .ql-toolbar button.ql-active .ql-fill {
                    fill: #ff5500;
                }
            `}</style>

            {/* Custom Toolbar Actions */}
            <div className="bg-[#0a0a0a] border-b border-white/10 p-2 flex gap-2">
                <button
                    onClick={insertProTip}
                    type="button"
                    className="text-[10px] font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 text-accent px-3 py-1 rounded border border-accent/20 transition-colors"
                >
                    + Pro Tip
                </button>
                <button
                    onClick={insertVideo}
                    type="button"
                    className="text-[10px] font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 text-accent px-3 py-1 rounded border border-accent/20 transition-colors"
                >
                    + Video Block
                </button>
            </div>

            <div ref={editorRef} className="flex-1" />
        </div>
    );
}
