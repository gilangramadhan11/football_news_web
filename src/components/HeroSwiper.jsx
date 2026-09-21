'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const backendUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://footballnews-production.up.railway.app'
    : 'http://127.0.0.1:8000';

export default function HeroSwiper({ featured }) {
    if (!featured || featured.length === 0) return null;

    return (
        <div className="relative col-span-full">
            <Swiper
                modules={[
                    Navigation,
                    Pagination,
                    EffectFade,
                    Autoplay
                ]}
                effect="fade"
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{
                    el: '.swiper-pagination-custom',
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="heroSwiper"
            >
            {featured.map((featuredArticle, index) => (
                <SwiperSlide key={featuredArticle.id}>
                    <div className="relative h-[500px] md:h-[650px] lg:h-[900px]">
                        <img
                            src={`${backendUrl}/storage/${article.thumbnail}`}
                            alt={featuredArticle.title}
                            className="w-full h-full object-cover"
                        />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent"></div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 lg:p-14 text-white z-10">
                                <div className="flex items-center gap-2 flex-wrap">
                                    {index === 0 && (
                                        <span className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg shadow-red-900/40">
                                            <i className='bx bxs-hot text-sm'></i>
                                            Hot News
                                        </span>
                                    )}

                                    <span className="bg-lime-500/15 backdrop-blur-sm border border-lime-400/30 text-lime-300 px-3 py-1 rounded-full text-xs font-semibold">
                                        {featuredArticle.category?.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 mt-4 text-slate-300 text-sm">
                                    <span className="flex items-center gap-1.5">
                                        <i className='bx bx-calendar text-lime-400'></i>
                                        {featuredArticle.published_at &&
                                            new Date(featuredArticle.published_at).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })
                                        }
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <i className='bx bx-show text-lime-400'></i>
                                        {featuredArticle.views} views
                                    </span>
                                </div>

                                <h1 className="text-lg md:text-3xl lg:text-4xl font-bold mt-3 leading-tight">
                                    {featuredArticle.title}
                                </h1>

                                <h3 className="mt-4 hidden max-w-7xl text-slate-300 text-xl md:text-xl leading-relaxed md:block">
                                    {featuredArticle.content
                                        ?.replace(/<[^>]*>/g, '')
                                        .slice(0, 240)
                                    }
                                </h3>
                                <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
                                    <Link href={`/article/${featuredArticle.slug}`}
                                    className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs mt-6 bg-lime-500  hover:bg-lime-400 text-slate-900 font-semibold md:gap-2 md:px-6 md:py-2.5 md:text-base rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)]">
                                        Baca Selengkapnya
                                        <i className='bx bx-right-arrow-alt text-base md:text-xl group-hover:translate-x-1 transition-transform'></i>
                                    </Link>
                                    <div className="flex items-center gap-2">
                                        <div className="swiper-button-prev-custom md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-lime-500 hover:text-slate-900 hover:border-lime-400 transition-all duration-300 cursor-pointer">
                                            <i className='bx bx-chevron-left text-xl md:text-2xl'></i>
                                        </div>
                                        <div className="swiper-button-next-custom md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-lime-500 hover:text-slate-900 hover:border-lime-400 transition-all duration-300 cursor-pointer">
                                            <i className='bx bx-chevron-right text-xl md:text-2xl'></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>                    
        </div>      
    );
}