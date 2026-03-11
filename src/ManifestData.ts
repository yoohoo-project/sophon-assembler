import { LanguageInformation, ManifestData } from "./types";

const hi3JpLang: LanguageInformation[] = [
    {
        language: 'jp',
        index: 1,
    },
] as const;

const hi3CnLang: LanguageInformation[] = [
    {
        language: 'cn',
        index: 1,
    },
] as const;

const defaultLang: LanguageInformation[] = [
    {
        language: 'cn',
        index: 1,
    },
    {
        language: 'en',
        index: 2,
    },
    {
        language: 'jp',
        index: 3,
    },
    {
        language: 'kr',
        index: 4,
    },
] as const;

export const manifestData: ManifestData[] = [
    {
        game: 'bh3-global',
        languages: hi3JpLang,
    },
    {
        game: 'bh3-jp',
        languages: hi3JpLang,
    },
    {
        game: 'bh3-kr',
        languages: hi3JpLang,
    },
    {
        game: 'bh3-sea',
        languages: hi3CnLang,
    },
    {
        game: 'bh3-tw',
        languages: hi3CnLang,
    },
    {
        game: 'hk4e',
        languages: defaultLang,
    },
    {
        game: 'hkrpg',
        languages: defaultLang
    },
    {
        game: 'nap',
        languages: defaultLang
    },
] as const;
