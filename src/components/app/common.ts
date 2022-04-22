export interface ThemeType{
  font: {
    mini: string,
    small: string,
    semibase: string,
    base: string,
    upperbase: string,
    medium: string,
    formsHeading: string,
    semilarge:string,
    large: string,
  },
  color: {
    white: string,
    black: string,
    whiteSmoke: string,
    whisper: string,
    whisper2: string,
    gray: string,
    darkerGray: string,
    nero: string,
    nero2: string,
    tangerine: string,
    carrotOrange: string,
    eclipse: string,
    pinkSwan: string,
  },
}

const appTheme = {
  font: {
    mini: '12px',
    small: '13px',
    semibase: '14px',
    base: '15px',
    upperbase: '17px',
    medium: '24px',
    formsHeading: '32px',
    semilarge: '64px',
    large: '92px',
  },
  color: {
    white: '#FFFFFF',
    black: '#000000',
    whiteSmoke: '#F0F0F0',
    whisper: '#E5E5E5',
    whisper2: '#E6E6E6',
    gray: 'rgba(255, 255, 255, 0.32)',
    darkerGray: 'rgba(255, 255, 255, 0.5)',
    nero: '#1A1A1A',
    nero2: '#1F1D1D',
    tangerine: '#F2890F',
    carrotOrange: '#F39425',
    eclipse: 'rgba(61, 51, 51, 0.96)',
    pinkSwan: '#B8B8B8',
  },
};

export { appTheme };
