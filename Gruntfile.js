

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        dirs: {
            dist: 'dist',
            temp: '.tmp',
            app: 'src',
            fonts: '<%= dirs.app %>/fonts',
            images: '<%= dirs.app %>/images',
            js: '<%= dirs.app %>/js',
            styles: '<%= dirs.app %>/styles',
            vendors: '<%= dirs.app %>/vendors'
        },
        watch: {
            options: {
                livereload: true
            },
            files: ['<%= dirs.app %>/**/*.html',
                '<%= dirs.fonts %>/**/*.*',
                '<%= dirs.vendors %>/**/*.*',
                '<%= dirs.js %>/**/*.js',
                '<%= dirs.images %>/**/*.*'
            ],
            css: {
                files: ['<%= dirs.styles %>/**/*.scss'],
                tasks: ['preprocss']
            }
        },
        connect: {
            options: {
                port: 8080
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= dirs.temp %>',
                        '<%= dirs.app %>'
                    ]
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    lineNumber: true
                },
                files: {
                    '<%= dirs.temp %>/app.css': '<%= dirs.styles %>/app.scss'
                }
            }
        },
        autoprefixer: {
            options: ['last 2 versions', 'ie 8', 'ie 9'],
            '<%= dirs.temp %>/app.css': ['<%= dirs.temp %>/app.css']
        },
        scsslint: {
            allFiles: [
                '<%= dirs.app %>/**/*.scss',
                '!<%= dirs.app %>/vendors/**/*.scss'
            ],
            options: {
                config: '.scss-lint.yml',
                colorizeOutput: true
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            all: {
                src: ['<%= dirs.app %>/**/*.js']
            }
        },
        clean: {
            server: '<%= dirs.temp %>'
        },
        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.images %>',
                    src: '**/*',
                    dest: '<%= dirs.temp %>/images'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.app %>/',
                    src: '**/*.html',
                    dest: '<%= dirs.temp %>'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.js %>',
                    src: '**/*.js',
                    dest: '<%= dirs.temp %>/js'
                }]
            },
            vendors: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.vendors %>',
                    src: ['**/*.*'],
                    dest: '<%= dirs.temp %>/vendors/'
                }]
            }
        },
    });

    grunt.registerTask('preprocss', [
        'sass',
        'autoprefixer'
    ]);

    grunt.registerTask('lint', [
        'scsslint',
        'jshint'
    ]);

    grunt.registerTask('serve', [
        'clean:server',
        'preprocss',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'preprocss',
        'copy'
    ]);
};
