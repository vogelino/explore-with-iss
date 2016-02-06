const formatter = {};
const languages = {
	sq: 'Albanian',
	am: 'Amharic',
	ar: 'Arabic',
	an: 'Aragonese',
	hy: 'Armenian',
	as: 'Assamese',
	av: 'Avaric',
	ae: 'Avestan',
	ay: 'Aymara',
	az: 'Azerbaijani',
	ba: 'Bashkir',
	bm: 'Bambara',
	eu: 'Basque',
	be: 'Belarusian',
	bn: 'Bengali',
	bh: 'Bihari languages',
	bi: 'Bislama',
	bo: 'Tibetan',
	bs: 'Bosnian',
	br: 'Breton',
	bg: 'Bulgarian',
	my: 'Burmese',
	ca: 'Catalan',
	cs: 'Czech',
	ch: 'Chamorro',
	ce: 'Chechen',
	zh: 'Chinese',
	cu: 'Slavic',
	cv: 'Chuvash',
	kw: 'Cornish',
	co: 'Corsican',
	cr: 'Cree',
	cy: 'Welsh',
	da: 'Danish',
	de: 'German',
	dv: 'Divehi',
	nl: 'Dutch',
	dz: 'Dzongkha',
	el: 'Greek',
	en: 'English',
	eo: 'Esperanto',
	et: 'Estonian',
	ee: 'Ewe',
	fo: 'Faroese',
	fa: 'Persian',
	fj: 'Fijian',
	fi: 'Finnish',
	fr: 'French',
	fy: 'Western Frisian',
	ff: 'Fulah',
	ka: 'Georgian',
	gd: 'Gaelic',
	ga: 'Irish',
	gl: 'Galician',
	gv: 'Manx',
	gn: 'Guarani',
	gu: 'Gujarati',
	ht: 'Haitian',
	ha: 'Hausa',
	he: 'Hebrew',
	hz: 'Herero',
	hi: 'Hindi',
	ho: 'Hiri Motu',
	hr: 'Croatian',
	hu: 'Hungarian',
	ig: 'Igbo',
	is: 'Icelandic',
	io: 'Ido',
	ii: 'Sichuan Yi',
	iu: 'Inuktitut',
	ie: 'Interlingue',
	ia: 'Interlingua',
	id: 'Indonesian',
	ik: 'Inupiaq',
	it: 'Italian',
	jv: 'Javanese',
	ja: 'Japanese',
	kl: 'Kalaallisut',
	kn: 'Kannada',
	ks: 'Kashmiri',
	kr: 'Kanuri',
	kk: 'Kazakh',
	km: 'Central Khmer',
	ki: 'Kikuyu',
	rw: 'Kinyarwanda',
	ky: 'Kirghiz',
	kv: 'Komi',
	kg: 'Kongo',
	ko: 'Korean',
	kj: 'Kuanyama',
	ku: 'Kurdish',
	lo: 'Lao',
	la: 'Latin',
	lv: 'Latvian',
	li: 'Limburgan',
	ln: 'Lingala',
	lt: 'Lithuanian',
	lb: 'Luxembourgish',
	lu: 'Luba-Katanga',
	lg: 'Ganda',
	mk: 'Macedonian',
	mh: 'Marshallese',
	ml: 'Malayalam',
	mi: 'Maori',
	mr: 'Marathi',
	ms: 'Malay',
	mg: 'Malagasy',
	mt: 'Maltese',
	mn: 'Mongolian',
	na: 'Nauru',
	nv: 'Navajo',
	nr: 'Ndebele (South)',
	nd: 'Ndebele (North)',
	ng: 'Ndonga',
	ne: 'Nepali',
	nn: 'Nynorsk',
	nb: 'Bokmål',
	no: 'Norwegian',
	ny: 'Chichewa',
	oc: 'Occitan',
	oj: 'Ojibwa',
	or: 'Oriya',
	om: 'Oromo',
	os: 'Ossetian',
	pa: 'Panjabi',
	pi: 'Pali',
	pl: 'Polish',
	pt: 'Portuguese',
	ps: 'Pushto',
	qu: 'Quechua',
	rm: 'Romansh',
	ro: 'Romanian',
	rn: 'Rundi',
	ru: 'Russian',
	sg: 'Sango',
	sa: 'Sanskrit',
	si: 'Sinhala',
	sk: 'Slovak',
	sl: 'Slovenian',
	se: 'Northern Sami',
	sm: 'Samoan',
	sn: 'Shona',
	sd: 'Sindhi',
	so: 'Somali',
	st: 'Sotho (Southern)',
	es: 'Spanish',
	sc: 'Sardinian',
	sr: 'Serbian',
	ss: 'Swati',
	su: 'Sundanese',
	sw: 'Swahili',
	sv: 'Swedish',
	ty: 'Tahitian',
	ta: 'Tamil',
	tt: 'Tatar',
	te: 'Telugu',
	tg: 'Tajik',
	tl: 'Tagalog',
	th: 'Thai',
	ti: 'Tigrinya',
	to: 'Tonga (Tonga Islands)',
	tn: 'Tswana',
	ts: 'Tsonga',
	tk: 'Turkmen',
	tr: 'Turkish',
	tw: 'Twi',
	ug: 'Uighur',
	uk: 'Ukrainian',
	ur: 'Urdu',
	uz: 'Uzbek',
	ve: 'Venda',
	vi: 'Vietnamese',
	vo: 'Volapük',
	wa: 'Walloon',
	wo: 'Wolof',
	xh: 'Xhosa',
	yi: 'Yiddish',
	yo: 'Yoruba',
	za: 'Zhuang',
	zu: 'Zulu'
};
const escapeRegExp = (str) => {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
};
const replaceAll = (str, find, replace) => {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

formatter.formatNumber = (number) => {
	number = number.toFixed(2) + '';
	var x = number.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
};


formatter.formatTimezone = (timezone) => {
	let isPos = true;
	let timezonePure = replaceAll(timezone, '0', '')
		.replace('UTC', '')
		.replace(':', '');

	if (timezonePure.indexOf('−') >= 0) {
		isPos = false;
	}

	timezonePure = timezonePure
		.replace('+', '')
		.replace('−', '');

	timezonePure = parseInt(timezonePure, 10);

	return isPos ? timezonePure : timezonePure * -1;
};


formatter.formatLanguage = (code) => {
	return languages[code] || code;
};

export default formatter;
