import Curriculum from "curriculum-js";

async function validate() {
	var curriculum = new Curriculum();
	var schema = await curriculum.loadContextFromFile(
		"curriculum-doelgroepteksten",
		"context.json"
	);
	await curriculum.loadContextFromFile(
    "curriculum-basis",
    "curriculum-basis/context.json"
  );
	await curriculum.loadContextFromFile(
    "curriculum-examenprogramma",
    "curriculum-examenprogramma/context.json"
  );
	await curriculum.loadContextFromFile(
    "curriculum-kerndoelen",
    "curriculum-kerndoelen/context.json"
  );
	await curriculum.loadContextFromFile(
    "curriculum-leerdoelenkaarten",
    "curriculum-leerdoelenkaarten/context.json"
  );
	await curriculum.loadContextFromFile(
    "curriculum-lpib",
    "curriculum-lpib/context.json"
  );
	await curriculum.loadContextFromFile(
    "curriculum-syllabus",
    "curriculum-syllabus/context.json"
  );
	try {
		await curriculum.validate(schema);
		console.log("Data is valid!");
	} catch (error) {
		error.validationErrors.forEach((error) => {
			console.log(error.instancePath + ": " + error.message);
		});
	}
}

validate();