import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ProblemSection } from "@/components/site/ProblemSection";
import { Method } from "@/components/site/Method";
import { CasesGrid } from "@/components/site/CasesGrid";
import { Services } from "@/components/site/Services";
import { FitSection } from "@/components/site/FitSection";
import { About } from "@/components/site/About";
import { Philosophy } from "@/components/site/Philosophy";
import { LeadForm } from "@/components/site/LeadForm";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
const TITLE="Сергей Спиридонов — performance-маркетолог | Рекламные гипотезы и связки";
const DESCRIPTION="Performance-маркетинг для бизнеса: анализ продукта и спроса, рекламные гипотезы, Яндекс Директ, VK Ads, креативы, воронки и тестирование рекламных связок.";
export const Route=createFileRoute("/")({head:()=>({meta:[{title:TITLE},{name:"description",content:DESCRIPTION},{property:"og:title",content:TITLE},{property:"og:description",content:DESCRIPTION},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:Index});
function Index(){return <div className="min-h-screen bg-background"><Header/><main className="pb-20 md:pb-0"><Hero/><ProblemSection/><Method/><CasesGrid/><Services/><FitSection/><About/><Philosophy/><LeadForm/><FAQ/><FinalCTA/></main><Footer/><MobileCta/></div>}