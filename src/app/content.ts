export interface PowerDistribution {
    diplomatic: number;
    informational: number;
    military: number;
    economic: number;
}

export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
}

export interface President {
    name: string;
    years: string;
    focus: string;
    grandStrategy: string;
    nationalInterests: string[];
    theory: string;
    instrumentsOfPower: string[];
    fasAnalysis: string;
    keyEvents: string[];
    powerDistribution: PowerDistribution;
    quotes: string[];
    timelineEvents: TimelineEvent[];
}

export const presidents: President[] = [
    {
        name: "Truman",
        years: "1945-1953",
        focus: "Containment and Post-WWII Recovery",
        grandStrategy: "Containment",
        nationalInterests: ["Defense of homeland", "Promote democracy", "Prevent Soviet expansion"],
        theory: "Neorealism",
        instrumentsOfPower: ["Military (NATO)", "Economic (Marshall Plan)", "Diplomacy"],
        fasAnalysis: "High feasibility due to U.S. post-war economic and military strength. Strong acceptability both domestically and internationally. Highly suitable for stabilizing Europe and containing Soviet influence.",
        keyEvents: ["Marshall Plan (1948)", "NATO Formation (1949)", "Korean War (1950-1953)"],
        powerDistribution: { diplomatic: 80, informational: 70, military: 90, economic: 100 },
        quotes: [
            "George Kennan's 'Long Telegram' described the Soviets as 'implacably hostile' and 'incapable of long-term cooperation with the West.'",
            "Brands (2014) highlights that Truman's 'containment' strategy fundamentally shaped the Cold War era, asserting U.S. dominance in a bipolar world order.",
            "As noted by Nuechterlein, Truman prioritized 'defense of the homeland' and 'promoting democracy,' essential national interests in the early Cold War period."
        ],
        timelineEvents: [
            { year: "1947", title: "Truman Doctrine", description: "U.S. policy to aid nations threatened by Soviet expansionism." },
            { year: "1948", title: "Marshall Plan", description: "Economic assistance program for European recovery." },
            { year: "1949", title: "NATO Formation", description: "Creation of the North Atlantic Treaty Organization." },
            { year: "1950", title: "Korean War Begins", description: "U.S. enters the Korean War to contain communist expansion." }
        ]
    },
    {
        name: "Nixon",
        years: "1969-1974",
        focus: "Détente and China Relations",
        grandStrategy: "Détente",
        nationalInterests: ["Economic well-being", "Stable world order", "Maintain balance with USSR and China"],
        theory: "Realism",
        instrumentsOfPower: ["Diplomacy (China, USSR)", "Military (Vietnam)", "Economic"],
        fasAnalysis: "Mixed feasibility due to domestic economic challenges and Cold War complexities. High acceptability for détente with China but mixed public opinion on Vietnam. Suitable for reducing Cold War tensions.",
        keyEvents: ["Opening to China (1972)", "SALT I Treaty (1972)", "End of Vietnam War (1973)"],
        powerDistribution: { diplomatic: 100, informational: 60, military: 70, economic: 80 },
        quotes: [
            "Nixon described his foreign policy as a 'strategy of negotiations'—seeking leverage through diplomacy to reduce global tensions (Brands, 2014).",
            "'China's role in the world has changed, and America must adjust.' Nixon's move to open relations with China in 1972 was a pivotal geopolitical shift (Nye, 2015).",
            "Détente was 'a calculated blend of hard and soft power,' focusing on managing relations with both China and the USSR (Elman & Jensen, 2014)."
        ],
        timelineEvents: [
            { year: "1969", title: "Nixon Doctrine", description: "Policy of 'Vietnamization' of the Vietnam War." },
            { year: "1972", title: "Visit to China", description: "Nixon's historic visit to the People's Republic of China." },
            { year: "1972", title: "SALT I Treaty", description: "Strategic Arms Limitation Talks agreement with the Soviet Union." },
            { year: "1973", title: "Paris Peace Accords", description: "Agreement to end direct U.S. involvement in the Vietnam War." }
        ]
    },
    {
        name: "Reagan",
        years: "1981-1989",
        focus: "Confrontation with USSR",
        grandStrategy: "Confrontation with USSR",
        nationalInterests: [
            "Defense of homeland",
            "Promote democracy globally",
            "Maintain military and economic superiority",
            "Undermine Soviet influence"
        ],
        theory: "Offensive Realism",
        instrumentsOfPower: ["Military (SDI)", "Economic sanctions", "Diplomacy (arms reduction)"],
        fasAnalysis: "Feasibility was challenging due to high defense spending (SDI) and Cold War pressures. Acceptability strong domestically with Reagan's 'evil empire' rhetoric but raised concerns internationally. Suitable for increasing pressure on the USSR.",
        keyEvents: ["Strategic Defense Initiative (1983)", "Reykjavík Summit (1986)", "Fall of Berlin Wall (1989)"],
        powerDistribution: { diplomatic: 70, informational: 90, military: 100, economic: 80 },
        quotes: [
            "Reagan's Strategic Defense Initiative (SDI) symbolized 'hard power at its peak,' challenging the Soviet Union's military capabilities (Brands, 2014).",
            "Reagan framed the Cold War as 'a moral struggle between good and evil,' emphasizing ideological confrontation (Nuechterlein, 2001).",
            "Reykjavík Summit was a turning point in arms control, showcasing Reagan's 'dual-use' of military pressure and diplomatic outreach (Nye, 2009)."
        ],
        timelineEvents: [
            { year: "1981", title: "Reagan Doctrine", description: "Policy of supporting anti-communist movements worldwide." },
            { year: "1983", title: "SDI Announced", description: "Unveiling of the Strategic Defense Initiative ('Star Wars')." },
            { year: "1985", title: "Geneva Summit", description: "First meeting between Reagan and Soviet leader Gorbachev." },
            { year: "1987", title: "INF Treaty", description: "Intermediate-Range Nuclear Forces Treaty signed with the USSR." }
        ]
    }
];
