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
        theme:'../bikes-on-wheels-2-10385219',
        dist: '../bikes-on-wheels-2-10385219/assets',
        snippets: '../bikes-on-wheels-2-10385219/snippets'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint:all', 'concat',  'ngAnnotate', 'uglify'],
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
                tasks: ['svgstore']
            },
            styles: {
                files: ['<%= config.dist %>/{,*/}*.css'],
                tasks: ['cssmin:minify']
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
            },
            shopify: {
                files: [
                    '<%= config.theme %>/assets/**',
                    '<%= config.theme %>/snippets/**',
                    '<%= config.theme %>/layout/**',
                    '<%= config.theme %>/templates/**'
                ],
                tasks: ['shopify']
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
                    middleware: function (connect) {
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
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            GruntFile: [
                'Gruntfile.js'
            ],
            all: [
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
                    'bower_components/foundation/scss'
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
        // imagemin: {
        //     dist: {
        //         files: [{
        //             expand: true,
        //             cwd: '<%= config.app %>/images',
        //             src: '{,*/}*.{gif,jpeg,jpg,png}',
        //             dest: '<%= config.dist %>/images'
        //         }]
        //     }
        // },

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
            minify: {
                expand: true,
                cwd: '<%= config.dist %>',
                src: ['*.css'],
                dest: '<%= config.dist %>',
                ext: '.css.liquid'
            }
        },
        uglify: {
            options: {
                mangle: true,
                sourceMap : false
            },
            dist: {
                files: {
                    '<%= config.dist %>/scripts.js.liquid': [
                        '<%= config.dist %>/scripts.js.liquid'
                    ]
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/swiper/src/idangerous.swiper.js',
                    '<%= config.app %>/scripts/cart.js',
                    '<%= config.app %>/scripts/script.js'
                ],
                dest: '<%= config.dist %>/scripts.js'
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: 'scripts.js',
                    ext: '.js.liquid',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        shopify: {
            options: {
                api_key: 'ef395c6764a48a68887522090392b090',
                password: '0ccdd74708ab1b4c1b0bec0348cc6700',
                url: 'bikes-on-wheels-2.myshopify.com',
                base: '../bikes-on-wheels-2-10385219/'
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
            }
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
                // 'imagemin',
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
