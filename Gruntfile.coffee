module.exports = (grunt) ->
	grunt.initConfig(
		coffee:
			build:
				src: ['src/tweenutil.coffee']
				dest: 'lib/tweenutil.js'

		uglify:
			build:
				src: ['lib/tweenutil.js']
				dest: 'lib/tweenutil.min.js'

		watch:
			files: ['src/**/*.coffee']
			tasks: ['coffee']
	)

	grunt.loadNpmTasks('grunt-contrib-coffee')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-watch')

	grunt.registerTask('default', [
		'coffee',
		'uglify',
	])
