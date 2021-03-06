// Generated on 2014-06-04 using generator-webapp 0.4.9
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    // Add shopify theme url here
    var config = {
        app: 'app',
        dist: '../ecobee-8427649/assets',
        snippets: '../ecobee-8427649/snippets',
        dist2: '../ecobee-2-8427661/assets',
        snippets2: '../ecobee-2-8427661/snippets'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            // bower: {
            //     files: ['bower.json'],
            //     tasks: ['bowerInstall']
            // },
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint', 'concat', 'uglify'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:dist', 'autoprefixer']
            },
            images: {
                files: ['<%= config.app %>/images/{,*/}*.svg'],
                tasks: ['svgstore', 'svgstore:ecobee2']
            },
            styles: {
                files: ['<%= config.dist %>/{,*/}*.css'],
                tasks: ['cssmin:minify']
            },
            styles2: {
                files: ['<%= config.dist2 %>/{,*/}*.css'],
                tasks: ['cssmin:minify2']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= config.app %>/images/{,*/}*'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    open: false,
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            dist2: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist2 %>/*',
                        '!<%= config.dist2 %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                includePaths: [
                    'bower_components',
                    '../../app/themes/ecobee/scss'
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.scss'],
                    dest: '<%= config.app %>/styles',
                    ext: '.css'
                }]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: '{,*/}*.css',
                    dest: '<%= config.dist %>'
                }]
            },
            dist2: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: '{,*/}*.css',
                    dest: '<%= config.dist2 %>'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        // bowerInstall: {
        //     app: {
        //         src: ['<%= config.app %>/index.html'],
        //         exclude: ['bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap.js']
        //     },
        //     sass: {
        //         src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}']
        //     }
        // },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/images/{,*/}*.*',
                        '<%= config.dist %>/styles/fonts/{,*/}*.*',
                        '<%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        // useminPrepare: {
        //     options: {
        //         dest: '<%= config.dist %>'
        //     },
        //     html: '<%= config.app %>/index.html'
        // },

        // // Performs rewrites based on rev and the useminPrepare configuration
        // usemin: {
        //     options: {
        //         assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
        //     },
        //     html: ['<%= config.dist %>/{,*/}*.html'],
        //     css: ['<%= config.dist %>/styles/{,*/}*.css']
        // },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            },
            dist2: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist2 %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.app %>/images'
                }]
            }
        },

        // htmlmin: {
        //     dist: {
        //         options: {
        //             collapseBooleanAttributes: true,
        //             collapseWhitespace: true,
        //             removeAttributeQuotes: true,
        //             removeCommentsFromCDATA: true,
        //             removeEmptyAttributes: true,
        //             removeOptionalTags: true,
        //             removeRedundantAttributes: true,
        //             useShortDoctype: true
        //         },
        //         files: [{
        //             expand: true,
        //             cwd: '<%= config.dist %>',
        //             src: '{,*/}*.html',
        //             dest: '<%= config.dist %>'
        //         }]
        //     }
        // },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    '<%= config.dist %>/style.css.liquid': [
                        '<%= config.dist %>/style.css'
                    ]
                }
            },
            dist2: {
                files: {
                    '<%= config.dist2 %>/style.css.liquid': [
                        '<%= config.dist2 %>/style.css'
                    ]
                }
            },
            minify: {
                expand: true,
                cwd: '<%= config.dist %>',
                src: ['*.css'],
                dest: '<%= config.dist %>',
                ext: '.css.liquid'
            },
            minify2: {
                expand: true,
                cwd: '<%= config.dist2 %>',
                src: ['*.css'],
                dest: '<%= config.dist2 %>',
                ext: '.css.liquid'
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/scripts.js.liquid': [
                        '<%= config.dist %>/scripts.js'
                    ]
                }
            },
            dist2: {
                files: {
                    '<%= config.dist2 %>/scripts.js.liquid': [
                        '<%= config.dist2 %>/scripts.js'
                    ]
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery.easing/js/jquery.easing.js',
                    'bower_components/sly/dist/sly.js',
                    'bower_components/ButtonComponentMorph/js/uiMorphingButton_fixed.js',
                    'bower_components/classie/classie.js',
                    '<%= config.app %>/scripts/{,*/}*.js'
                ],
                dest: '<%= config.dist %>/scripts.js'
            },
            dist2: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery.easing/js/jquery.easing.js',
                    'bower_components/sly/dist/sly.js',
                    'bower_components/ButtonComponentMorph/js/uiMorphingButton_fixed.js',
                    'bower_components/classie/classie.js',
                    '<%= config.app %>/scripts/{,*/}*.js'
                ],
                dest: '<%= config.dist2 %>/scripts.js'
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            dist: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: '<%= config.dist %>/scripts/modernizr.js',
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '!<%= config.dist %>/scripts/vendor/*'
                    ]
                },
                uglify: true
            },
            dist2: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: '<%= config.dist2 %>/scripts/modernizr.js',
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '!<%= config.dist %>/scripts/vendor/*'
                    ]
                },
                uglify: true
            }
        },
        // Create DEF File for inline svg-ing
        svgstore: {
            default : {
                files: {
                    '<%= config.snippets %>/svg-defs.liquid': [
                        '<%= config.app %>/images/{,*/}*.svg'
                    ],
                },
            },
            ecobee2 : {
                files: {
                    '<%= config.snippets %>/svg-defs.liquid': [
                        '<%= config.app %>/images/{,*/}*.svg'
                    ],
                },
            },
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'sass:dist',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'sass',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'modernizr',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
