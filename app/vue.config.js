module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('svg');
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    loader: 'vue-svg-loader',
                    options: {
                        svgo: {
                            plugins: [
                                { removeDoctype: true },
                                { removeComments: true },
                                { cleanupIDs: false },
                                { collapseGroups: false },
                                { removeEmptyContainers: false },
                                { inlineStyles: true },
                                { convertStyleToAttrs: true }
                            ]
                        }
                    }
                }
            ]
        }
    }
};
