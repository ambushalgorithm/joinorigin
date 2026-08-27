/**
 * Content registry + loader (design §6, §7.1).
 *
 * Body copy lives in committed per-city per-locale content files — NEVER in
 * locale JSONs (localization R2/R5). This module registers every authored
 * file and resolves content with an EN fallback:
 *
 * - `getContent(kind, slug, locale)` → the requested locale when committed,
 *   else the EN source of truth (EN body at canonical URLs; Google
 *   Translated results cover untranslated locales — design §7.1).
 * - `listContent(locale)` → all content available for a locale.
 *
 * Sprint 18 (TASK-442): registers the full 55-city EN set + per-locale
 * city translations + 12×20 guide translations (240) so every committed
 * content file is reachable through the registry.
 *
 * The registry itself (`../locationPages.ts`) consumes this loader to derive
 * page entries and to run the G1–G5 quality gates.
 */

import type { Locale } from '@joinorigin/i18n';

import germanyCountryEn from './en/country/germany';
import unitedStatesCountryEn from './en/country/united-states';
import berlinRegionEn from './en/region/berlin';
import newYorkRegionEn from './en/region/new-york';
// Story G (TASK-507) — flagship country/region translations.
import germanyCountryDe from './de/country/germany';
import berlinRegionDe from './de/region/berlin';
// Story G remediation (TASK-512) — de/bavaria region translation.
import bavariaRegionDe from './de/region/bavaria';
// Story G (TASK-502..507) — EN country pages.
import argentinaCountryEn from './en/country/argentina';
import australiaCountryEn from './en/country/australia';
import brazilCountryEn from './en/country/brazil';
import canadaCountryEn from './en/country/canada';
import chinaCountryEn from './en/country/china';
import colombiaCountryEn from './en/country/colombia';
import denmarkCountryEn from './en/country/denmark';
import egyptCountryEn from './en/country/egypt';
import franceCountryEn from './en/country/france';
import hongKongCountryEn from './en/country/hong-kong';
import indiaCountryEn from './en/country/india';
import indonesiaCountryEn from './en/country/indonesia';
import iranCountryEn from './en/country/iran';
import irelandCountryEn from './en/country/ireland';
import italyCountryEn from './en/country/italy';
import japanCountryEn from './en/country/japan';
import kenyaCountryEn from './en/country/kenya';
import mexicoCountryEn from './en/country/mexico';
import moroccoCountryEn from './en/country/morocco';
import nigeriaCountryEn from './en/country/nigeria';
import peruCountryEn from './en/country/peru';
import polandCountryEn from './en/country/poland';
import portugalCountryEn from './en/country/portugal';
import russiaCountryEn from './en/country/russia';
import singaporeCountryEn from './en/country/singapore';
import southAfricaCountryEn from './en/country/south-africa';
import southKoreaCountryEn from './en/country/south-korea';
import spainCountryEn from './en/country/spain';
import taiwanCountryEn from './en/country/taiwan';
import thailandCountryEn from './en/country/thailand';
import theNetherlandsCountryEn from './en/country/the-netherlands';
import turkeyCountryEn from './en/country/turkey';
import ukraineCountryEn from './en/country/ukraine';
import unitedArabEmiratesCountryEn from './en/country/united-arab-emirates';
import unitedKingdomCountryEn from './en/country/united-kingdom';
import vietnamCountryEn from './en/country/vietnam';
// Story G (TASK-502..507) — EN region pages.
import antioquiaRegionEn from './en/region/antioquia';
import atlanticoRegionEn from './en/region/atlantico';
import bangkokRegionEn from './en/region/bangkok';
import bavariaRegionEn from './en/region/bavaria';
import bogotaDCRegionEn from './en/region/bogota-d-c';
import britishColumbiaRegionEn from './en/region/british-columbia';
import buenosAiresFDRegionEn from './en/region/buenos-aires-f-d';
import cairoRegionEn from './en/region/cairo';
import californiaRegionEn from './en/region/california';
import capitalRegionRegionEn from './en/region/capital-region';
import casablancaSettatRegionEn from './en/region/casablanca-settat';
import cataloniaRegionEn from './en/region/catalonia';
import centralAndWesternRegionEn from './en/region/central-and-western';
import delhiRegionEn from './en/region/delhi';
import dubaiRegionEn from './en/region/dubai';
import englandRegionEn from './en/region/england';
import gautengRegionEn from './en/region/gauteng';
import hoChiMinhCityHcmcRegionEn from './en/region/ho-chi-minh-city-hcmc';
import ileDeFranceRegionEn from './en/region/ile-de-france';
import illinoisRegionEn from './en/region/illinois';
import istanbulRegionEn from './en/region/istanbul';
import jakartaRegionEn from './en/region/jakarta';
import karnatakaRegionEn from './en/region/karnataka';
import kyivCityRegionEn from './en/region/kyiv-city';
import lagosRegionEn from './en/region/lagos';
import leinsterRegionEn from './en/region/leinster';
import limaProvinceRegionEn from './en/region/lima-province';
import lisbonRegionEn from './en/region/lisbon';
import lombardyRegionEn from './en/region/lombardy';
import madridRegionEn from './en/region/madrid';
import maharashtraRegionEn from './en/region/maharashtra';
import mazoviaRegionEn from './en/region/mazovia';
import mexicoCityRegionEn from './en/region/mexico-city';
import moscowRegionEn from './en/region/moscow';
import nairobiCountyRegionEn from './en/region/nairobi-county';
import newSouthWalesRegionEn from './en/region/new-south-wales';
import northHollandRegionEn from './en/region/north-holland';
import ontarioRegionEn from './en/region/ontario';
import osakaRegionEn from './en/region/osaka';
import quebecRegionEn from './en/region/quebec';
import rioDeJaneiroRegionEn from './en/region/rio-de-janeiro';
import saoPauloRegionEn from './en/region/sao-paulo';
import seoulRegionEn from './en/region/seoul';
import shanghaiRegionEn from './en/region/shanghai';
import singaporeRegionEn from './en/region/singapore';
import taiwanRegionEn from './en/region/taiwan';
import tamilNaduRegionEn from './en/region/tamil-nadu';
import tehranRegionEn from './en/region/tehran';
import telanganaRegionEn from './en/region/telangana';
import texasRegionEn from './en/region/texas';
import tokyoRegionEn from './en/region/tokyo';
import westernCapeRegionEn from './en/region/western-cape';
// Story G (TASK-502..507) — predominant-locale country/region translations.
import egyptCountryAr from './ar/country/egypt';
import moroccoCountryAr from './ar/country/morocco';
import unitedArabEmiratesCountryAr from './ar/country/united-arab-emirates';
import cairoRegionAr from './ar/region/cairo';
import casablancaSettatRegionAr from './ar/region/casablanca-settat';
import dubaiRegionAr from './ar/region/dubai';
import argentinaCountryEs from './es/country/argentina';
import colombiaCountryEs from './es/country/colombia';
import mexicoCountryEs from './es/country/mexico';
import peruCountryEs from './es/country/peru';
import spainCountryEs from './es/country/spain';
import antioquiaRegionEs from './es/region/antioquia';
import atlanticoRegionEs from './es/region/atlantico';
import bogotaDCRegionEs from './es/region/bogota-d-c';
import buenosAiresFDRegionEs from './es/region/buenos-aires-f-d';
import cataloniaRegionEs from './es/region/catalonia';
import limaProvinceRegionEs from './es/region/lima-province';
import madridRegionEs from './es/region/madrid';
import mexicoCityRegionEs from './es/region/mexico-city';
import iranCountryFa from './fa/country/iran';
import tehranRegionFa from './fa/region/tehran';
import franceCountryFr from './fr/country/france';
import ileDeFranceRegionFr from './fr/region/ile-de-france';
import indiaCountryHi from './hi/country/india';
import delhiRegionHi from './hi/region/delhi';
import karnatakaRegionHi from './hi/region/karnataka';
import maharashtraRegionHi from './hi/region/maharashtra';
import tamilNaduRegionHi from './hi/region/tamil-nadu';
import telanganaRegionHi from './hi/region/telangana';
import indonesiaCountryId from './id/country/indonesia';
import jakartaRegionId from './id/region/jakarta';
import italyCountryIt from './it/country/italy';
import lombardyRegionIt from './it/region/lombardy';
import japanCountryJa from './ja/country/japan';
import osakaRegionJa from './ja/region/osaka';
import tokyoRegionJa from './ja/region/tokyo';
import southKoreaCountryKo from './ko/country/south-korea';
import seoulRegionKo from './ko/region/seoul';
import theNetherlandsCountryNl from './nl/country/the-netherlands';
import northHollandRegionNl from './nl/region/north-holland';
import polandCountryPl from './pl/country/poland';
import mazoviaRegionPl from './pl/region/mazovia';
import brazilCountryPtbr from './pt-BR/country/brazil';
import portugalCountryPtbr from './pt-BR/country/portugal';
import lisbonRegionPtbr from './pt-BR/region/lisbon';
import rioDeJaneiroRegionPtbr from './pt-BR/region/rio-de-janeiro';
import saoPauloRegionPtbr from './pt-BR/region/sao-paulo';
import russiaCountryRu from './ru/country/russia';
import moscowRegionRu from './ru/region/moscow';
import thailandCountryTh from './th/country/thailand';
import bangkokRegionTh from './th/region/bangkok';
import turkeyCountryTr from './tr/country/turkey';
import istanbulRegionTr from './tr/region/istanbul';
import ukraineCountryUk from './uk/country/ukraine';
import kyivCityRegionUk from './uk/region/kyiv-city';
import vietnamCountryVi from './vi/country/vietnam';
import hoChiMinhCityHcmcRegionVi from './vi/region/ho-chi-minh-city-hcmc';
import chinaCountryZhcn from './zh-CN/country/china';
import shanghaiRegionZhcn from './zh-CN/region/shanghai';
import hongKongCountryZhtw from './zh-TW/country/hong-kong';
import taiwanCountryZhtw from './zh-TW/country/taiwan';
import centralAndWesternRegionZhtw from './zh-TW/region/central-and-western';
import taiwanRegionZhtw from './zh-TW/region/taiwan';
import cairoCityAr from './ar/city/cairo';
import casablancaCityAr from './ar/city/casablanca';
import dubaiCityAr from './ar/city/dubai';
import berlinCityDe from './de/city/berlin';
import munichCityDe from './de/city/munich';
import amsterdamCityEn from './en/city/amsterdam';
import austinCityEn from './en/city/austin';
import bangkokCityEn from './en/city/bangkok';
import barcelonaCityEn from './en/city/barcelona';
import barranquillaCityEn from './en/city/barranquilla';
import bengaluruCityEn from './en/city/bengaluru';
import berlinCityEn from './en/city/berlin';
import bogotaCityEn from './en/city/bogota';
import buenosAiresCityEn from './en/city/buenos-aires';
import cairoCityEn from './en/city/cairo';
import capeTownCityEn from './en/city/cape-town';
import casablancaCityEn from './en/city/casablanca';
import chennaiCityEn from './en/city/chennai';
import chicagoCityEn from './en/city/chicago';
import copenhagenCityEn from './en/city/copenhagen';
import delhiCityEn from './en/city/delhi';
import dubaiCityEn from './en/city/dubai';
import dublinCityEn from './en/city/dublin';
import hoChiMinhCityCityEn from './en/city/ho-chi-minh-city';
import hongKongCityEn from './en/city/hong-kong';
import hyderabadCityEn from './en/city/hyderabad';
import istanbulCityEn from './en/city/istanbul';
import jakartaCityEn from './en/city/jakarta';
import johannesburgCityEn from './en/city/johannesburg';
import kyivCityEn from './en/city/kyiv';
import lagosCityEn from './en/city/lagos';
import limaCityEn from './en/city/lima';
import lisbonCityEn from './en/city/lisbon';
import londonCityEn from './en/city/london';
import losAngelesCityEn from './en/city/los-angeles';
import madridCityEn from './en/city/madrid';
import medellinCityEn from './en/city/medellin';
import mexicoCityCityEn from './en/city/mexico-city';
import milanCityEn from './en/city/milan';
import montrealCityEn from './en/city/montreal';
import moscowCityEn from './en/city/moscow';
import mumbaiCityEn from './en/city/mumbai';
import munichCityEn from './en/city/munich';
import nairobiCityEn from './en/city/nairobi';
import newYorkCityEn from './en/city/new-york';
import osakaCityEn from './en/city/osaka';
import parisCityEn from './en/city/paris';
import puneCityEn from './en/city/pune';
import rioDeJaneiroCityEn from './en/city/rio-de-janeiro';
import sanFranciscoCityEn from './en/city/san-francisco';
import saoPauloCityEn from './en/city/sao-paulo';
import seoulCityEn from './en/city/seoul';
import shanghaiCityEn from './en/city/shanghai';
import singaporeCityEn from './en/city/singapore';
import sydneyCityEn from './en/city/sydney';
import taipeiCityEn from './en/city/taipei';
import tehranCityEn from './en/city/tehran';
import tokyoCityEn from './en/city/tokyo';
import torontoCityEn from './en/city/toronto';
import vancouverCityEn from './en/city/vancouver';
import warsawCityEn from './en/city/warsaw';
import barcelonaCityEs from './es/city/barcelona';
import barranquillaCityEs from './es/city/barranquilla';
import bogotaCityEs from './es/city/bogota';
import buenosAiresCityEs from './es/city/buenos-aires';
import limaCityEs from './es/city/lima';
import madridCityEs from './es/city/madrid';
import medellinCityEs from './es/city/medellin';
import mexicoCityCityEs from './es/city/mexico-city';
import tehranCityFa from './fa/city/tehran';
import montrealCityFr from './fr/city/montreal';
import parisCityFr from './fr/city/paris';
import bengaluruCityHi from './hi/city/bengaluru';
import chennaiCityHi from './hi/city/chennai';
import delhiCityHi from './hi/city/delhi';
import hyderabadCityHi from './hi/city/hyderabad';
import mumbaiCityHi from './hi/city/mumbai';
import puneCityHi from './hi/city/pune';
import jakartaCityId from './id/city/jakarta';
import milanCityIt from './it/city/milan';
import osakaCityJa from './ja/city/osaka';
import tokyoCityJa from './ja/city/tokyo';
import seoulCityKo from './ko/city/seoul';
import amsterdamCityNl from './nl/city/amsterdam';
import warsawCityPl from './pl/city/warsaw';
import lisbonCityPtbr from './pt-BR/city/lisbon';
import rioDeJaneiroCityPtbr from './pt-BR/city/rio-de-janeiro';
import saoPauloCityPtbr from './pt-BR/city/sao-paulo';
import moscowCityRu from './ru/city/moscow';
import bangkokCityTh from './th/city/bangkok';
import istanbulCityTr from './tr/city/istanbul';
import kyivCityUk from './uk/city/kyiv';
import hoChiMinhCityCityVi from './vi/city/ho-chi-minh-city';
import shanghaiCityZhcn from './zh-CN/city/shanghai';
import hongKongCityZhtw from './zh-TW/city/hong-kong';
import taipeiCityZhtw from './zh-TW/city/taipei';
import createAGroupGuideAr from './ar/guide/create-a-group';
import createAProjectGuideAr from './ar/guide/create-a-project';
import findACoFounderGuideAr from './ar/guide/find-a-co-founder';
import first10MembersGuideAr from './ar/guide/first-10-members';
import hybridCommunitiesGuideAr from './ar/guide/hybrid-origins';
import keepACommunityActiveGuideAr from './ar/guide/keep-an-origin-active';
import moderationGuideAr from './ar/guide/moderation';
import organizeAMeetupGuideAr from './ar/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideAr from './ar/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideAr from './ar/guide/publish-a-startup-concept';
import publishAnIdeaGuideAr from './ar/guide/publish-an-idea';
import startACommunityGuideAr from './ar/guide/start-an-origin';
import createAGroupGuideDe from './de/guide/create-a-group';
import createAProjectGuideDe from './de/guide/create-a-project';
import findACoFounderGuideDe from './de/guide/find-a-co-founder';
import first10MembersGuideDe from './de/guide/first-10-members';
import hybridCommunitiesGuideDe from './de/guide/hybrid-origins';
import keepACommunityActiveGuideDe from './de/guide/keep-an-origin-active';
import moderationGuideDe from './de/guide/moderation';
import organizeAMeetupGuideDe from './de/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideDe from './de/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideDe from './de/guide/publish-a-startup-concept';
import publishAnIdeaGuideDe from './de/guide/publish-an-idea';
import startACommunityGuideDe from './de/guide/start-an-origin';
import createAGroupGuideEn from './en/guide/create-a-group';
import createAProjectGuideEn from './en/guide/create-a-project';
import findACoFounderGuideEn from './en/guide/find-a-co-founder';
import first10MembersGuideEn from './en/guide/first-10-members';
import hybridCommunitiesGuideEn from './en/guide/hybrid-origins';
import keepACommunityActiveGuideEn from './en/guide/keep-an-origin-active';
import moderationGuideEn from './en/guide/moderation';
import organizeAMeetupGuideEn from './en/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideEn from './en/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideEn from './en/guide/publish-a-startup-concept';
import publishAnIdeaGuideEn from './en/guide/publish-an-idea';
import startACommunityGuideEn from './en/guide/start-an-origin';
import createAGroupGuideEs from './es/guide/create-a-group';
import createAProjectGuideEs from './es/guide/create-a-project';
import findACoFounderGuideEs from './es/guide/find-a-co-founder';
import first10MembersGuideEs from './es/guide/first-10-members';
import hybridCommunitiesGuideEs from './es/guide/hybrid-origins';
import keepACommunityActiveGuideEs from './es/guide/keep-an-origin-active';
import moderationGuideEs from './es/guide/moderation';
import organizeAMeetupGuideEs from './es/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideEs from './es/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideEs from './es/guide/publish-a-startup-concept';
import publishAnIdeaGuideEs from './es/guide/publish-an-idea';
import startACommunityGuideEs from './es/guide/start-an-origin';
import createAGroupGuideFa from './fa/guide/create-a-group';
import createAProjectGuideFa from './fa/guide/create-a-project';
import findACoFounderGuideFa from './fa/guide/find-a-co-founder';
import first10MembersGuideFa from './fa/guide/first-10-members';
import hybridCommunitiesGuideFa from './fa/guide/hybrid-origins';
import keepACommunityActiveGuideFa from './fa/guide/keep-an-origin-active';
import moderationGuideFa from './fa/guide/moderation';
import organizeAMeetupGuideFa from './fa/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideFa from './fa/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideFa from './fa/guide/publish-a-startup-concept';
import publishAnIdeaGuideFa from './fa/guide/publish-an-idea';
import startACommunityGuideFa from './fa/guide/start-an-origin';
import createAGroupGuideFr from './fr/guide/create-a-group';
import createAProjectGuideFr from './fr/guide/create-a-project';
import findACoFounderGuideFr from './fr/guide/find-a-co-founder';
import first10MembersGuideFr from './fr/guide/first-10-members';
import hybridCommunitiesGuideFr from './fr/guide/hybrid-origins';
import keepACommunityActiveGuideFr from './fr/guide/keep-an-origin-active';
import moderationGuideFr from './fr/guide/moderation';
import organizeAMeetupGuideFr from './fr/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideFr from './fr/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideFr from './fr/guide/publish-a-startup-concept';
import publishAnIdeaGuideFr from './fr/guide/publish-an-idea';
import startACommunityGuideFr from './fr/guide/start-an-origin';
import createAGroupGuideHi from './hi/guide/create-a-group';
import createAProjectGuideHi from './hi/guide/create-a-project';
import findACoFounderGuideHi from './hi/guide/find-a-co-founder';
import first10MembersGuideHi from './hi/guide/first-10-members';
import hybridCommunitiesGuideHi from './hi/guide/hybrid-origins';
import keepACommunityActiveGuideHi from './hi/guide/keep-an-origin-active';
import moderationGuideHi from './hi/guide/moderation';
import organizeAMeetupGuideHi from './hi/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideHi from './hi/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideHi from './hi/guide/publish-a-startup-concept';
import publishAnIdeaGuideHi from './hi/guide/publish-an-idea';
import startACommunityGuideHi from './hi/guide/start-an-origin';
import createAGroupGuideId from './id/guide/create-a-group';
import createAProjectGuideId from './id/guide/create-a-project';
import findACoFounderGuideId from './id/guide/find-a-co-founder';
import first10MembersGuideId from './id/guide/first-10-members';
import hybridCommunitiesGuideId from './id/guide/hybrid-origins';
import keepACommunityActiveGuideId from './id/guide/keep-an-origin-active';
import moderationGuideId from './id/guide/moderation';
import organizeAMeetupGuideId from './id/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideId from './id/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideId from './id/guide/publish-a-startup-concept';
import publishAnIdeaGuideId from './id/guide/publish-an-idea';
import startACommunityGuideId from './id/guide/start-an-origin';
import createAGroupGuideIt from './it/guide/create-a-group';
import createAProjectGuideIt from './it/guide/create-a-project';
import findACoFounderGuideIt from './it/guide/find-a-co-founder';
import first10MembersGuideIt from './it/guide/first-10-members';
import hybridCommunitiesGuideIt from './it/guide/hybrid-origins';
import keepACommunityActiveGuideIt from './it/guide/keep-an-origin-active';
import moderationGuideIt from './it/guide/moderation';
import organizeAMeetupGuideIt from './it/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideIt from './it/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideIt from './it/guide/publish-a-startup-concept';
import publishAnIdeaGuideIt from './it/guide/publish-an-idea';
import startACommunityGuideIt from './it/guide/start-an-origin';
import createAGroupGuideJa from './ja/guide/create-a-group';
import createAProjectGuideJa from './ja/guide/create-a-project';
import findACoFounderGuideJa from './ja/guide/find-a-co-founder';
import first10MembersGuideJa from './ja/guide/first-10-members';
import hybridCommunitiesGuideJa from './ja/guide/hybrid-origins';
import keepACommunityActiveGuideJa from './ja/guide/keep-an-origin-active';
import moderationGuideJa from './ja/guide/moderation';
import organizeAMeetupGuideJa from './ja/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideJa from './ja/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideJa from './ja/guide/publish-a-startup-concept';
import publishAnIdeaGuideJa from './ja/guide/publish-an-idea';
import startACommunityGuideJa from './ja/guide/start-an-origin';
import createAGroupGuideKo from './ko/guide/create-a-group';
import createAProjectGuideKo from './ko/guide/create-a-project';
import findACoFounderGuideKo from './ko/guide/find-a-co-founder';
import first10MembersGuideKo from './ko/guide/first-10-members';
import hybridCommunitiesGuideKo from './ko/guide/hybrid-origins';
import keepACommunityActiveGuideKo from './ko/guide/keep-an-origin-active';
import moderationGuideKo from './ko/guide/moderation';
import organizeAMeetupGuideKo from './ko/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideKo from './ko/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideKo from './ko/guide/publish-a-startup-concept';
import publishAnIdeaGuideKo from './ko/guide/publish-an-idea';
import startACommunityGuideKo from './ko/guide/start-an-origin';
import createAGroupGuideNl from './nl/guide/create-a-group';
import createAProjectGuideNl from './nl/guide/create-a-project';
import findACoFounderGuideNl from './nl/guide/find-a-co-founder';
import first10MembersGuideNl from './nl/guide/first-10-members';
import hybridCommunitiesGuideNl from './nl/guide/hybrid-origins';
import keepACommunityActiveGuideNl from './nl/guide/keep-an-origin-active';
import moderationGuideNl from './nl/guide/moderation';
import organizeAMeetupGuideNl from './nl/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideNl from './nl/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideNl from './nl/guide/publish-a-startup-concept';
import publishAnIdeaGuideNl from './nl/guide/publish-an-idea';
import startACommunityGuideNl from './nl/guide/start-an-origin';
import createAGroupGuidePl from './pl/guide/create-a-group';
import createAProjectGuidePl from './pl/guide/create-a-project';
import findACoFounderGuidePl from './pl/guide/find-a-co-founder';
import first10MembersGuidePl from './pl/guide/first-10-members';
import hybridCommunitiesGuidePl from './pl/guide/hybrid-origins';
import keepACommunityActiveGuidePl from './pl/guide/keep-an-origin-active';
import moderationGuidePl from './pl/guide/moderation';
import organizeAMeetupGuidePl from './pl/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuidePl from './pl/guide/publish-a-small-business-idea';
import publishAStartupConceptGuidePl from './pl/guide/publish-a-startup-concept';
import publishAnIdeaGuidePl from './pl/guide/publish-an-idea';
import startACommunityGuidePl from './pl/guide/start-an-origin';
import createAGroupGuidePtbr from './pt-BR/guide/create-a-group';
import createAProjectGuidePtbr from './pt-BR/guide/create-a-project';
import findACoFounderGuidePtbr from './pt-BR/guide/find-a-co-founder';
import first10MembersGuidePtbr from './pt-BR/guide/first-10-members';
import hybridCommunitiesGuidePtbr from './pt-BR/guide/hybrid-origins';
import keepACommunityActiveGuidePtbr from './pt-BR/guide/keep-an-origin-active';
import moderationGuidePtbr from './pt-BR/guide/moderation';
import organizeAMeetupGuidePtbr from './pt-BR/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuidePtbr from './pt-BR/guide/publish-a-small-business-idea';
import publishAStartupConceptGuidePtbr from './pt-BR/guide/publish-a-startup-concept';
import publishAnIdeaGuidePtbr from './pt-BR/guide/publish-an-idea';
import startACommunityGuidePtbr from './pt-BR/guide/start-an-origin';
import createAGroupGuideRu from './ru/guide/create-a-group';
import createAProjectGuideRu from './ru/guide/create-a-project';
import findACoFounderGuideRu from './ru/guide/find-a-co-founder';
import first10MembersGuideRu from './ru/guide/first-10-members';
import hybridCommunitiesGuideRu from './ru/guide/hybrid-origins';
import keepACommunityActiveGuideRu from './ru/guide/keep-an-origin-active';
import moderationGuideRu from './ru/guide/moderation';
import organizeAMeetupGuideRu from './ru/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideRu from './ru/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideRu from './ru/guide/publish-a-startup-concept';
import publishAnIdeaGuideRu from './ru/guide/publish-an-idea';
import startACommunityGuideRu from './ru/guide/start-an-origin';
import createAGroupGuideTh from './th/guide/create-a-group';
import createAProjectGuideTh from './th/guide/create-a-project';
import findACoFounderGuideTh from './th/guide/find-a-co-founder';
import first10MembersGuideTh from './th/guide/first-10-members';
import hybridCommunitiesGuideTh from './th/guide/hybrid-origins';
import keepACommunityActiveGuideTh from './th/guide/keep-an-origin-active';
import moderationGuideTh from './th/guide/moderation';
import organizeAMeetupGuideTh from './th/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideTh from './th/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideTh from './th/guide/publish-a-startup-concept';
import publishAnIdeaGuideTh from './th/guide/publish-an-idea';
import startACommunityGuideTh from './th/guide/start-an-origin';
import createAGroupGuideTr from './tr/guide/create-a-group';
import createAProjectGuideTr from './tr/guide/create-a-project';
import findACoFounderGuideTr from './tr/guide/find-a-co-founder';
import first10MembersGuideTr from './tr/guide/first-10-members';
import hybridCommunitiesGuideTr from './tr/guide/hybrid-origins';
import keepACommunityActiveGuideTr from './tr/guide/keep-an-origin-active';
import moderationGuideTr from './tr/guide/moderation';
import organizeAMeetupGuideTr from './tr/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideTr from './tr/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideTr from './tr/guide/publish-a-startup-concept';
import publishAnIdeaGuideTr from './tr/guide/publish-an-idea';
import startACommunityGuideTr from './tr/guide/start-an-origin';
import createAGroupGuideUk from './uk/guide/create-a-group';
import createAProjectGuideUk from './uk/guide/create-a-project';
import findACoFounderGuideUk from './uk/guide/find-a-co-founder';
import first10MembersGuideUk from './uk/guide/first-10-members';
import hybridCommunitiesGuideUk from './uk/guide/hybrid-origins';
import keepACommunityActiveGuideUk from './uk/guide/keep-an-origin-active';
import moderationGuideUk from './uk/guide/moderation';
import organizeAMeetupGuideUk from './uk/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideUk from './uk/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideUk from './uk/guide/publish-a-startup-concept';
import publishAnIdeaGuideUk from './uk/guide/publish-an-idea';
import startACommunityGuideUk from './uk/guide/start-an-origin';
import createAGroupGuideVi from './vi/guide/create-a-group';
import createAProjectGuideVi from './vi/guide/create-a-project';
import findACoFounderGuideVi from './vi/guide/find-a-co-founder';
import first10MembersGuideVi from './vi/guide/first-10-members';
import hybridCommunitiesGuideVi from './vi/guide/hybrid-origins';
import keepACommunityActiveGuideVi from './vi/guide/keep-an-origin-active';
import moderationGuideVi from './vi/guide/moderation';
import organizeAMeetupGuideVi from './vi/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideVi from './vi/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideVi from './vi/guide/publish-a-startup-concept';
import publishAnIdeaGuideVi from './vi/guide/publish-an-idea';
import startACommunityGuideVi from './vi/guide/start-an-origin';
import createAGroupGuideZhcn from './zh-CN/guide/create-a-group';
import createAProjectGuideZhcn from './zh-CN/guide/create-a-project';
import findACoFounderGuideZhcn from './zh-CN/guide/find-a-co-founder';
import first10MembersGuideZhcn from './zh-CN/guide/first-10-members';
import hybridCommunitiesGuideZhcn from './zh-CN/guide/hybrid-origins';
import keepACommunityActiveGuideZhcn from './zh-CN/guide/keep-an-origin-active';
import moderationGuideZhcn from './zh-CN/guide/moderation';
import organizeAMeetupGuideZhcn from './zh-CN/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideZhcn from './zh-CN/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideZhcn from './zh-CN/guide/publish-a-startup-concept';
import publishAnIdeaGuideZhcn from './zh-CN/guide/publish-an-idea';
import startACommunityGuideZhcn from './zh-CN/guide/start-an-origin';
import createAGroupGuideZhtw from './zh-TW/guide/create-a-group';
import createAProjectGuideZhtw from './zh-TW/guide/create-a-project';
import findACoFounderGuideZhtw from './zh-TW/guide/find-a-co-founder';
import first10MembersGuideZhtw from './zh-TW/guide/first-10-members';
import hybridCommunitiesGuideZhtw from './zh-TW/guide/hybrid-origins';
import keepACommunityActiveGuideZhtw from './zh-TW/guide/keep-an-origin-active';
import moderationGuideZhtw from './zh-TW/guide/moderation';
import organizeAMeetupGuideZhtw from './zh-TW/guide/organize-a-meetup';
import publishASmallBusinessIdeaGuideZhtw from './zh-TW/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideZhtw from './zh-TW/guide/publish-a-startup-concept';
import publishAnIdeaGuideZhtw from './zh-TW/guide/publish-an-idea';
import startACommunityGuideZhtw from './zh-TW/guide/start-an-origin';
import type {
  CityContent,
  ContentKind,
  CountryContent,
  GuideContent,
  LocationContent,
  RegionContent,
} from './types';

export type {
  CityContent,
  ContentKind,
  CountryContent,
  GuideContent,
  LocationContent,
  RegionContent,
};

/** One registered content file (declared fields must match the file path). */
interface ContentFileEntry {
  kind: ContentKind;
  slug: string;
  locale: Locale;
  content: LocationContent;
}

/* ------------------------------------------------------------------ *
 * Lookup indexes (TASK-520 — test-performance)
 *
 * `CONTENT_FILES` (~455 committed files) is static after module load, so
 * the linear `.find`/`.filter` scans in `getContent`/`hasContent`/
 * `listContentByKind`/`contentLocalesFor` are built once into Maps. The
 * `kind|slug|locale` key gives exact O(1) resolution (with the EN fallback
 * handled by the `kind|slug` index); `kind|locale` + `locale` indexes
 * serve `listContent`/`listContentByKind` without re-filtering. Entry
 * order is preserved by pushing into the per-key arrays in `CONTENT_FILES`
 * order, so every consumer sees the same order as before.
 * ------------------------------------------------------------------ */

type ContentIndexKey = `${ContentKind}|${string}|${Locale}`;

function contentIndexKey(kind: ContentKind, slug: string, locale: Locale): ContentIndexKey {
  return `${kind}|${slug}|${locale}`;
}

function slugIndexKey(kind: ContentKind, slug: string): string {
  return `${kind}|${slug}`;
}

function kindLocaleIndexKey(kind: ContentKind, locale: Locale): string {
  return `${kind}|${locale}`;
}

let contentIndex:
  | {
      byExactKey: Map<ContentIndexKey, ContentFileEntry>;
      bySlug: Map<string, ContentFileEntry[]>;
      byKindLocale: Map<string, ContentFileEntry[]>;
      byLocale: Map<Locale, LocationContent[]>;
    }
  | undefined;

function getContentIndex(): NonNullable<typeof contentIndex> {
  if (!contentIndex) {
    const byExactKey = new Map<ContentIndexKey, ContentFileEntry>();
    const bySlug = new Map<string, ContentFileEntry[]>();
    const byKindLocale = new Map<string, ContentFileEntry[]>();
    const byLocale = new Map<Locale, LocationContent[]>();

    for (const entry of CONTENT_FILES) {
      byExactKey.set(contentIndexKey(entry.kind, entry.slug, entry.locale), entry);

      const slugKey = slugIndexKey(entry.kind, entry.slug);
      const slugEntries = bySlug.get(slugKey);
      if (slugEntries) slugEntries.push(entry);
      else bySlug.set(slugKey, [entry]);

      const kindLocaleKey = kindLocaleIndexKey(entry.kind, entry.locale);
      const kindLocaleEntries = byKindLocale.get(kindLocaleKey);
      if (kindLocaleEntries) kindLocaleEntries.push(entry);
      else byKindLocale.set(kindLocaleKey, [entry]);

      const localeContents = byLocale.get(entry.locale);
      if (localeContents) localeContents.push(entry.content);
      else byLocale.set(entry.locale, [entry.content]);
    }

    // `listContent(locale)` hands out these arrays directly — freeze them so
    // a consumer can never mutate the shared cache (all current consumers
    // are non-mutating: .every / for..of / .length).
    for (const contents of byLocale.values()) {
      Object.freeze(contents);
    }

    contentIndex = { byExactKey, bySlug, byKindLocale, byLocale };
  }
  return contentIndex;
}

const CONTENT_FILES: readonly ContentFileEntry[] = [
  // EN source of truth — country pages.
  // country germany (EN source of truth).
  { kind: 'country', slug: 'germany', locale: 'en', content: germanyCountryEn },
  // country united-states (EN source of truth).
  { kind: 'country', slug: 'united-states', locale: 'en', content: unitedStatesCountryEn },

  // EN source of truth — region pages.
  // region berlin (EN source of truth).
  { kind: 'region', slug: 'berlin', locale: 'en', content: berlinRegionEn },
  // region new-york (EN source of truth).
  { kind: 'region', slug: 'new-york', locale: 'en', content: newYorkRegionEn },

  // Story G (TASK-507) — flagship country/region translations.
  // country germany (de translation).
  { kind: 'country', slug: 'germany', locale: 'de', content: germanyCountryDe },
  // region berlin (de translation).
  { kind: 'region', slug: 'berlin', locale: 'de', content: berlinRegionDe },
  // region bavaria (de translation).
  { kind: 'region', slug: 'bavaria', locale: 'de', content: bavariaRegionDe },

  // Story G (TASK-502..507) — EN country pages.
  // country argentina (EN source of truth).
  { kind: 'country', slug: 'argentina', locale: 'en', content: argentinaCountryEn },
  // country australia (EN source of truth).
  { kind: 'country', slug: 'australia', locale: 'en', content: australiaCountryEn },
  // country brazil (EN source of truth).
  { kind: 'country', slug: 'brazil', locale: 'en', content: brazilCountryEn },
  // country canada (EN source of truth).
  { kind: 'country', slug: 'canada', locale: 'en', content: canadaCountryEn },
  // country china (EN source of truth).
  { kind: 'country', slug: 'china', locale: 'en', content: chinaCountryEn },
  // country colombia (EN source of truth).
  { kind: 'country', slug: 'colombia', locale: 'en', content: colombiaCountryEn },
  // country denmark (EN source of truth).
  { kind: 'country', slug: 'denmark', locale: 'en', content: denmarkCountryEn },
  // country egypt (EN source of truth).
  { kind: 'country', slug: 'egypt', locale: 'en', content: egyptCountryEn },
  // country france (EN source of truth).
  { kind: 'country', slug: 'france', locale: 'en', content: franceCountryEn },
  // country hong-kong (EN source of truth).
  { kind: 'country', slug: 'hong-kong', locale: 'en', content: hongKongCountryEn },
  // country india (EN source of truth).
  { kind: 'country', slug: 'india', locale: 'en', content: indiaCountryEn },
  // country indonesia (EN source of truth).
  { kind: 'country', slug: 'indonesia', locale: 'en', content: indonesiaCountryEn },
  // country iran (EN source of truth).
  { kind: 'country', slug: 'iran', locale: 'en', content: iranCountryEn },
  // country ireland (EN source of truth).
  { kind: 'country', slug: 'ireland', locale: 'en', content: irelandCountryEn },
  // country italy (EN source of truth).
  { kind: 'country', slug: 'italy', locale: 'en', content: italyCountryEn },
  // country japan (EN source of truth).
  { kind: 'country', slug: 'japan', locale: 'en', content: japanCountryEn },
  // country kenya (EN source of truth).
  { kind: 'country', slug: 'kenya', locale: 'en', content: kenyaCountryEn },
  // country mexico (EN source of truth).
  { kind: 'country', slug: 'mexico', locale: 'en', content: mexicoCountryEn },
  // country morocco (EN source of truth).
  { kind: 'country', slug: 'morocco', locale: 'en', content: moroccoCountryEn },
  // country nigeria (EN source of truth).
  { kind: 'country', slug: 'nigeria', locale: 'en', content: nigeriaCountryEn },
  // country peru (EN source of truth).
  { kind: 'country', slug: 'peru', locale: 'en', content: peruCountryEn },
  // country poland (EN source of truth).
  { kind: 'country', slug: 'poland', locale: 'en', content: polandCountryEn },
  // country portugal (EN source of truth).
  { kind: 'country', slug: 'portugal', locale: 'en', content: portugalCountryEn },
  // country russia (EN source of truth).
  { kind: 'country', slug: 'russia', locale: 'en', content: russiaCountryEn },
  // country singapore (EN source of truth).
  { kind: 'country', slug: 'singapore', locale: 'en', content: singaporeCountryEn },
  // country south-africa (EN source of truth).
  { kind: 'country', slug: 'south-africa', locale: 'en', content: southAfricaCountryEn },
  // country south-korea (EN source of truth).
  { kind: 'country', slug: 'south-korea', locale: 'en', content: southKoreaCountryEn },
  // country spain (EN source of truth).
  { kind: 'country', slug: 'spain', locale: 'en', content: spainCountryEn },
  // country taiwan (EN source of truth).
  { kind: 'country', slug: 'taiwan', locale: 'en', content: taiwanCountryEn },
  // country thailand (EN source of truth).
  { kind: 'country', slug: 'thailand', locale: 'en', content: thailandCountryEn },
  // country the-netherlands (EN source of truth).
  { kind: 'country', slug: 'the-netherlands', locale: 'en', content: theNetherlandsCountryEn },
  // country turkey (EN source of truth).
  { kind: 'country', slug: 'turkey', locale: 'en', content: turkeyCountryEn },
  // country ukraine (EN source of truth).
  { kind: 'country', slug: 'ukraine', locale: 'en', content: ukraineCountryEn },
  // country united-arab-emirates (EN source of truth).
  {
    kind: 'country',
    slug: 'united-arab-emirates',
    locale: 'en',
    content: unitedArabEmiratesCountryEn,
  },
  // country united-kingdom (EN source of truth).
  { kind: 'country', slug: 'united-kingdom', locale: 'en', content: unitedKingdomCountryEn },
  // country vietnam (EN source of truth).
  { kind: 'country', slug: 'vietnam', locale: 'en', content: vietnamCountryEn },

  // Story G (TASK-502..507) — EN region pages.
  // region antioquia (EN source of truth).
  { kind: 'region', slug: 'antioquia', locale: 'en', content: antioquiaRegionEn },
  // region atlantico (EN source of truth).
  { kind: 'region', slug: 'atlantico', locale: 'en', content: atlanticoRegionEn },
  // region bangkok (EN source of truth).
  { kind: 'region', slug: 'bangkok', locale: 'en', content: bangkokRegionEn },
  // region bavaria (EN source of truth).
  { kind: 'region', slug: 'bavaria', locale: 'en', content: bavariaRegionEn },
  // region bogota-d-c (EN source of truth).
  { kind: 'region', slug: 'bogota-d-c', locale: 'en', content: bogotaDCRegionEn },
  // region british-columbia (EN source of truth).
  { kind: 'region', slug: 'british-columbia', locale: 'en', content: britishColumbiaRegionEn },
  // region buenos-aires-f-d (EN source of truth).
  { kind: 'region', slug: 'buenos-aires-f-d', locale: 'en', content: buenosAiresFDRegionEn },
  // region cairo (EN source of truth).
  { kind: 'region', slug: 'cairo', locale: 'en', content: cairoRegionEn },
  // region california (EN source of truth).
  { kind: 'region', slug: 'california', locale: 'en', content: californiaRegionEn },
  // region capital-region (EN source of truth).
  { kind: 'region', slug: 'capital-region', locale: 'en', content: capitalRegionRegionEn },
  // region casablanca-settat (EN source of truth).
  { kind: 'region', slug: 'casablanca-settat', locale: 'en', content: casablancaSettatRegionEn },
  // region catalonia (EN source of truth).
  { kind: 'region', slug: 'catalonia', locale: 'en', content: cataloniaRegionEn },
  // region central-and-western (EN source of truth).
  { kind: 'region', slug: 'central-and-western', locale: 'en', content: centralAndWesternRegionEn },
  // region delhi (EN source of truth).
  { kind: 'region', slug: 'delhi', locale: 'en', content: delhiRegionEn },
  // region dubai (EN source of truth).
  { kind: 'region', slug: 'dubai', locale: 'en', content: dubaiRegionEn },
  // region england (EN source of truth).
  { kind: 'region', slug: 'england', locale: 'en', content: englandRegionEn },
  // region gauteng (EN source of truth).
  { kind: 'region', slug: 'gauteng', locale: 'en', content: gautengRegionEn },
  // region ho-chi-minh-city-hcmc (EN source of truth).
  {
    kind: 'region',
    slug: 'ho-chi-minh-city-hcmc',
    locale: 'en',
    content: hoChiMinhCityHcmcRegionEn,
  },
  // region ile-de-france (EN source of truth).
  { kind: 'region', slug: 'ile-de-france', locale: 'en', content: ileDeFranceRegionEn },
  // region illinois (EN source of truth).
  { kind: 'region', slug: 'illinois', locale: 'en', content: illinoisRegionEn },
  // region istanbul (EN source of truth).
  { kind: 'region', slug: 'istanbul', locale: 'en', content: istanbulRegionEn },
  // region jakarta (EN source of truth).
  { kind: 'region', slug: 'jakarta', locale: 'en', content: jakartaRegionEn },
  // region karnataka (EN source of truth).
  { kind: 'region', slug: 'karnataka', locale: 'en', content: karnatakaRegionEn },
  // region kyiv-city (EN source of truth).
  { kind: 'region', slug: 'kyiv-city', locale: 'en', content: kyivCityRegionEn },
  // region lagos (EN source of truth).
  { kind: 'region', slug: 'lagos', locale: 'en', content: lagosRegionEn },
  // region leinster (EN source of truth).
  { kind: 'region', slug: 'leinster', locale: 'en', content: leinsterRegionEn },
  // region lima-province (EN source of truth).
  { kind: 'region', slug: 'lima-province', locale: 'en', content: limaProvinceRegionEn },
  // region lisbon (EN source of truth).
  { kind: 'region', slug: 'lisbon', locale: 'en', content: lisbonRegionEn },
  // region lombardy (EN source of truth).
  { kind: 'region', slug: 'lombardy', locale: 'en', content: lombardyRegionEn },
  // region madrid (EN source of truth).
  { kind: 'region', slug: 'madrid', locale: 'en', content: madridRegionEn },
  // region maharashtra (EN source of truth).
  { kind: 'region', slug: 'maharashtra', locale: 'en', content: maharashtraRegionEn },
  // region mazovia (EN source of truth).
  { kind: 'region', slug: 'mazovia', locale: 'en', content: mazoviaRegionEn },
  // region mexico-city (EN source of truth).
  { kind: 'region', slug: 'mexico-city', locale: 'en', content: mexicoCityRegionEn },
  // region moscow (EN source of truth).
  { kind: 'region', slug: 'moscow', locale: 'en', content: moscowRegionEn },
  // region nairobi-county (EN source of truth).
  { kind: 'region', slug: 'nairobi-county', locale: 'en', content: nairobiCountyRegionEn },
  // region new-south-wales (EN source of truth).
  { kind: 'region', slug: 'new-south-wales', locale: 'en', content: newSouthWalesRegionEn },
  // region north-holland (EN source of truth).
  { kind: 'region', slug: 'north-holland', locale: 'en', content: northHollandRegionEn },
  // region ontario (EN source of truth).
  { kind: 'region', slug: 'ontario', locale: 'en', content: ontarioRegionEn },
  // region osaka (EN source of truth).
  { kind: 'region', slug: 'osaka', locale: 'en', content: osakaRegionEn },
  // region quebec (EN source of truth).
  { kind: 'region', slug: 'quebec', locale: 'en', content: quebecRegionEn },
  // region rio-de-janeiro (EN source of truth).
  { kind: 'region', slug: 'rio-de-janeiro', locale: 'en', content: rioDeJaneiroRegionEn },
  // region sao-paulo (EN source of truth).
  { kind: 'region', slug: 'sao-paulo', locale: 'en', content: saoPauloRegionEn },
  // region seoul (EN source of truth).
  { kind: 'region', slug: 'seoul', locale: 'en', content: seoulRegionEn },
  // region shanghai (EN source of truth).
  { kind: 'region', slug: 'shanghai', locale: 'en', content: shanghaiRegionEn },
  // region singapore (EN source of truth).
  { kind: 'region', slug: 'singapore', locale: 'en', content: singaporeRegionEn },
  // region taiwan (EN source of truth).
  { kind: 'region', slug: 'taiwan', locale: 'en', content: taiwanRegionEn },
  // region tamil-nadu (EN source of truth).
  { kind: 'region', slug: 'tamil-nadu', locale: 'en', content: tamilNaduRegionEn },
  // region tehran (EN source of truth).
  { kind: 'region', slug: 'tehran', locale: 'en', content: tehranRegionEn },
  // region telangana (EN source of truth).
  { kind: 'region', slug: 'telangana', locale: 'en', content: telanganaRegionEn },
  // region texas (EN source of truth).
  { kind: 'region', slug: 'texas', locale: 'en', content: texasRegionEn },
  // region tokyo (EN source of truth).
  { kind: 'region', slug: 'tokyo', locale: 'en', content: tokyoRegionEn },
  // region western-cape (EN source of truth).
  { kind: 'region', slug: 'western-cape', locale: 'en', content: westernCapeRegionEn },

  // Story G (TASK-502..507) — predominant-locale country/region translations.
  // country egypt (ar translation).
  { kind: 'country', slug: 'egypt', locale: 'ar', content: egyptCountryAr },
  // country morocco (ar translation).
  { kind: 'country', slug: 'morocco', locale: 'ar', content: moroccoCountryAr },
  // country united-arab-emirates (ar translation).
  {
    kind: 'country',
    slug: 'united-arab-emirates',
    locale: 'ar',
    content: unitedArabEmiratesCountryAr,
  },
  // region cairo (ar translation).
  { kind: 'region', slug: 'cairo', locale: 'ar', content: cairoRegionAr },
  // region casablanca-settat (ar translation).
  { kind: 'region', slug: 'casablanca-settat', locale: 'ar', content: casablancaSettatRegionAr },
  // region dubai (ar translation).
  { kind: 'region', slug: 'dubai', locale: 'ar', content: dubaiRegionAr },
  // country argentina (es translation).
  { kind: 'country', slug: 'argentina', locale: 'es', content: argentinaCountryEs },
  // country colombia (es translation).
  { kind: 'country', slug: 'colombia', locale: 'es', content: colombiaCountryEs },
  // country mexico (es translation).
  { kind: 'country', slug: 'mexico', locale: 'es', content: mexicoCountryEs },
  // country peru (es translation).
  { kind: 'country', slug: 'peru', locale: 'es', content: peruCountryEs },
  // country spain (es translation).
  { kind: 'country', slug: 'spain', locale: 'es', content: spainCountryEs },
  // region antioquia (es translation).
  { kind: 'region', slug: 'antioquia', locale: 'es', content: antioquiaRegionEs },
  // region atlantico (es translation).
  { kind: 'region', slug: 'atlantico', locale: 'es', content: atlanticoRegionEs },
  // region bogota-d-c (es translation).
  { kind: 'region', slug: 'bogota-d-c', locale: 'es', content: bogotaDCRegionEs },
  // region buenos-aires-f-d (es translation).
  { kind: 'region', slug: 'buenos-aires-f-d', locale: 'es', content: buenosAiresFDRegionEs },
  // region catalonia (es translation).
  { kind: 'region', slug: 'catalonia', locale: 'es', content: cataloniaRegionEs },
  // region lima-province (es translation).
  { kind: 'region', slug: 'lima-province', locale: 'es', content: limaProvinceRegionEs },
  // region madrid (es translation).
  { kind: 'region', slug: 'madrid', locale: 'es', content: madridRegionEs },
  // region mexico-city (es translation).
  { kind: 'region', slug: 'mexico-city', locale: 'es', content: mexicoCityRegionEs },
  // country iran (fa translation).
  { kind: 'country', slug: 'iran', locale: 'fa', content: iranCountryFa },
  // region tehran (fa translation).
  { kind: 'region', slug: 'tehran', locale: 'fa', content: tehranRegionFa },
  // country france (fr translation).
  { kind: 'country', slug: 'france', locale: 'fr', content: franceCountryFr },
  // region ile-de-france (fr translation).
  { kind: 'region', slug: 'ile-de-france', locale: 'fr', content: ileDeFranceRegionFr },
  // country india (hi translation).
  { kind: 'country', slug: 'india', locale: 'hi', content: indiaCountryHi },
  // region delhi (hi translation).
  { kind: 'region', slug: 'delhi', locale: 'hi', content: delhiRegionHi },
  // region karnataka (hi translation).
  { kind: 'region', slug: 'karnataka', locale: 'hi', content: karnatakaRegionHi },
  // region maharashtra (hi translation).
  { kind: 'region', slug: 'maharashtra', locale: 'hi', content: maharashtraRegionHi },
  // region tamil-nadu (hi translation).
  { kind: 'region', slug: 'tamil-nadu', locale: 'hi', content: tamilNaduRegionHi },
  // region telangana (hi translation).
  { kind: 'region', slug: 'telangana', locale: 'hi', content: telanganaRegionHi },
  // country indonesia (id translation).
  { kind: 'country', slug: 'indonesia', locale: 'id', content: indonesiaCountryId },
  // region jakarta (id translation).
  { kind: 'region', slug: 'jakarta', locale: 'id', content: jakartaRegionId },
  // country italy (it translation).
  { kind: 'country', slug: 'italy', locale: 'it', content: italyCountryIt },
  // region lombardy (it translation).
  { kind: 'region', slug: 'lombardy', locale: 'it', content: lombardyRegionIt },
  // country japan (ja translation).
  { kind: 'country', slug: 'japan', locale: 'ja', content: japanCountryJa },
  // region osaka (ja translation).
  { kind: 'region', slug: 'osaka', locale: 'ja', content: osakaRegionJa },
  // region tokyo (ja translation).
  { kind: 'region', slug: 'tokyo', locale: 'ja', content: tokyoRegionJa },
  // country south-korea (ko translation).
  { kind: 'country', slug: 'south-korea', locale: 'ko', content: southKoreaCountryKo },
  // region seoul (ko translation).
  { kind: 'region', slug: 'seoul', locale: 'ko', content: seoulRegionKo },
  // country the-netherlands (nl translation).
  { kind: 'country', slug: 'the-netherlands', locale: 'nl', content: theNetherlandsCountryNl },
  // region north-holland (nl translation).
  { kind: 'region', slug: 'north-holland', locale: 'nl', content: northHollandRegionNl },
  // country poland (pl translation).
  { kind: 'country', slug: 'poland', locale: 'pl', content: polandCountryPl },
  // region mazovia (pl translation).
  { kind: 'region', slug: 'mazovia', locale: 'pl', content: mazoviaRegionPl },
  // country brazil (pt-BR translation).
  { kind: 'country', slug: 'brazil', locale: 'pt-BR', content: brazilCountryPtbr },
  // country portugal (pt-BR translation).
  { kind: 'country', slug: 'portugal', locale: 'pt-BR', content: portugalCountryPtbr },
  // region lisbon (pt-BR translation).
  { kind: 'region', slug: 'lisbon', locale: 'pt-BR', content: lisbonRegionPtbr },
  // region rio-de-janeiro (pt-BR translation).
  { kind: 'region', slug: 'rio-de-janeiro', locale: 'pt-BR', content: rioDeJaneiroRegionPtbr },
  // region sao-paulo (pt-BR translation).
  { kind: 'region', slug: 'sao-paulo', locale: 'pt-BR', content: saoPauloRegionPtbr },
  // country russia (ru translation).
  { kind: 'country', slug: 'russia', locale: 'ru', content: russiaCountryRu },
  // region moscow (ru translation).
  { kind: 'region', slug: 'moscow', locale: 'ru', content: moscowRegionRu },
  // country thailand (th translation).
  { kind: 'country', slug: 'thailand', locale: 'th', content: thailandCountryTh },
  // region bangkok (th translation).
  { kind: 'region', slug: 'bangkok', locale: 'th', content: bangkokRegionTh },
  // country turkey (tr translation).
  { kind: 'country', slug: 'turkey', locale: 'tr', content: turkeyCountryTr },
  // region istanbul (tr translation).
  { kind: 'region', slug: 'istanbul', locale: 'tr', content: istanbulRegionTr },
  // country ukraine (uk translation).
  { kind: 'country', slug: 'ukraine', locale: 'uk', content: ukraineCountryUk },
  // region kyiv-city (uk translation).
  { kind: 'region', slug: 'kyiv-city', locale: 'uk', content: kyivCityRegionUk },
  // country vietnam (vi translation).
  { kind: 'country', slug: 'vietnam', locale: 'vi', content: vietnamCountryVi },
  // region ho-chi-minh-city-hcmc (vi translation).
  {
    kind: 'region',
    slug: 'ho-chi-minh-city-hcmc',
    locale: 'vi',
    content: hoChiMinhCityHcmcRegionVi,
  },
  // country china (zh-CN translation).
  { kind: 'country', slug: 'china', locale: 'zh-CN', content: chinaCountryZhcn },
  // region shanghai (zh-CN translation).
  { kind: 'region', slug: 'shanghai', locale: 'zh-CN', content: shanghaiRegionZhcn },
  // country hong-kong (zh-TW translation).
  { kind: 'country', slug: 'hong-kong', locale: 'zh-TW', content: hongKongCountryZhtw },
  // country taiwan (zh-TW translation).
  { kind: 'country', slug: 'taiwan', locale: 'zh-TW', content: taiwanCountryZhtw },
  // region central-and-western (zh-TW translation).
  {
    kind: 'region',
    slug: 'central-and-western',
    locale: 'zh-TW',
    content: centralAndWesternRegionZhtw,
  },
  // region taiwan (zh-TW translation).
  { kind: 'region', slug: 'taiwan', locale: 'zh-TW', content: taiwanRegionZhtw },

  // EN source of truth — flagship city pages (city + variants + ideas).
  // city amsterdam (EN source of truth).
  { kind: 'city', slug: 'amsterdam', locale: 'en', content: amsterdamCityEn },
  // city austin (EN source of truth).
  { kind: 'city', slug: 'austin', locale: 'en', content: austinCityEn },
  // city bangkok (EN source of truth).
  { kind: 'city', slug: 'bangkok', locale: 'en', content: bangkokCityEn },
  // city barcelona (EN source of truth).
  { kind: 'city', slug: 'barcelona', locale: 'en', content: barcelonaCityEn },
  // city barranquilla (EN source of truth).
  { kind: 'city', slug: 'barranquilla', locale: 'en', content: barranquillaCityEn },
  // city bengaluru (EN source of truth).
  { kind: 'city', slug: 'bengaluru', locale: 'en', content: bengaluruCityEn },
  // city berlin (EN source of truth).
  { kind: 'city', slug: 'berlin', locale: 'en', content: berlinCityEn },
  // city bogota (EN source of truth).
  { kind: 'city', slug: 'bogota', locale: 'en', content: bogotaCityEn },
  // city buenos-aires (EN source of truth).
  { kind: 'city', slug: 'buenos-aires', locale: 'en', content: buenosAiresCityEn },
  // city cairo (EN source of truth).
  { kind: 'city', slug: 'cairo', locale: 'en', content: cairoCityEn },
  // city cape-town (EN source of truth).
  { kind: 'city', slug: 'cape-town', locale: 'en', content: capeTownCityEn },
  // city casablanca (EN source of truth).
  { kind: 'city', slug: 'casablanca', locale: 'en', content: casablancaCityEn },
  // city chennai (EN source of truth).
  { kind: 'city', slug: 'chennai', locale: 'en', content: chennaiCityEn },
  // city chicago (EN source of truth).
  { kind: 'city', slug: 'chicago', locale: 'en', content: chicagoCityEn },
  // city copenhagen (EN source of truth).
  { kind: 'city', slug: 'copenhagen', locale: 'en', content: copenhagenCityEn },
  // city delhi (EN source of truth).
  { kind: 'city', slug: 'delhi', locale: 'en', content: delhiCityEn },
  // city dubai (EN source of truth).
  { kind: 'city', slug: 'dubai', locale: 'en', content: dubaiCityEn },
  // city dublin (EN source of truth).
  { kind: 'city', slug: 'dublin', locale: 'en', content: dublinCityEn },
  // city ho-chi-minh-city (EN source of truth).
  { kind: 'city', slug: 'ho-chi-minh-city', locale: 'en', content: hoChiMinhCityCityEn },
  // city hong-kong (EN source of truth).
  { kind: 'city', slug: 'hong-kong', locale: 'en', content: hongKongCityEn },
  // city hyderabad (EN source of truth).
  { kind: 'city', slug: 'hyderabad', locale: 'en', content: hyderabadCityEn },
  // city istanbul (EN source of truth).
  { kind: 'city', slug: 'istanbul', locale: 'en', content: istanbulCityEn },
  // city jakarta (EN source of truth).
  { kind: 'city', slug: 'jakarta', locale: 'en', content: jakartaCityEn },
  // city johannesburg (EN source of truth).
  { kind: 'city', slug: 'johannesburg', locale: 'en', content: johannesburgCityEn },
  // city kyiv (EN source of truth).
  { kind: 'city', slug: 'kyiv', locale: 'en', content: kyivCityEn },
  // city lagos (EN source of truth).
  { kind: 'city', slug: 'lagos', locale: 'en', content: lagosCityEn },
  // city lima (EN source of truth).
  { kind: 'city', slug: 'lima', locale: 'en', content: limaCityEn },
  // city lisbon (EN source of truth).
  { kind: 'city', slug: 'lisbon', locale: 'en', content: lisbonCityEn },
  // city london (EN source of truth).
  { kind: 'city', slug: 'london', locale: 'en', content: londonCityEn },
  // city los-angeles (EN source of truth).
  { kind: 'city', slug: 'los-angeles', locale: 'en', content: losAngelesCityEn },
  // city madrid (EN source of truth).
  { kind: 'city', slug: 'madrid', locale: 'en', content: madridCityEn },
  // city medellin (EN source of truth).
  { kind: 'city', slug: 'medellin', locale: 'en', content: medellinCityEn },
  // city mexico-city (EN source of truth).
  { kind: 'city', slug: 'mexico-city', locale: 'en', content: mexicoCityCityEn },
  // city milan (EN source of truth).
  { kind: 'city', slug: 'milan', locale: 'en', content: milanCityEn },
  // city montreal (EN source of truth).
  { kind: 'city', slug: 'montreal', locale: 'en', content: montrealCityEn },
  // city moscow (EN source of truth).
  { kind: 'city', slug: 'moscow', locale: 'en', content: moscowCityEn },
  // city mumbai (EN source of truth).
  { kind: 'city', slug: 'mumbai', locale: 'en', content: mumbaiCityEn },
  // city munich (EN source of truth).
  { kind: 'city', slug: 'munich', locale: 'en', content: munichCityEn },
  // city nairobi (EN source of truth).
  { kind: 'city', slug: 'nairobi', locale: 'en', content: nairobiCityEn },
  // city new-york (EN source of truth).
  { kind: 'city', slug: 'new-york', locale: 'en', content: newYorkCityEn },
  // city osaka (EN source of truth).
  { kind: 'city', slug: 'osaka', locale: 'en', content: osakaCityEn },
  // city paris (EN source of truth).
  { kind: 'city', slug: 'paris', locale: 'en', content: parisCityEn },
  // city pune (EN source of truth).
  { kind: 'city', slug: 'pune', locale: 'en', content: puneCityEn },
  // city rio-de-janeiro (EN source of truth).
  { kind: 'city', slug: 'rio-de-janeiro', locale: 'en', content: rioDeJaneiroCityEn },
  // city san-francisco (EN source of truth).
  { kind: 'city', slug: 'san-francisco', locale: 'en', content: sanFranciscoCityEn },
  // city sao-paulo (EN source of truth).
  { kind: 'city', slug: 'sao-paulo', locale: 'en', content: saoPauloCityEn },
  // city seoul (EN source of truth).
  { kind: 'city', slug: 'seoul', locale: 'en', content: seoulCityEn },
  // city shanghai (EN source of truth).
  { kind: 'city', slug: 'shanghai', locale: 'en', content: shanghaiCityEn },
  // city singapore (EN source of truth).
  { kind: 'city', slug: 'singapore', locale: 'en', content: singaporeCityEn },
  // city sydney (EN source of truth).
  { kind: 'city', slug: 'sydney', locale: 'en', content: sydneyCityEn },
  // city taipei (EN source of truth).
  { kind: 'city', slug: 'taipei', locale: 'en', content: taipeiCityEn },
  // city tehran (EN source of truth).
  { kind: 'city', slug: 'tehran', locale: 'en', content: tehranCityEn },
  // city tokyo (EN source of truth).
  { kind: 'city', slug: 'tokyo', locale: 'en', content: tokyoCityEn },
  // city toronto (EN source of truth).
  { kind: 'city', slug: 'toronto', locale: 'en', content: torontoCityEn },
  // city vancouver (EN source of truth).
  { kind: 'city', slug: 'vancouver', locale: 'en', content: vancouverCityEn },
  // city warsaw (EN source of truth).
  { kind: 'city', slug: 'warsaw', locale: 'en', content: warsawCityEn },

  // Per-locale city translations (predominant-locale cities, Sprint 18).
  // city cairo (ar translation).
  { kind: 'city', slug: 'cairo', locale: 'ar', content: cairoCityAr },
  // city casablanca (ar translation).
  { kind: 'city', slug: 'casablanca', locale: 'ar', content: casablancaCityAr },
  // city dubai (ar translation).
  { kind: 'city', slug: 'dubai', locale: 'ar', content: dubaiCityAr },
  // city berlin (de translation).
  { kind: 'city', slug: 'berlin', locale: 'de', content: berlinCityDe },
  // city munich (de translation).
  { kind: 'city', slug: 'munich', locale: 'de', content: munichCityDe },
  // city barcelona (es translation).
  { kind: 'city', slug: 'barcelona', locale: 'es', content: barcelonaCityEs },
  // city barranquilla (es translation).
  { kind: 'city', slug: 'barranquilla', locale: 'es', content: barranquillaCityEs },
  // city bogota (es translation).
  { kind: 'city', slug: 'bogota', locale: 'es', content: bogotaCityEs },
  // city buenos-aires (es translation).
  { kind: 'city', slug: 'buenos-aires', locale: 'es', content: buenosAiresCityEs },
  // city lima (es translation).
  { kind: 'city', slug: 'lima', locale: 'es', content: limaCityEs },
  // city madrid (es translation).
  { kind: 'city', slug: 'madrid', locale: 'es', content: madridCityEs },
  // city medellin (es translation).
  { kind: 'city', slug: 'medellin', locale: 'es', content: medellinCityEs },
  // city mexico-city (es translation).
  { kind: 'city', slug: 'mexico-city', locale: 'es', content: mexicoCityCityEs },
  // city tehran (fa translation).
  { kind: 'city', slug: 'tehran', locale: 'fa', content: tehranCityFa },
  // city montreal (fr translation).
  { kind: 'city', slug: 'montreal', locale: 'fr', content: montrealCityFr },
  // city paris (fr translation).
  { kind: 'city', slug: 'paris', locale: 'fr', content: parisCityFr },
  // city bengaluru (hi translation).
  { kind: 'city', slug: 'bengaluru', locale: 'hi', content: bengaluruCityHi },
  // city chennai (hi translation).
  { kind: 'city', slug: 'chennai', locale: 'hi', content: chennaiCityHi },
  // city delhi (hi translation).
  { kind: 'city', slug: 'delhi', locale: 'hi', content: delhiCityHi },
  // city hyderabad (hi translation).
  { kind: 'city', slug: 'hyderabad', locale: 'hi', content: hyderabadCityHi },
  // city mumbai (hi translation).
  { kind: 'city', slug: 'mumbai', locale: 'hi', content: mumbaiCityHi },
  // city pune (hi translation).
  { kind: 'city', slug: 'pune', locale: 'hi', content: puneCityHi },
  // city jakarta (id translation).
  { kind: 'city', slug: 'jakarta', locale: 'id', content: jakartaCityId },
  // city milan (it translation).
  { kind: 'city', slug: 'milan', locale: 'it', content: milanCityIt },
  // city osaka (ja translation).
  { kind: 'city', slug: 'osaka', locale: 'ja', content: osakaCityJa },
  // city tokyo (ja translation).
  { kind: 'city', slug: 'tokyo', locale: 'ja', content: tokyoCityJa },
  // city seoul (ko translation).
  { kind: 'city', slug: 'seoul', locale: 'ko', content: seoulCityKo },
  // city amsterdam (nl translation).
  { kind: 'city', slug: 'amsterdam', locale: 'nl', content: amsterdamCityNl },
  // city warsaw (pl translation).
  { kind: 'city', slug: 'warsaw', locale: 'pl', content: warsawCityPl },
  // city lisbon (pt-BR translation).
  { kind: 'city', slug: 'lisbon', locale: 'pt-BR', content: lisbonCityPtbr },
  // city rio-de-janeiro (pt-BR translation).
  { kind: 'city', slug: 'rio-de-janeiro', locale: 'pt-BR', content: rioDeJaneiroCityPtbr },
  // city sao-paulo (pt-BR translation).
  { kind: 'city', slug: 'sao-paulo', locale: 'pt-BR', content: saoPauloCityPtbr },
  // city moscow (ru translation).
  { kind: 'city', slug: 'moscow', locale: 'ru', content: moscowCityRu },
  // city bangkok (th translation).
  { kind: 'city', slug: 'bangkok', locale: 'th', content: bangkokCityTh },
  // city istanbul (tr translation).
  { kind: 'city', slug: 'istanbul', locale: 'tr', content: istanbulCityTr },
  // city kyiv (uk translation).
  { kind: 'city', slug: 'kyiv', locale: 'uk', content: kyivCityUk },
  // city ho-chi-minh-city (vi translation).
  { kind: 'city', slug: 'ho-chi-minh-city', locale: 'vi', content: hoChiMinhCityCityVi },
  // city shanghai (zh-CN translation).
  { kind: 'city', slug: 'shanghai', locale: 'zh-CN', content: shanghaiCityZhcn },
  // city hong-kong (zh-TW translation).
  { kind: 'city', slug: 'hong-kong', locale: 'zh-TW', content: hongKongCityZhtw },
  // city taipei (zh-TW translation).
  { kind: 'city', slug: 'taipei', locale: 'zh-TW', content: taipeiCityZhtw },

  // L1 how-to guides (TASK-309/TASK-353) — manual content, EN source of truth.
  // guide create-a-group (EN source of truth).
  { kind: 'guide', slug: 'create-a-group', locale: 'en', content: createAGroupGuideEn },
  // guide create-a-project (EN source of truth).
  { kind: 'guide', slug: 'create-a-project', locale: 'en', content: createAProjectGuideEn },
  // guide find-a-co-founder (EN source of truth).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'en', content: findACoFounderGuideEn },
  // guide first-10-members (EN source of truth).
  { kind: 'guide', slug: 'first-10-members', locale: 'en', content: first10MembersGuideEn },
  // guide hybrid-origins (EN source of truth).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'en', content: hybridCommunitiesGuideEn },
  // guide keep-an-origin-active (EN source of truth).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'en',
    content: keepACommunityActiveGuideEn,
  },
  // guide moderation (EN source of truth).
  { kind: 'guide', slug: 'moderation', locale: 'en', content: moderationGuideEn },
  // guide organize-a-meetup (EN source of truth).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'en', content: organizeAMeetupGuideEn },
  // guide publish-a-small-business-idea (EN source of truth).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'en',
    content: publishASmallBusinessIdeaGuideEn,
  },
  // guide publish-a-startup-concept (EN source of truth).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'en',
    content: publishAStartupConceptGuideEn,
  },
  // guide publish-an-idea (EN source of truth).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'en', content: publishAnIdeaGuideEn },
  // guide start-an-origin (EN source of truth).
  { kind: 'guide', slug: 'start-an-origin', locale: 'en', content: startACommunityGuideEn },

  // 12×20 guide translations (Sprint 18, TASK-442) — every non-EN locale translates all 12 guides.
  // guide create-a-group (ar translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'ar', content: createAGroupGuideAr },
  // guide create-a-project (ar translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'ar', content: createAProjectGuideAr },
  // guide find-a-co-founder (ar translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'ar', content: findACoFounderGuideAr },
  // guide first-10-members (ar translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'ar', content: first10MembersGuideAr },
  // guide hybrid-origins (ar translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'ar', content: hybridCommunitiesGuideAr },
  // guide keep-an-origin-active (ar translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'ar',
    content: keepACommunityActiveGuideAr,
  },
  // guide moderation (ar translation).
  { kind: 'guide', slug: 'moderation', locale: 'ar', content: moderationGuideAr },
  // guide organize-a-meetup (ar translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'ar', content: organizeAMeetupGuideAr },
  // guide publish-a-small-business-idea (ar translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'ar',
    content: publishASmallBusinessIdeaGuideAr,
  },
  // guide publish-a-startup-concept (ar translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'ar',
    content: publishAStartupConceptGuideAr,
  },
  // guide publish-an-idea (ar translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'ar', content: publishAnIdeaGuideAr },
  // guide start-an-origin (ar translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'ar', content: startACommunityGuideAr },
  // guide create-a-group (de translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'de', content: createAGroupGuideDe },
  // guide create-a-project (de translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'de', content: createAProjectGuideDe },
  // guide find-a-co-founder (de translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'de', content: findACoFounderGuideDe },
  // guide first-10-members (de translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'de', content: first10MembersGuideDe },
  // guide hybrid-origins (de translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'de', content: hybridCommunitiesGuideDe },
  // guide keep-an-origin-active (de translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'de',
    content: keepACommunityActiveGuideDe,
  },
  // guide moderation (de translation).
  { kind: 'guide', slug: 'moderation', locale: 'de', content: moderationGuideDe },
  // guide organize-a-meetup (de translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'de', content: organizeAMeetupGuideDe },
  // guide publish-a-small-business-idea (de translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'de',
    content: publishASmallBusinessIdeaGuideDe,
  },
  // guide publish-a-startup-concept (de translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'de',
    content: publishAStartupConceptGuideDe,
  },
  // guide publish-an-idea (de translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'de', content: publishAnIdeaGuideDe },
  // guide start-an-origin (de translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'de', content: startACommunityGuideDe },
  // guide create-a-group (es translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'es', content: createAGroupGuideEs },
  // guide create-a-project (es translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'es', content: createAProjectGuideEs },
  // guide find-a-co-founder (es translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'es', content: findACoFounderGuideEs },
  // guide first-10-members (es translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'es', content: first10MembersGuideEs },
  // guide hybrid-origins (es translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'es', content: hybridCommunitiesGuideEs },
  // guide keep-an-origin-active (es translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'es',
    content: keepACommunityActiveGuideEs,
  },
  // guide moderation (es translation).
  { kind: 'guide', slug: 'moderation', locale: 'es', content: moderationGuideEs },
  // guide organize-a-meetup (es translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'es', content: organizeAMeetupGuideEs },
  // guide publish-a-small-business-idea (es translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'es',
    content: publishASmallBusinessIdeaGuideEs,
  },
  // guide publish-a-startup-concept (es translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'es',
    content: publishAStartupConceptGuideEs,
  },
  // guide publish-an-idea (es translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'es', content: publishAnIdeaGuideEs },
  // guide start-an-origin (es translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'es', content: startACommunityGuideEs },
  // guide create-a-group (fa translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'fa', content: createAGroupGuideFa },
  // guide create-a-project (fa translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'fa', content: createAProjectGuideFa },
  // guide find-a-co-founder (fa translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'fa', content: findACoFounderGuideFa },
  // guide first-10-members (fa translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'fa', content: first10MembersGuideFa },
  // guide hybrid-origins (fa translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'fa', content: hybridCommunitiesGuideFa },
  // guide keep-an-origin-active (fa translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'fa',
    content: keepACommunityActiveGuideFa,
  },
  // guide moderation (fa translation).
  { kind: 'guide', slug: 'moderation', locale: 'fa', content: moderationGuideFa },
  // guide organize-a-meetup (fa translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'fa', content: organizeAMeetupGuideFa },
  // guide publish-a-small-business-idea (fa translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'fa',
    content: publishASmallBusinessIdeaGuideFa,
  },
  // guide publish-a-startup-concept (fa translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'fa',
    content: publishAStartupConceptGuideFa,
  },
  // guide publish-an-idea (fa translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'fa', content: publishAnIdeaGuideFa },
  // guide start-an-origin (fa translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'fa', content: startACommunityGuideFa },
  // guide create-a-group (fr translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'fr', content: createAGroupGuideFr },
  // guide create-a-project (fr translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'fr', content: createAProjectGuideFr },
  // guide find-a-co-founder (fr translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'fr', content: findACoFounderGuideFr },
  // guide first-10-members (fr translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'fr', content: first10MembersGuideFr },
  // guide hybrid-origins (fr translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'fr', content: hybridCommunitiesGuideFr },
  // guide keep-an-origin-active (fr translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'fr',
    content: keepACommunityActiveGuideFr,
  },
  // guide moderation (fr translation).
  { kind: 'guide', slug: 'moderation', locale: 'fr', content: moderationGuideFr },
  // guide organize-a-meetup (fr translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'fr', content: organizeAMeetupGuideFr },
  // guide publish-a-small-business-idea (fr translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'fr',
    content: publishASmallBusinessIdeaGuideFr,
  },
  // guide publish-a-startup-concept (fr translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'fr',
    content: publishAStartupConceptGuideFr,
  },
  // guide publish-an-idea (fr translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'fr', content: publishAnIdeaGuideFr },
  // guide start-an-origin (fr translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'fr', content: startACommunityGuideFr },
  // guide create-a-group (hi translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'hi', content: createAGroupGuideHi },
  // guide create-a-project (hi translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'hi', content: createAProjectGuideHi },
  // guide find-a-co-founder (hi translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'hi', content: findACoFounderGuideHi },
  // guide first-10-members (hi translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'hi', content: first10MembersGuideHi },
  // guide hybrid-origins (hi translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'hi', content: hybridCommunitiesGuideHi },
  // guide keep-an-origin-active (hi translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'hi',
    content: keepACommunityActiveGuideHi,
  },
  // guide moderation (hi translation).
  { kind: 'guide', slug: 'moderation', locale: 'hi', content: moderationGuideHi },
  // guide organize-a-meetup (hi translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'hi', content: organizeAMeetupGuideHi },
  // guide publish-a-small-business-idea (hi translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'hi',
    content: publishASmallBusinessIdeaGuideHi,
  },
  // guide publish-a-startup-concept (hi translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'hi',
    content: publishAStartupConceptGuideHi,
  },
  // guide publish-an-idea (hi translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'hi', content: publishAnIdeaGuideHi },
  // guide start-an-origin (hi translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'hi', content: startACommunityGuideHi },
  // guide create-a-group (id translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'id', content: createAGroupGuideId },
  // guide create-a-project (id translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'id', content: createAProjectGuideId },
  // guide find-a-co-founder (id translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'id', content: findACoFounderGuideId },
  // guide first-10-members (id translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'id', content: first10MembersGuideId },
  // guide hybrid-origins (id translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'id', content: hybridCommunitiesGuideId },
  // guide keep-an-origin-active (id translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'id',
    content: keepACommunityActiveGuideId,
  },
  // guide moderation (id translation).
  { kind: 'guide', slug: 'moderation', locale: 'id', content: moderationGuideId },
  // guide organize-a-meetup (id translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'id', content: organizeAMeetupGuideId },
  // guide publish-a-small-business-idea (id translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'id',
    content: publishASmallBusinessIdeaGuideId,
  },
  // guide publish-a-startup-concept (id translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'id',
    content: publishAStartupConceptGuideId,
  },
  // guide publish-an-idea (id translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'id', content: publishAnIdeaGuideId },
  // guide start-an-origin (id translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'id', content: startACommunityGuideId },
  // guide create-a-group (it translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'it', content: createAGroupGuideIt },
  // guide create-a-project (it translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'it', content: createAProjectGuideIt },
  // guide find-a-co-founder (it translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'it', content: findACoFounderGuideIt },
  // guide first-10-members (it translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'it', content: first10MembersGuideIt },
  // guide hybrid-origins (it translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'it', content: hybridCommunitiesGuideIt },
  // guide keep-an-origin-active (it translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'it',
    content: keepACommunityActiveGuideIt,
  },
  // guide moderation (it translation).
  { kind: 'guide', slug: 'moderation', locale: 'it', content: moderationGuideIt },
  // guide organize-a-meetup (it translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'it', content: organizeAMeetupGuideIt },
  // guide publish-a-small-business-idea (it translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'it',
    content: publishASmallBusinessIdeaGuideIt,
  },
  // guide publish-a-startup-concept (it translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'it',
    content: publishAStartupConceptGuideIt,
  },
  // guide publish-an-idea (it translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'it', content: publishAnIdeaGuideIt },
  // guide start-an-origin (it translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'it', content: startACommunityGuideIt },
  // guide create-a-group (ja translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'ja', content: createAGroupGuideJa },
  // guide create-a-project (ja translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'ja', content: createAProjectGuideJa },
  // guide find-a-co-founder (ja translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'ja', content: findACoFounderGuideJa },
  // guide first-10-members (ja translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'ja', content: first10MembersGuideJa },
  // guide hybrid-origins (ja translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'ja', content: hybridCommunitiesGuideJa },
  // guide keep-an-origin-active (ja translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'ja',
    content: keepACommunityActiveGuideJa,
  },
  // guide moderation (ja translation).
  { kind: 'guide', slug: 'moderation', locale: 'ja', content: moderationGuideJa },
  // guide organize-a-meetup (ja translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'ja', content: organizeAMeetupGuideJa },
  // guide publish-a-small-business-idea (ja translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'ja',
    content: publishASmallBusinessIdeaGuideJa,
  },
  // guide publish-a-startup-concept (ja translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'ja',
    content: publishAStartupConceptGuideJa,
  },
  // guide publish-an-idea (ja translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'ja', content: publishAnIdeaGuideJa },
  // guide start-an-origin (ja translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'ja', content: startACommunityGuideJa },
  // guide create-a-group (ko translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'ko', content: createAGroupGuideKo },
  // guide create-a-project (ko translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'ko', content: createAProjectGuideKo },
  // guide find-a-co-founder (ko translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'ko', content: findACoFounderGuideKo },
  // guide first-10-members (ko translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'ko', content: first10MembersGuideKo },
  // guide hybrid-origins (ko translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'ko', content: hybridCommunitiesGuideKo },
  // guide keep-an-origin-active (ko translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'ko',
    content: keepACommunityActiveGuideKo,
  },
  // guide moderation (ko translation).
  { kind: 'guide', slug: 'moderation', locale: 'ko', content: moderationGuideKo },
  // guide organize-a-meetup (ko translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'ko', content: organizeAMeetupGuideKo },
  // guide publish-a-small-business-idea (ko translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'ko',
    content: publishASmallBusinessIdeaGuideKo,
  },
  // guide publish-a-startup-concept (ko translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'ko',
    content: publishAStartupConceptGuideKo,
  },
  // guide publish-an-idea (ko translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'ko', content: publishAnIdeaGuideKo },
  // guide start-an-origin (ko translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'ko', content: startACommunityGuideKo },
  // guide create-a-group (nl translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'nl', content: createAGroupGuideNl },
  // guide create-a-project (nl translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'nl', content: createAProjectGuideNl },
  // guide find-a-co-founder (nl translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'nl', content: findACoFounderGuideNl },
  // guide first-10-members (nl translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'nl', content: first10MembersGuideNl },
  // guide hybrid-origins (nl translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'nl', content: hybridCommunitiesGuideNl },
  // guide keep-an-origin-active (nl translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'nl',
    content: keepACommunityActiveGuideNl,
  },
  // guide moderation (nl translation).
  { kind: 'guide', slug: 'moderation', locale: 'nl', content: moderationGuideNl },
  // guide organize-a-meetup (nl translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'nl', content: organizeAMeetupGuideNl },
  // guide publish-a-small-business-idea (nl translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'nl',
    content: publishASmallBusinessIdeaGuideNl,
  },
  // guide publish-a-startup-concept (nl translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'nl',
    content: publishAStartupConceptGuideNl,
  },
  // guide publish-an-idea (nl translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'nl', content: publishAnIdeaGuideNl },
  // guide start-an-origin (nl translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'nl', content: startACommunityGuideNl },
  // guide create-a-group (pl translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'pl', content: createAGroupGuidePl },
  // guide create-a-project (pl translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'pl', content: createAProjectGuidePl },
  // guide find-a-co-founder (pl translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'pl', content: findACoFounderGuidePl },
  // guide first-10-members (pl translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'pl', content: first10MembersGuidePl },
  // guide hybrid-origins (pl translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'pl', content: hybridCommunitiesGuidePl },
  // guide keep-an-origin-active (pl translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'pl',
    content: keepACommunityActiveGuidePl,
  },
  // guide moderation (pl translation).
  { kind: 'guide', slug: 'moderation', locale: 'pl', content: moderationGuidePl },
  // guide organize-a-meetup (pl translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'pl', content: organizeAMeetupGuidePl },
  // guide publish-a-small-business-idea (pl translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'pl',
    content: publishASmallBusinessIdeaGuidePl,
  },
  // guide publish-a-startup-concept (pl translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'pl',
    content: publishAStartupConceptGuidePl,
  },
  // guide publish-an-idea (pl translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'pl', content: publishAnIdeaGuidePl },
  // guide start-an-origin (pl translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'pl', content: startACommunityGuidePl },
  // guide create-a-group (pt-BR translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'pt-BR', content: createAGroupGuidePtbr },
  // guide create-a-project (pt-BR translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'pt-BR', content: createAProjectGuidePtbr },
  // guide find-a-co-founder (pt-BR translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'pt-BR', content: findACoFounderGuidePtbr },
  // guide first-10-members (pt-BR translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'pt-BR', content: first10MembersGuidePtbr },
  // guide hybrid-origins (pt-BR translation).
  {
    kind: 'guide',
    slug: 'hybrid-origins',
    locale: 'pt-BR',
    content: hybridCommunitiesGuidePtbr,
  },
  // guide keep-an-origin-active (pt-BR translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'pt-BR',
    content: keepACommunityActiveGuidePtbr,
  },
  // guide moderation (pt-BR translation).
  { kind: 'guide', slug: 'moderation', locale: 'pt-BR', content: moderationGuidePtbr },
  // guide organize-a-meetup (pt-BR translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'pt-BR', content: organizeAMeetupGuidePtbr },
  // guide publish-a-small-business-idea (pt-BR translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'pt-BR',
    content: publishASmallBusinessIdeaGuidePtbr,
  },
  // guide publish-a-startup-concept (pt-BR translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'pt-BR',
    content: publishAStartupConceptGuidePtbr,
  },
  // guide publish-an-idea (pt-BR translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'pt-BR', content: publishAnIdeaGuidePtbr },
  // guide start-an-origin (pt-BR translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'pt-BR', content: startACommunityGuidePtbr },
  // guide create-a-group (ru translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'ru', content: createAGroupGuideRu },
  // guide create-a-project (ru translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'ru', content: createAProjectGuideRu },
  // guide find-a-co-founder (ru translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'ru', content: findACoFounderGuideRu },
  // guide first-10-members (ru translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'ru', content: first10MembersGuideRu },
  // guide hybrid-origins (ru translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'ru', content: hybridCommunitiesGuideRu },
  // guide keep-an-origin-active (ru translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'ru',
    content: keepACommunityActiveGuideRu,
  },
  // guide moderation (ru translation).
  { kind: 'guide', slug: 'moderation', locale: 'ru', content: moderationGuideRu },
  // guide organize-a-meetup (ru translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'ru', content: organizeAMeetupGuideRu },
  // guide publish-a-small-business-idea (ru translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'ru',
    content: publishASmallBusinessIdeaGuideRu,
  },
  // guide publish-a-startup-concept (ru translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'ru',
    content: publishAStartupConceptGuideRu,
  },
  // guide publish-an-idea (ru translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'ru', content: publishAnIdeaGuideRu },
  // guide start-an-origin (ru translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'ru', content: startACommunityGuideRu },
  // guide create-a-group (th translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'th', content: createAGroupGuideTh },
  // guide create-a-project (th translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'th', content: createAProjectGuideTh },
  // guide find-a-co-founder (th translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'th', content: findACoFounderGuideTh },
  // guide first-10-members (th translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'th', content: first10MembersGuideTh },
  // guide hybrid-origins (th translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'th', content: hybridCommunitiesGuideTh },
  // guide keep-an-origin-active (th translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'th',
    content: keepACommunityActiveGuideTh,
  },
  // guide moderation (th translation).
  { kind: 'guide', slug: 'moderation', locale: 'th', content: moderationGuideTh },
  // guide organize-a-meetup (th translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'th', content: organizeAMeetupGuideTh },
  // guide publish-a-small-business-idea (th translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'th',
    content: publishASmallBusinessIdeaGuideTh,
  },
  // guide publish-a-startup-concept (th translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'th',
    content: publishAStartupConceptGuideTh,
  },
  // guide publish-an-idea (th translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'th', content: publishAnIdeaGuideTh },
  // guide start-an-origin (th translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'th', content: startACommunityGuideTh },
  // guide create-a-group (tr translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'tr', content: createAGroupGuideTr },
  // guide create-a-project (tr translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'tr', content: createAProjectGuideTr },
  // guide find-a-co-founder (tr translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'tr', content: findACoFounderGuideTr },
  // guide first-10-members (tr translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'tr', content: first10MembersGuideTr },
  // guide hybrid-origins (tr translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'tr', content: hybridCommunitiesGuideTr },
  // guide keep-an-origin-active (tr translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'tr',
    content: keepACommunityActiveGuideTr,
  },
  // guide moderation (tr translation).
  { kind: 'guide', slug: 'moderation', locale: 'tr', content: moderationGuideTr },
  // guide organize-a-meetup (tr translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'tr', content: organizeAMeetupGuideTr },
  // guide publish-a-small-business-idea (tr translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'tr',
    content: publishASmallBusinessIdeaGuideTr,
  },
  // guide publish-a-startup-concept (tr translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'tr',
    content: publishAStartupConceptGuideTr,
  },
  // guide publish-an-idea (tr translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'tr', content: publishAnIdeaGuideTr },
  // guide start-an-origin (tr translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'tr', content: startACommunityGuideTr },
  // guide create-a-group (uk translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'uk', content: createAGroupGuideUk },
  // guide create-a-project (uk translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'uk', content: createAProjectGuideUk },
  // guide find-a-co-founder (uk translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'uk', content: findACoFounderGuideUk },
  // guide first-10-members (uk translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'uk', content: first10MembersGuideUk },
  // guide hybrid-origins (uk translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'uk', content: hybridCommunitiesGuideUk },
  // guide keep-an-origin-active (uk translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'uk',
    content: keepACommunityActiveGuideUk,
  },
  // guide moderation (uk translation).
  { kind: 'guide', slug: 'moderation', locale: 'uk', content: moderationGuideUk },
  // guide organize-a-meetup (uk translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'uk', content: organizeAMeetupGuideUk },
  // guide publish-a-small-business-idea (uk translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'uk',
    content: publishASmallBusinessIdeaGuideUk,
  },
  // guide publish-a-startup-concept (uk translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'uk',
    content: publishAStartupConceptGuideUk,
  },
  // guide publish-an-idea (uk translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'uk', content: publishAnIdeaGuideUk },
  // guide start-an-origin (uk translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'uk', content: startACommunityGuideUk },
  // guide create-a-group (vi translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'vi', content: createAGroupGuideVi },
  // guide create-a-project (vi translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'vi', content: createAProjectGuideVi },
  // guide find-a-co-founder (vi translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'vi', content: findACoFounderGuideVi },
  // guide first-10-members (vi translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'vi', content: first10MembersGuideVi },
  // guide hybrid-origins (vi translation).
  { kind: 'guide', slug: 'hybrid-origins', locale: 'vi', content: hybridCommunitiesGuideVi },
  // guide keep-an-origin-active (vi translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'vi',
    content: keepACommunityActiveGuideVi,
  },
  // guide moderation (vi translation).
  { kind: 'guide', slug: 'moderation', locale: 'vi', content: moderationGuideVi },
  // guide organize-a-meetup (vi translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'vi', content: organizeAMeetupGuideVi },
  // guide publish-a-small-business-idea (vi translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'vi',
    content: publishASmallBusinessIdeaGuideVi,
  },
  // guide publish-a-startup-concept (vi translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'vi',
    content: publishAStartupConceptGuideVi,
  },
  // guide publish-an-idea (vi translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'vi', content: publishAnIdeaGuideVi },
  // guide start-an-origin (vi translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'vi', content: startACommunityGuideVi },
  // guide create-a-group (zh-CN translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'zh-CN', content: createAGroupGuideZhcn },
  // guide create-a-project (zh-CN translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'zh-CN', content: createAProjectGuideZhcn },
  // guide find-a-co-founder (zh-CN translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'zh-CN', content: findACoFounderGuideZhcn },
  // guide first-10-members (zh-CN translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'zh-CN', content: first10MembersGuideZhcn },
  // guide hybrid-origins (zh-CN translation).
  {
    kind: 'guide',
    slug: 'hybrid-origins',
    locale: 'zh-CN',
    content: hybridCommunitiesGuideZhcn,
  },
  // guide keep-an-origin-active (zh-CN translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'zh-CN',
    content: keepACommunityActiveGuideZhcn,
  },
  // guide moderation (zh-CN translation).
  { kind: 'guide', slug: 'moderation', locale: 'zh-CN', content: moderationGuideZhcn },
  // guide organize-a-meetup (zh-CN translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'zh-CN', content: organizeAMeetupGuideZhcn },
  // guide publish-a-small-business-idea (zh-CN translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'zh-CN',
    content: publishASmallBusinessIdeaGuideZhcn,
  },
  // guide publish-a-startup-concept (zh-CN translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'zh-CN',
    content: publishAStartupConceptGuideZhcn,
  },
  // guide publish-an-idea (zh-CN translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'zh-CN', content: publishAnIdeaGuideZhcn },
  // guide start-an-origin (zh-CN translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'zh-CN', content: startACommunityGuideZhcn },
  // guide create-a-group (zh-TW translation).
  { kind: 'guide', slug: 'create-a-group', locale: 'zh-TW', content: createAGroupGuideZhtw },
  // guide create-a-project (zh-TW translation).
  { kind: 'guide', slug: 'create-a-project', locale: 'zh-TW', content: createAProjectGuideZhtw },
  // guide find-a-co-founder (zh-TW translation).
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'zh-TW', content: findACoFounderGuideZhtw },
  // guide first-10-members (zh-TW translation).
  { kind: 'guide', slug: 'first-10-members', locale: 'zh-TW', content: first10MembersGuideZhtw },
  // guide hybrid-origins (zh-TW translation).
  {
    kind: 'guide',
    slug: 'hybrid-origins',
    locale: 'zh-TW',
    content: hybridCommunitiesGuideZhtw,
  },
  // guide keep-an-origin-active (zh-TW translation).
  {
    kind: 'guide',
    slug: 'keep-an-origin-active',
    locale: 'zh-TW',
    content: keepACommunityActiveGuideZhtw,
  },
  // guide moderation (zh-TW translation).
  { kind: 'guide', slug: 'moderation', locale: 'zh-TW', content: moderationGuideZhtw },
  // guide organize-a-meetup (zh-TW translation).
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'zh-TW', content: organizeAMeetupGuideZhtw },
  // guide publish-a-small-business-idea (zh-TW translation).
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'zh-TW',
    content: publishASmallBusinessIdeaGuideZhtw,
  },
  // guide publish-a-startup-concept (zh-TW translation).
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'zh-TW',
    content: publishAStartupConceptGuideZhtw,
  },
  // guide publish-an-idea (zh-TW translation).
  { kind: 'guide', slug: 'publish-an-idea', locale: 'zh-TW', content: publishAnIdeaGuideZhtw },
  // guide start-an-origin (zh-TW translation).
  { kind: 'guide', slug: 'start-an-origin', locale: 'zh-TW', content: startACommunityGuideZhtw },
];

/** True when committed content exists for (kind, slug) in a locale. */
export function hasContent(kind: ContentKind, slug: string, locale: Locale): boolean {
  return getContentIndex().byExactKey.has(contentIndexKey(kind, slug, locale));
}

/**
 * Resolve content for (kind, slug, locale) with EN fallback.
 * Returns `undefined` when neither the locale nor EN has authored content.
 */
export function getContent<T extends LocationContent>(
  kind: ContentKind,
  slug: string,
  locale: Locale = 'en',
): T | undefined {
  const exact = getContentIndex().byExactKey.get(contentIndexKey(kind, slug, locale));
  if (exact) return exact.content as T;
  if (locale !== 'en') {
    const enFallback = getContentIndex().bySlug.get(slugIndexKey(kind, slug));
    const enEntry = enFallback?.find((entry) => entry.locale === 'en');
    if (enEntry) return enEntry.content as T;
  }
  return undefined;
}

/** All authored content for a locale (EN fallback is NOT applied here). */
export function listContent(locale: Locale = 'en'): LocationContent[] {
  return getContentIndex().byLocale.get(locale) ?? [];
}

/** Content of a given kind for a locale (EN fallback not applied). */
export function listContentByKind(kind: ContentKind, locale: Locale = 'en'): LocationContent[] {
  return (getContentIndex().byKindLocale.get(kindLocaleIndexKey(kind, locale)) ?? []).map(
    (entry) => entry.content,
  );
}

/** Locales with committed content for (kind, slug) — e.g. Berlin city: ['en','de']. */
export function contentLocalesFor(kind: ContentKind, slug: string): Locale[] {
  return (getContentIndex().bySlug.get(slugIndexKey(kind, slug)) ?? []).map(
    (entry) => entry.locale,
  );
}

/** Typed accessors so consumers do not narrow manually. */
export function getCityContent(slug: string, locale: Locale = 'en'): CityContent | undefined {
  return getContent<CityContent>('city', slug, locale);
}

export function getCountryContent(slug: string, locale: Locale = 'en'): CountryContent | undefined {
  return getContent<CountryContent>('country', slug, locale);
}

export function getRegionContent(slug: string, locale: Locale = 'en'): RegionContent | undefined {
  return getContent<RegionContent>('region', slug, locale);
}

export function getGuideContent(slug: string, locale: Locale = 'en'): GuideContent | undefined {
  return getContent<GuideContent>('guide', slug, locale);
}
