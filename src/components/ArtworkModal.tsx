import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { motion } from 'framer-motion';
import type { Artwork } from '../data/artworks';

interface ArtworkModalProps {
    artwork: Artwork;
    onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const soundRef = useRef<Howl | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Focus trap and ESC key handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);

        // Simple focus trap: focus the close button or modal on mount
        modalRef.current?.focus();

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Handle audio narration
    useEffect(() => {
        if (artwork.audio) {
            soundRef.current = new Howl({
                src: [artwork.audio],
                onend: () => setIsPlaying(false),
            });
        }

        return () => {
            if (soundRef.current) {
                soundRef.current.stop();
                soundRef.current.unload();
            }
        };
    }, [artwork.audio]);

    const toggleAudio = () => {
        if (!soundRef.current) return;

        if (isPlaying) {
            soundRef.current.pause();
        } else {
            soundRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/60 backdrop-blur-sm"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
        >
            <motion.div
                ref={modalRef}
                tabIndex={-1}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-midnight border border-neutral-800 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl outline-none"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative aspect-video">
                    <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-gold hover:bg-gold-light text-midnight rounded-full transition-colors shadow-lg"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="p-8 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <h2 id="modal-title" className="text-3xl font-bold text-accent leading-tight">
                            {artwork.title}
                        </h2>
                        {artwork.audio && (
                            <button
                                onClick={toggleAudio}
                                className={`p-4 rounded-full transition-all shadow-lg ${isPlaying ? 'bg-gold-dark text-midnight scale-95' : 'bg-gold text-midnight hover:bg-gold-light'
                                    }`}
                                aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
                            >
                                {isPlaying ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                )}
                            </button>
                        )}
                    </div>

                    <p className="text-muted text-lg leading-relaxed">
                        {artwork.description}
                    </p>

                    <div className="pt-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-gold hover:bg-gold-light active:bg-gold-dark text-midnight rounded-full font-bold transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
