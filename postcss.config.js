// const purgecss = require('@fullhuman/postcss-purgecss');
// const cssnano = require('cssnano');
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        // cssnano({
        //     preset: 'default'
        // }),
        // purgecss({
        //     content: ['./layouts/**/*.html', './src/**/*.vue', './src/**/*.jsx',
        //         './node_modules/v-calendar/src/**/*.vue',
        //         './node_modules/vue-datetime/src/*.vue',
        //         './node_modules/vue-select/src/**/*.vue',
        //         './node_modules/vue-data-tables/src/**/*.vue',
        //     ],
        //     defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        // })
    ]
};
