module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('bower.json'),

    minBanner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '(c) <%= pkg.author %>, <%= pkg.homepage %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %> */\n',



    uglify: {
      options: {
        report: 'min',
        banner: '<%= minBanner %>'
      },
      asidemenu: {
        files: {
          'dist/aside-menu.min.js': [
            'dist/aside-menu.js'
          ]
        }
      }
    },

    ngtemplates: {
      app: {
        src: 'src/**.html',
        dest: 'temp/templates.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true, // Only if you don't use comment directives!
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
          module: 'rzModule',
          url: function(url) {
            return url.replace('src/', '');
          },
          bootstrap: function(module, script) {
            return 'module.run(function($templateCache) {\n' + script + '\n});';
          }
        }
      }
    },

    replace: {
      dist: {
        options: {
          patterns: [{
            match: /\/\*templateReplacement\*\//,
            replacement: '<%= grunt.file.read("temp/templates.js") %>'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['src/aside-menu.js','src/aside-menu.css'],
          dest: 'dist/'
        }]
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      asidemenu: {
        files: [{
          'dist/aside-menu.js': 'dist/aside-menu.js'
        }, {
          expand: true,
          src: ['dist/aside-menu.js']
        }]
      }
    },
    watch: {
      all: {
        files: ['dist/*', 'demo/*'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['src/*js', 'src/*.html'],
        tasks: ['js']
      }
    },
    serve: {
      options: {
        port: 9000
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-serve');

  grunt.registerTask('default', ['js']);

  grunt.registerTask('js', ['ngtemplates', 'replace', 'ngAnnotate', 'uglify']);
};
