const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        cssnano({
            preset: 'default'
        }),
        purgecss({
            content: ['./layouts/**/*.html', './src/**/*.vue', './src/**/*.jsx',
                './node_modules/v-calendar/src/**/*.vue',
                './node_modules/vue-datetime/src/*.vue',
                './node_modules/vue-select/src/**/*.vue',
                './node_modules/vue-data-tables/src/**/*.vue',
                './node_modules/vue-data-tables/src/**/*.js',
                './node_modules/element-ui/src/**/*.js',
                './node_modules/element-ui/lib/**/**/*.js',
                './node_modules/element-ui/lib/theme-chalk/index.css',
            ],
            // content: ['index.html', '**/*.js', '**/*.html', '**/*.vue'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
            // (/[A-z0-9-:\\/%-.]+/g) || []
        })
    ]
};
