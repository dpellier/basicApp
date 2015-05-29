

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        dirs: {
            app: 'src',
            temp: '.tmp'
        },
        watch: {
            options: {
                livereload: true
            },
            files: ['<%= dirs.app %>/**/*.html', '<%= dirs.app %>/**/*.js'],
            css: {
                files: ['<%= dirs.app %>/**/*.scss'],
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
                    '<%= dirs.temp %>/app.css': '<%= dirs.app %>/app.scss'
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
        }
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
};
