var
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack');
     
gulp.task('webpack', function(done) {
    // run webpack
    webpack({
        entry: './src/index.js',
        output: {
            path: './dist',
            filename: 'injector.js'
        },
        module: {
            loaders: [
                { test: /.js?$/, loader: 'babel-loader', exclude: /node_modules|bower_components/, query: { presets: [ 'es2015' ] } },
            ]
        }
    }, function(error) {
        var pluginError;
 
        if (error) {
            pluginError = new gulpUtil.PluginError('webpack', error);
 
            if (done) {
                done(pluginError);
            } else {
                gulpUtil.log('[webpack]', pluginError);
            }
 
            return;
        }
 
        if (done) {
            done();
        }
    });
});
 
gulp.task('default', ['webpack'])