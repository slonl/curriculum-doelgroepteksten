	var Ajv = require('ajv');
	var ajv = new Ajv({
		'extendRefs': true,
		'allErrors': true,
		'jsonPointers': true
	});
	var validate = null;

	ajv.addKeyword('itemTypeReference', {
		validate: function(schema, data, parentSchema, dataPath, parentData, propertyName, rootData) {
			var matches = /.*\#\/definitions\/(.*)/g.exec(schema);
			if (matches) {
				var result = curriculum.types[data] == matches[1];
				return result;
			}
			console.log('Unknown #ref definition: '+schema);
		}
	});

	var curriculum   = require('../curriculum-basis/lib/curriculum.js');
	var schema       = curriculum.loadSchema('context.json');
	var basisSchema   = curriculum.loadSchema('curriculum-basis/context.json', 'curriculum-basis/');
	var lpibSchema = curriculum.loadSchema('curriculum-lpib/context.json', 'curriculum-lpib/');
	var kerndoelSchema = curriculum.loadSchema('curriculum-kerndoelen/context.json', 'curriculum-kerndoelen/');
	var examenprogrammaSchema = curriculum.loadSchema('curriculum-examenprogramma/context.json', 'curriculum-examenprogramma/');
	var syllabusSchema = curriculum.loadSchema('curriculum-syllabus/context.json', 'curriculum-syllabus/');

	var valid = ajv
		.addSchema(basisSchema, 'https://opendata.slo.nl/curriculum/schemas/curriculum-basis/context.json')
		.addSchema(lpibSchema, 'https://opendata.slo.nl/curriculum/schemas/curriculum-lpib/context.json')
		.addSchema(kerndoelSchema, 'https://opendata.slo.nl/curriculum/schemas/curriculum-kerndoelen/context.json')
		.addSchema(examenprogrammaSchema, 'https://opendata.slo.nl/curriculum/schemas/curriculum-examenprogramma/context.json')
		.addSchema(syllabusSchema, 'https://opendata.slo.nl/curriculum/schemas/curriculum-syllabus/context.json')
		.addSchema(schema, 'https://opendata.slo.nl/curriculum/schemas/curriculum-doelgroepteksten/context.json')
		.validate('https://opendata.slo.nl/curriculum/schemas/curriculum-doelgroepteksten/context.json', curriculum.data);

	if (!valid) { ajv.errors.forEach(function(error) {
			console.log(error.dataPath+': '+error.message);
		});
		console.log('data is invalid');
		process.exit(1);
	} else {
		console.log('data is valid!');
	}
