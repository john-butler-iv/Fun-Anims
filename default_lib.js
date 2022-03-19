var ARCTIC_THEME = {
	DARK: '#2e3440',
	SEMIDARK: '#3b4252',
	SEMILIGHT: '#81a1c1',
	LIGHT: '#d8dee9'
};

function compileTheme(base, dark) {
	let comp = {};
	
	if (dark) {
		comp.background = base.DARK;
		comp.darkBackground = base.SEMIDARK;
		comp.lightStroke = base.SEMILIGHT;
		comp.stroke = base.LIGHT;
	} else {
		comp.background = base.LIGHT;
		comp.darkBackground = base.SEMILIGHT;
		comp.lightStroke = base.SEMIDARK;
		comp.stroke = base.DARK;
	}

	return comp;
}

var theme = compileTheme(ARCTIC_THEME, true);

var ANGLE = {
	SLOW: 0.01,
	MEDIUM: 0.05,
	FAST: 0.1
};

var DEBUG = true;


