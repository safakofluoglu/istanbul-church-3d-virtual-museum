import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { sections } from '../data/sections';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

export default function Landing() {
    return (
        <div className="min-h-screen bg-midnight text-accent p-8 flex flex-col items-center justify-center">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-4xl w-full space-y-12 text-center"
            >
                <motion.div variants={itemVariants} className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gold">
                        Istanbul Church – 3D Virtual Museum
                    </h1>
                    <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
                        Explore the architecture, history, and sacred spaces of a historic church in Istanbul through an immersive 3D experience.
                    </p>
                    <div className="pt-4">
                        <Link
                            to="/section/main-dome"
                            className="inline-block px-10 py-4 bg-gold hover:bg-gold-light active:bg-gold-dark text-midnight rounded-full font-bold transition-all shadow-lg hover:shadow-gold/20"
                        >
                            Start Virtual Tour
                        </Link>
                    </div>
                </motion.div>

                <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
                    {sections.map((section) => (
                        <motion.div key={section.id} variants={itemVariants}>
                            <Link
                                to={`/section/${section.id}`}
                                className="group block relative overflow-hidden rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-gold/50 transition-colors duration-300"
                            >
                                <div className={`h-48 w-full ${section.image} opacity-80 group-hover:scale-110 transition-transform duration-700 ease-out`} />
                                <div className={`absolute inset-0 bg-gradient-to-t opacity-90 transition-opacity duration-300 ${section.themeColor === 'dome' ? 'from-dome via-dome/20 to-transparent' :
                                    section.themeColor === 'gallery' ? 'from-gallery via-gallery/20 to-transparent' :
                                        section.themeColor === 'apse' ? 'from-apse via-apse/20 to-transparent' :
                                            section.themeColor === 'gate' ? 'from-gate via-gate/20 to-transparent' : 'from-midnight'
                                    }`} />
                                <div className="absolute bottom-0 left-0 p-6 text-left w-full">
                                    <h3 className="text-2xl font-bold text-accent mb-2 group-hover:text-gold transition-colors">{section.title}</h3>
                                    <p className="text-sm text-neutral-300 line-clamp-2">{section.description}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
