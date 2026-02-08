import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, Suspense, useEffect } from 'react';
import { sections } from '../data/sections';
import { artworks, type Artwork } from '../data/artworks';
import PanoramaScene from '../components/PanoramaScene';
import Hotspot from '../components/Hotspot';
import ArtworkModal from '../components/ArtworkModal';

function LoadingScreen({ themeColor }: { themeColor?: string }) {
    return (
        <div className={`absolute inset-0 flex flex-col items-center justify-center z-20 ${themeColor === 'dome' ? 'bg-dome' :
            themeColor === 'gallery' ? 'bg-gallery' :
                themeColor === 'apse' ? 'bg-apse' :
                    themeColor === 'gate' ? 'bg-gate' : 'bg-midnight'
            }`}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full mb-4"
            />
            <p className="text-muted font-medium animate-pulse">Entering the Virtual Space...</p>
        </div>
    );
}

export default function SectionView() {
    const { id } = useParams<{ id: string }>();
    const section = sections.find((s) => s.id === id);
    const sectionArtworks = artworks.filter((a) => a.sectionId === id);
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedArtwork) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedArtwork]);

    if (!section) {
        return (
            <div className="min-h-screen bg-midnight text-accent flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <h2 className="text-3xl font-bold mb-4">Section Not Found</h2>
                    <p className="text-muted mb-8">The sacred space you are looking for might have moved through time.</p>
                    <Link
                        to="/"
                        className="inline-block px-8 py-3 bg-gold hover:bg-gold-light active:bg-gold-dark text-midnight rounded-full font-bold transition-colors shadow-lg"
                    >
                        Return to Gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative h-screen overflow-hidden text-accent ${section.themeColor === 'dome' ? 'bg-dome' :
            section.themeColor === 'gallery' ? 'bg-gallery' :
                section.themeColor === 'apse' ? 'bg-apse' :
                    section.themeColor === 'gate' ? 'bg-gate' : 'bg-midnight'
            }`}>
            {/* 360 Panorama Scene */}
            <div className="absolute inset-0 z-0">
                <Suspense fallback={<LoadingScreen themeColor={section.themeColor} />}>
                    <PanoramaScene imageUrl="/textures/placeholder.png">
                        {sectionArtworks.length > 0 ? (
                            sectionArtworks.map((artwork) => (
                                <Hotspot
                                    key={artwork.id}
                                    position={artwork.position}
                                    title={artwork.title}
                                    onClick={() => setSelectedArtwork(artwork)}
                                />
                            ))
                        ) : null}
                    </PanoramaScene>
                </Suspense>
            </div>

            {/* UI Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10">
                <motion.header
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="pointer-events-auto"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 bg-gold/10 hover:bg-gold text-gold hover:text-midnight border border-gold/30 rounded-full text-sm font-medium transition-all group pointer-events-auto"
                        title="Return to Gallery"
                    >
                        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
                        Back to Gallery
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mt-2 text-accent drop-shadow-lg">{section.title}</h1>
                    <p className="text-muted max-w-xl text-lg drop-shadow-md">{section.description}</p>
                </motion.header>

                <motion.footer
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="pointer-events-auto flex justify-center"
                >
                    <div className="bg-midnight/40 backdrop-blur-xl px-6 py-3 rounded-full border border-white/5 text-sm text-neutral-300 shadow-2xl">
                        Click and drag to explore • Use scroll to zoom
                    </div>
                </motion.footer>
            </div>

            {/* Artwork Detail Modal */}
            <AnimatePresence>
                {selectedArtwork && (
                    <ArtworkModal
                        artwork={selectedArtwork}
                        onClose={() => setSelectedArtwork(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
