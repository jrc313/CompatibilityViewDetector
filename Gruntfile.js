module.exports = function(grunt)
{

	require('time-grunt')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		uglify:
		{
			options:
			{
				banner: "/*! compat-view-detector <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
			},
			dist:
			{
				files:
				{
					"dist/<%= pkg.name %>.min.js": ["src/<%= pkg.name %>.js"]
				}
			}
		},

		jshint:
		{
			files: ["src/**/*.js"],
		},

		watch:
		{
			files: ["<%= jshint.files %>"],
			tasks: ["jshint"]
		},

		imagemin:
		{
			options:
			{
				cache: false
			},

			dist:
			{
				files: [{expand: true, cwd: "src/", src: ["**/*.{png,jpg,gif}"], dest: "dist/"}]
			}
		},

		clean: ["dist/"],

		copy:
		{
			dist:
			{
				expand: true,
				cwd: 'src/',
				src: '**/*.html',
				dest: 'dist/'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask("default", ["clean", "jshint", "uglify", "imagemin", "copy"]);
};