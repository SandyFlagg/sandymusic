'use client';

import { useState } from 'react';
import Image from 'next/image';

// Comment Interface
export interface Comment {
    id: string;
    userName: string;
    userAvatar: string | null;
    createdAt: string;
    content: string;
    votes: number;
    userVote: 'up' | 'down' | null;
    replies?: Comment[];
    parentId?: string | null;
}

// Comment Component
export default function CommentItem({
    comment,
    onVote,
    onReply,
    onDelete,
    isModerator = false
}: {
    comment: Comment,
    onVote: (id: string, type: 'up' | 'down') => void,
    onReply: (parentId: string, content: string) => void,
    onDelete: (id: string) => void,
    isModerator?: boolean
}) {
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    const handleSubmitReply = () => {
        if (!replyContent.trim()) return;
        onReply(comment.id, replyContent);
        setIsReplying(false);
        setReplyContent('');
    };

    return (
        <div className="flex gap-3 group">
            <div className="flex flex-col items-center gap-1 pt-1 w-8">
                <button
                    onClick={() => onVote(comment.id, 'up')}
                    className={`nav-button p-1 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-90 ${comment.userVote === 'up' ? 'text-orange-500 bg-orange-500/10' : 'text-gray-500 hover:text-orange-500 hover:bg-white/5'}`}
                >
                    <svg className="w-5 h-5" fill={comment.userVote === 'up' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                </button>

                <span className={`text-xs font-bold ${comment.userVote === 'up' ? 'text-orange-500' : comment.userVote === 'down' ? 'text-blue-500' : 'text-white'}`}>
                    {comment.votes}
                </span>

                <button
                    onClick={() => onVote(comment.id, 'down')}
                    className={`nav-button p-1 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-90 ${comment.userVote === 'down' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500 hover:text-blue-500 hover:bg-white/5'}`}
                >
                    <svg className="w-5 h-5" fill={comment.userVote === 'down' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                <div className="w-[2px] h-full bg-white/10 mt-2 rounded-full group-hover:bg-white/20 transition-colors"></div>
            </div>
            <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-2">
                    {comment.userAvatar ? (
                        <Image src={comment.userAvatar} alt={comment.userName} width={24} height={24} className="rounded-full" />
                    ) : (
                        <div className={`w-6 h-6 rounded-full bg-gray-600`}></div>
                    )}
                    <span className="font-bold text-sm text-white hover:underline cursor-pointer">{comment.userName}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">• {new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    {comment.content}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-3">
                    <button
                        onClick={() => setIsReplying(!isReplying)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5 active:scale-95 ${isReplying ? 'text-white bg-white/10' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        Reply
                    </button>

                    {isModerator && (
                        <button
                            onClick={() => onDelete(comment.id)}
                            className="text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 text-red-500 hover:bg-red-500/10 hover:-translate-y-0.5 active:scale-95"
                        >
                            Delete
                        </button>
                    )}
                </div>

                {/* Reply Form */}
                {isReplying && (
                    <div className="mb-6 animate-in fade-in slide-in-from-top-2">
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="What are your thoughts?"
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none min-h-[80px] mb-2"
                            autoFocus
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsReplying(false)}
                                className="text-gray-500 font-bold uppercase tracking-widest text-[10px] px-4 py-2 hover:text-white transition-colors hover:-translate-y-0.5"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReply}
                                disabled={!replyContent.trim()}
                                className="bg-white text-black font-bold uppercase tracking-widest text-[10px] px-5 py-2 rounded-full hover:bg-gray-200 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                Reply
                            </button>
                        </div>
                    </div>
                )}

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="space-y-4 mt-4">
                        {comment.replies.map(reply => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                onVote={onVote}
                                onReply={onReply}
                                onDelete={onDelete}
                                isModerator={isModerator}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
