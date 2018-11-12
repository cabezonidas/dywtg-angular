interface Article {
    title: string,
    topicList: string,
    items: any[]   
}

interface Epg {
    items: HighlightItem[];
    platform: string;
    title: string;
}

interface HighlightItem {
    authFlow: boolean;
    id: string;
    playbacks: Playback[];
    title: string;
    type: string;
}

interface Playback {
    height: string;
    name: string;
    url: string;
}

interface GameHighlights {
    copyright: string;
    editorial: {
        preview: Article,
        articles: Article,
        recap: Article,
    };
    highlights: {
        scoreboard: Article, 
        gameCenter: Article
    };
    link: string;
    media: {
        epg: Epg[], 
        milestones: any
    }
}
export default GameHighlights;