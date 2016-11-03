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
    replace: {
      dist: {
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
        singleQuotes: true
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
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['js']);
  grunt.registerTask('test', ['karma']);

  grunt.registerTask('js', ['replace', 'ngAnnotate', 'uglify']);
};
