export interface Section {
    id: string;
    title: string;
    description: string;
    image: string;
    themeColor: string;
}

export const sections: Section[] = [
    {
        id: 'main-dome',
        title: 'Central Nave & Dome Area',
        description: 'The central dome and nave form the heart of the church, symbolizing spiritual unity and architectural harmony.',
        image: 'bg-dome/40',
        themeColor: 'dome',
    },
    {
        id: 'upper-gallery',
        title: 'Upper Gallery & Balcony',
        description: 'The upper gallery offers a panoramic view of the interior and was traditionally used for observation and ceremonial purposes.',
        image: 'bg-gallery/40',
        themeColor: 'gallery',
    },
    {
        id: 'apse',
        title: 'Apse',
        description: 'The apse is the most sacred architectural element of the church, traditionally housing the altar and religious iconography.',
        image: 'bg-apse/40',
        themeColor: 'apse',
    },
    {
        id: 'imperial-gate',
        title: 'Main Entrance',
        description: 'The main entrance serves as the ceremonial transition between the exterior world and the sacred interior space.',
        image: 'bg-gate/40',
        themeColor: 'gate',
    },
];
