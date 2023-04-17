const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};

import langs from "./languages.json" assert { type: "json" };
//
let theme = document.querySelector(".theme");
//
let main = document.querySelector("main");
let fromText = document.querySelector(".text textarea.from");
let toText = document.querySelector(".text textarea.to");
let fromSelect = document.querySelector(".options .opt select.from");
let toSelect = document.querySelector(".options .opt select.to");
let swapBtn = document.querySelector(".swap");
let copyBtn = document.querySelectorAll(
  ".translation .options .opt .icons i.copy"
);
let VoiceBtn = document.querySelectorAll(
  ".translation .options .opt .icons i.sound"
);
let translateBtn = document.querySelector(".btn");
let fromSelectValue = 1;
let toSelectValue = 1;
//
langs.forEach((el) => {
  if (el.no != "0") {
    let opt = document.createElement("option");
    opt.textContent = `${el.name}(${el.native})`;
    opt.value = el.no;
    opt.dataset.num = el.no;
    fromSelect.append(opt);
  }
});
langs.forEach((el) => {
  if (el.no != "0") {
    let opt = document.createElement("option");
    opt.textContent = `${el.name}(${el.native})`;
    opt.value = el.no;
    opt.dataset.num = el.no;
    toSelect.append(opt);
  }
});
//
for (let cot in countries) {
  langs.forEach((el) => {
    if (el.name.toLowerCase() == countries[cot].toLowerCase()) {
      el.code = cot;
    }
  });
}
//
fromSelect.onchange = () => {
  fromSelectValue = fromSelect.value;
};
toSelect.onchange = () => {
  toSelectValue = toSelect.value;
};
//
swapBtn.onclick = () => {
  swapBtn.classList.toggle("rotate");
  toSelect.value = fromSelectValue;
  fromSelect.value = toSelectValue;
  let swap = fromSelectValue;
  fromSelectValue = toSelectValue;
  toSelectValue = swap;
  let swap2 = toText.value;
  toText.value = fromText.value;
  fromText.value = swap2;
};
translateBtn.onclick = () => {
  let text = fromText.value;
  let from = langs[fromSelect.value].code;
  let to = langs[toSelect.value].code;
  let apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURI(
    text
  )}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => (toText.value = data[0][0][0]));
};
//
copyBtn.forEach((el) => {
  el.onclick = () => {
    if (el.classList.contains("from")) {
      navigator.clipboard.writeText(fromText.value);
    } else {
      navigator.clipboard.writeText(toText.value);
    }
  };
});
//
//
VoiceBtn.forEach((el) => {
  el.onclick = () => {
    let sound;
    if (el.classList.contains("from")) {
      sound = new SpeechSynthesisUtterance(fromText.value);
      sound.lang = langs[fromSelect.value].code;
    } else {
      sound = new SpeechSynthesisUtterance(toText.value);
      sound.lang = langs[toSelect.value].code;
    }
    speechSynthesis.speak(sound);
  };
});
//
theme.onclick = () => {
  main.classList.toggle("dark");
  theme.classList.toggle("moon");
  theme.classList.toggle("sun");
  document.body.classList.toggle("dark");
};
