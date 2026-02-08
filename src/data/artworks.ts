export interface Artwork {
    id: string;
    sectionId: string;
    title: string;
    description: string;
    image: string;
    audio?: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
}

export const artworks: Artwork[] = [
    {
        id: "church-dome-hotspot",
        sectionId: "main-dome",
        title: "Byzantine Dome Architecture",
        description: "The primary dome of this historic structure represents a pinnacle of Byzantine engineering. Its design utilizes pendentives to support the massive circular ceiling over a rectangular base, creating a sense of weightless space.",
        image: "https://images.unsplash.com/photo-1590732488849-bc9424f2aef0?auto=format&fit=crop&q=80&w=800",
        position: { x: 2, y: 1, z: -3 }
    },
    {
        id: "apse-mosaic-hotspot",
        sectionId: "apse",
        title: "Classical Mosaic Art",
        description: "This historic mosaic depicts traditional religious figures common to the era. It serves as a prime example of the intricate glass and gold leaf techniques used by artisans of the period to adorn sacred spaces.",
        image: "https://images.unsplash.com/photo-1621644799011-827cb63a436a?auto=format&fit=crop&q=80&w=800",
        position: { x: -2, y: 0.5, z: -4 }
    }
];
