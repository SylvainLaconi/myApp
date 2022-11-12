import { extendTheme } from '@chakra-ui/react';

const colors = {
	transparent: 'transparent',
	current: 'currentColor',
	black: '#000000',
	white: '#FFFFFF',

	gray: {
		50: '#F7FAFC',
		100: '#EDF2F7',
		200: '#E2E8F0',
		300: '#CBD5E0',
		400: '#A0AEC0',
		500: '#718096',
		600: '#4A5568',
		700: '#2D3748',
		800: '#1A202C',
		900: '#171923',
	},

	red: {
		50: '#FFF5F5',
		100: '#FED7D7',
		200: '#FEB2B2',
		300: '#FC8181',
		400: '#F56565',
		500: '#E53E3E',
		600: '#C53030',
		700: '#9B2C2C',
		800: '#822727',
		900: '#63171B',
	},

	orange: {
		50: '#FFFAF0',
		100: '#FEEBC8',
		200: '#FBD38D',
		300: '#F6AD55',
		400: '#ED8936',
		500: '#DD6B20',
		600: '#C05621',
		700: '#9C4221',
		800: '#7B341E',
		900: '#652B19',
	},

	green: {
		50: '#F0FFF4',
		100: '#C6F6D5',
		200: '#9AE6B4',
		300: '#68D391',
		400: '#48BB78',
		500: '#38A169',
		600: '#2F855A',
		700: '#276749',
		800: '#22543D',
		900: '#1C4532',
	},

	blue: {
		50: '#ebf8ff',
		100: '#bee3f8',
		200: '#90cdf4',
		300: '#63b3ed',
		400: '#4299e1',
		500: '#3182ce',
		600: '#2b6cb0',
		700: '#2c5282',
		800: '#2a4365',
		900: '#1A365D',
	},
};

const theme = extendTheme({ colors });
export default theme;
