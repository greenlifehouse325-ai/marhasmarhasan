'use client';

import React from 'react';
import { Bot, Send } from 'lucide-react';

export default function AIAssistantCard() {
    return (
        <div className="bg-gradient-to-br from-[#7C4DFF] to-[#B388FF] rounded-[16px] p-5 text-white relative overflow-hidden h-full flex flex-col justify-between">
            {/* Background Decoration */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full"></div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot size={24} className="text-white" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">Marhas AI</span>
                        <span className="bg-white/25 text-[10px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm">
                            ADMIN MODE
                        </span>
                    </div>
                    <p className="text-white/70 text-xs">AI-powered school assistant</p>
                </div>
            </div>

            {/* Input Area */}
            <div className="relative z-10">
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2.5 backdrop-blur-sm">
                    <input
                        type="text"
                        placeholder="Show students with abnormal attendance today"
                        className="flex-1 bg-transparent text-white text-sm placeholder:text-white/60 focus:outline-none"
                    />
                    <button className="w-8 h-8 bg-white/30 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors">
                        <Send size={14} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
