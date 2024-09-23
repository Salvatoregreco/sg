/** @type {import('tailwindcss').Config} */
export default {
    content: ['./resources/**/*.blade.php', './resources/**/*.js', './resources/**/*.jsx'],
    theme: {
        extend: {
            colors: {
                sg: {
                    50: '#ebf7ff',
                    100: '#d1eeff',
                    200: '#aee1ff',
                    300: '#76d1ff',
                    400: '#35b6ff',
                    500: '#078eff',
                    600: '#0068ff',
                    700: '#004fff',
                    800: '#0041d7',
                    900: '#003ca6',
                    950: '#062665',
                    DEFAULT: '#003ca6',
                },
                sg_secondary: {
                    50: '#fffee7',
                    100: '#fffec0',
                    200: '#fffa85',
                    300: '#ffef3f',
                    400: '#ffde0b',
                    500: '#f4c400',
                    600: '#d39700',
                    700: '#a66a00',
                    800: '#8a5309',
                    900: '#75440e',
                    950: '#452303',
                    DEFAULT: '#A66A00',
                },
            },
            boxShadow: {
                right: '1px 0 6px rgba(0, 0, 0, 0.1)',
            },
            width: {
                68: '17rem',
                72: '18rem',
                76: '19rem',
                80: '20rem',
            },
            translate: {
                68: '17rem',
                72: '18rem',
                76: '19rem',
                80: '20rem',
            },
            opacity: ['disabled'],
            cursor: ['disabled'],
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
};
