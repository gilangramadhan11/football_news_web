import HeroSwiper from '@/components/HeroSwiper';
import LatestNews from '@/components/LatestNews';
import MatchScore from '@/components/MatchScore';
import PopulerNews from '@/components/PopulerNews';
import Standing from '@/components/Standing';
import Footer from "@/components/Footer";


async function getHomeData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, { cache: 'no-store' });
    if (!res.ok) 
      return { 
        breakingNews: [], 
        featured: [], 
        recentArticles: [],
        standings: [], 
        weekFixtures: [],
        populerArticles: [],
        trending: [],
        topScorers: [],
        topAssists: []
      };
    return res.json();
}

export default async function HomePage() {
    const { featured, recentArticles, standings, weekFixtures, populerArticles, trending, topScorers, topAssists } = await getHomeData();
    
    return (
        <>
            <div className="pt-16">
                <HeroSwiper featured={featured} />
                <LatestNews latest={recentArticles} />
                <MatchScore standings={standings} weekFixtures={weekFixtures} />
                <PopulerNews populerArticles={populerArticles} trending={trending} />
                <Standing standings={standings} topScorers={topScorers} topAssists={topAssists} />
            </div>
            <Footer />
        </>
    );
}