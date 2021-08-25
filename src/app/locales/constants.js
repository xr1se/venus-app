import { setLocale } from "react-i18nify"

export const LANGUAGES = ["en", "fr", "ar", "cs", "de", "es", "it", "nl", "ro", "ru", "sv", "tr", "zh-CN"]
export const __LOCAL_STORAGE_LANG_KEY__ = "__LOCAL_STORAGE_LANG_KEY__"
export const DEFAULT_LANGUAGE = "en"

export const mfdLanguageOptions = {
  supportedLanguages: LANGUAGES,
  localStorageKey: __LOCAL_STORAGE_LANG_KEY__,
  defaultLanguage: DEFAULT_LANGUAGE,
  onLangChange: (lang) => {
    // override the language with the value of the lang URL parameter, if present
    const languageOverride = (window.location.search.match(/[?&]lang=([a-zA-Z-_]{2,5})/) || [])[1]
    setLocale(languageOverride || lang)
  },
}