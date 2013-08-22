/*
	author: Kyrylo Buzykin (kbuzykin@gmail.com)
	year: 2013
	specially for Script'n'Code by SoftServe Inc.
*/

// inheritance
var __extends = function (Child, Parent) {
    for (var key in Parent) if (Parent.hasOwnProperty(key)) Child[key] = Parent[key];
    function Surrogate() { this.constructor = Child; };
    Surrogate.prototype = Parent.prototype;
    Child.prototype = new Surrogate();
    Child._super = Parent.prototype;
};


/*
	Creational
*/
console.log(">>>>>>> CREATIONAL PATTERNS");

// 1) Singleton
console.log("/* Singleton */");
var SoftServeCompany = (function () {
	var self;
	function constructor() {
		
	}
	function SoftServeCompany () {
		if (!self) {
			constructor.call(this);
			self = this;
		}
		return self;
	};
	SoftServeCompany.prototype.createStategicBusinessUnit = function () {};
	return SoftServeCompany;
})();

var company1 = new SoftServeCompany();
var company2 = new SoftServeCompany();
console.log(company1);
console.log(company1 === company2);

// 2) Prototype
console.log("\n/* Prototype */");
var JetLab = (function () {
	function JetLab () {
		this.name = "JetLab";
	}
	JetLab.prototype.hirePeople = function () {
		console.log("People are hired for project needs.");
	},
	JetLab.prototype.startProject = function () {
		console.log("Project has been started. Client is happy.");
	},
	JetLab.prototype.introduce = function () {
		console.log(this.name);
	}
	return JetLab;
})();

var JaNet = (function (_super) {
	__extends(JaNet, _super);
	function JaNet () {
		this.name = "JaNet";
	}
	return JaNet;
})(JetLab);
var jN = new JaNet();
console.log(jN);
jN.introduce();
jN.hirePeople();
jN.startProject();

// 2.1) Prototype
console.log("\n/* Prototype */");
var JetLab = {
	name: "JetLab",
	hirePeople: function () {
		console.log("People are hired for project needs.");
	},
	startProject: function () {
		console.log("Project has been started. Client is happy.");
	},
	introduce: function () {
		console.log(this.name);
	}
};
var JaNet = Object.create(JetLab, {
	name: {
		value: "JaNet"
	}
});
console.log(JaNet);
JaNet.introduce();
JaNet.hirePeople();
JaNet.startProject();

// 3) Factory Method
console.log("\n/* Factory Method */");
var Student = (function () {
	function Student () {
		this.name = arguments[0].name;
		this.direction = arguments[0].direction;
	}
	return Student;
})();
var Developer = (function (_super) {
	__extends(Developer, _super);
	function Developer () {
		_super.apply(this, arguments);
		this.skills = ["development", "bugfixing"];
	}
	Developer.prototype.develop = function () {
		console.log("Scope has been developed.");
	}
	Developer.prototype.fixBugs = function () {
		console.log("Bug fixing is in progress.");
	}
	return Developer;
})(Student);
var QC = (function (_super) {
	__extends(QC, _super);
	function QC () {
		_super.apply(this, arguments);
		this.skills = ["writing test cases", "testing"];
	}
	QC.prototype.writeTestCase = function () {
		console.log("Test has been written.");
	}
	QC.prototype.test = function () {
		console.log("Testing is in progress.");
	}
	return QC;
})(Student);
var ITAcademy = (function () {
    function ITAcademy (){};
    ITAcademy.prototype.graduateStudent = function () {};
    return ITAcademy;
})();
var ITAcademyDeveloperGroup = (function (_super) {
	__extends(ITAcademyDeveloperGroup, _super);
	function ITAcademyDeveloperGroup () {}
    ITAcademyDeveloperGroup.prototype.graduateStudent = function () {
    	return new Developer(arguments[0]);
    };
	return ITAcademyDeveloperGroup;
})(ITAcademy);
var ITAcademyQCGroup = (function (_super) {
	__extends(ITAcademyQCGroup, _super);
	function ITAcademyQCGroup () {}
    ITAcademyQCGroup.prototype.graduateStudent = function () {
    	return new QC(arguments[0]);
    };
	return ITAcademyQCGroup;
})(ITAcademy);

var groupDev = new ITAcademyDeveloperGroup();
var groupQC = new ITAcademyQCGroup();

var dev = groupDev.graduateStudent({
	name: "Vasya",
	direction: "UI"
});
console.log(dev);

// 4) Abstract Factory
console.log("\n/* Abstract Factory */");
var Student = (function () {
	function Student () {
		this.name = arguments[0].name;
		this.direction = arguments[0].direction;
	}
	return Student;
})();
var DeveloperAbstract = (function (_super) {
	__extends(DeveloperAbstract, _super);
	function DeveloperAbstract () {
		_super.apply(this, arguments);
		this.skills = ["development", "bugfixing"];
	}
	DeveloperAbstract.prototype.develop = function () {
		
	}
	DeveloperAbstract.prototype.fixBugs = function () {
		
	}
	return DeveloperAbstract;
})(Student);
var QCAbstract = (function (_super) {
	__extends(QCAbstract, _super);
	function QCAbstract () {
		_super.apply(this, arguments);
		this.skills = ["writing test cases", "testing"];
	}
	QCAbstract.prototype.writeTestCase = function () {

	}
	QCAbstract.prototype.test = function () {

	}
	return QCAbstract;
})(Student);
var Developer = (function (_super) {
	__extends(Developer, _super);
	function Developer () {
		_super.apply(this, arguments);
	}
	Developer.prototype.develop = function () {
		console.log("Scope has been developed.");
	}
	Developer.prototype.fixBugs = function () {
		console.log("Bug fixing is in progress.");
	}
	return Developer;
})(DeveloperAbstract);
var QC = (function (_super) {
	__extends(QC, _super);
	function QC () {
		_super.apply(this, arguments);
	}
	QC.prototype.writeTestCase = function () {
		console.log("Test has been written.");
	}
	QC.prototype.test = function () {
		console.log("Testing is in progress.");
	}
	return QC;
})(QCAbstract);
var ITAcademyAbstract = (function () {
    function ITAcademyAbstract () {};
    ITAcademyAbstract.prototype.graduateDeveloper = function () {};
    ITAcademyAbstract.prototype.graduateQC = function () {};
    return ITAcademyAbstract;
})();
var ITAcademy = (function (_super) {
	__extends(ITAcademy, _super);
    function ITAcademy () {};
    ITAcademy.prototype.graduateDeveloper = function () {
    	return new Developer(arguments[0]);
    };
    ITAcademy.prototype.graduateQC = function () {
    	return new QC();
    };
    return ITAcademy;
})(ITAcademyAbstract);

var dev = new ITAcademy().graduateDeveloper({
	name: "Vasya",
	direction: "UI"
});
console.log(dev);

// 4.1) Factory
console.log("\n/* Factory */");
var Student = (function () {
	function Student () {
		this.name = arguments[0].name;
		this.direction = arguments[0].direction;
	}
	return Student;
})();
var Developer = (function (_super) {
	__extends(Developer, _super);
	function Developer () {
		_super.apply(this, arguments);
		this.skills = ["development", "bugfixing"];
	}
	Developer.prototype.develop = function () {
		console.log("Scope has been developed.");
	}
	Developer.prototype.fixBugs = function () {
		console.log("Bug fixing is in progress.");
	}
	return Developer;
})(Student);
var QC = (function (_super) {
	__extends(QC, _super);
	function QC () {
		_super.apply(this, arguments);
		this.skills = ["writing test cases", "testing"];
	}
	QC.prototype.writeTestCase = function () {
		console.log("Test has been written.");
	}
	QC.prototype.test = function () {
		console.log("Testing is in progress.");
	}
	return QC;
})(Student);
var ITAcademy = (function () {
    function ITAcademy () {};
    ITAcademy.prototype.graduateDeveloper = function () {
    	return new Developer(arguments[0]);
    };
    ITAcademy.prototype.graduateQC = function () {
    	return new QC(arguments[0]);
    };
    return ITAcademy;
})();

var dev = new ITAcademy().graduateDeveloper({
	name: "Vasya",
	direction: "UI"
});
console.log(dev);

// 5) Builder
console.log("\n/* Builder */");
var Student = (function () {
	function Student () {
		this.skill;
	}
	Student.prototype.coding = function () {
		console.log("Coding on " + this.skill);
	}
	Student.prototype.setSkill = function (_skill) {
		this.skill = _skill;
	}
	return Student;
})();
var Group = (function () {
	function Group () {
		this.student;
	}
	Group.prototype.employStudent = function () {
		return this.student;
	}
	Group.prototype.graduateNewStudent = function () {
        this.student = new Student();
	}
	Group.prototype.giveSkill = function () {}
	return Group;
})();
var JavaGroup = (function (_super) {
	__extends(JavaGroup, _super);
	function JavaGroup () {
		_super.apply(this, arguments);
	}
	JavaGroup.prototype.giveSkill = function () {
		this.student.setSkill("Java");
	}
	return JavaGroup;
})(Group);
var UIGroup = (function (_super) {
	__extends(UIGroup, _super);
	function UIGroup () {
		_super.apply(this, arguments);
	}
	UIGroup.prototype.giveSkill = function () {
		this.student.setSkill("JavaScript");
	}
	return UIGroup;
})(Group);
var ITAcademy = (function () {
	function ITAcademy () {
		this.group;
	}
	ITAcademy.prototype.setGroup = function (_group) {
		this.group = _group;
	}
	ITAcademy.prototype.graduateStudent = function () {
		return this.group.employStudent();
	}
	ITAcademy.prototype.teachStudent = function () {
		this.group.graduateNewStudent();
		this.group.giveSkill();
	}
	return ITAcademy;
})();
var SoftServeAcademy = new ITAcademy(),
	ui_group = new UIGroup(),
	dev;
SoftServeAcademy.setGroup(ui_group);
SoftServeAcademy.teachStudent();
dev = SoftServeAcademy.graduateStudent();
dev.coding();

/*
	Structural
*/
console.log("\n\n>>>>>>> STRUCTURAL PATTERNS");
// 6) Decorator
console.log("/* Decorator */");
var QC = (function () {
	function QC (name) {
		this.name = name;
	}
	QC.prototype.test = function () {
		return 0;
	}
	return QC;
})();
var ExploratoryTestingDecorator = (function () {
	function ExploratoryTestingDecorator (tester) {
		this.tester = tester;
	}
	ExploratoryTestingDecorator.prototype.test = function () {
		return this.tester.test() + 30;
	}
	return ExploratoryTestingDecorator;
})();
var FunctionalTestingDecorator = (function (){
	function FunctionalTestingDecorator (tester) {
		this.tester = tester;
	}
	FunctionalTestingDecorator.prototype.test = function () {
		return this.tester.test() + 60;
	}
	return FunctionalTestingDecorator;
})();
var RegressionTestingDecorator = (function (){
	function RegressionTestingDecorator (tester) {
		this.tester = tester;
	}
	RegressionTestingDecorator.prototype.test = function () {
		return this.tester.test() + 5;
	}
	return RegressionTestingDecorator;
})();
var AcceptanceTestingDecorator = (function (){
	function AcceptanceTestingDecorator (tester) {
		this.tester = tester;
	}
	AcceptanceTestingDecorator.prototype.test = function () {
		return this.tester.test() + 5;
	}
	return AcceptanceTestingDecorator;
})();
var someQC = new QC("Vasya");
console.log(someQC);
var bugScope = 100,
	coveredScope = new AcceptanceTestingDecorator ( 
		new RegressionTestingDecorator ( 
			new FunctionalTestingDecorator ( 
				new ExploratoryTestingDecorator(someQC)  
			) 
		) 
	).test(),
	missedBugs = bugScope - coveredScope;
console.log(missedBugs);

// 7) Facade
console.log("\n/* Facade */");
var Developer = (function () {
	function Developer () {}
	Developer.prototype.develop = function (_requirements) {
		if (_requirements) {
			console.log("Functional, based on iteration scope, is provided.");
			return true;
		}
	}
	return Developer;
})();
var QC = (function () {
	function QC () {}
	QC.prototype.test = function (_functional, _requirements) {
		if (_functional === _requirements) {
			console.log("Scope is implemented properly.");
			return true;
		}
	}
	return QC;
})();
var BA = (function () {
	function BA () {};
	BA.prototype.getRequirements = function () {
		console.log("Requirements for iteration are provided.");
		return true;
	}
	BA.prototype.acceptIteration = function (_product) {
		if (_product) {
			console.log("Iteration is succeeded.");
		} else {
			console.log("Iteration has been failed.")
		}
	}
	return BA;
})();
var PM = (function () {
	function PM() {
		this.developer = new Developer();
		this.qc = new QC();
		this.ba = new BA();
	}
	PM.prototype.achieveGoal = function () {
		var requirements = this.ba.getRequirements(),
			functional = this.developer.develop(requirements),
			product = this.qc.test(functional, requirements);
			this.ba.acceptIteration(product);
	}
	return PM;
})();
var scrumTeam = new PM();
scrumTeam.achieveGoal();

// 8) Adapter
console.log("\n/* Adapter */");
var TestAutomation = (function () {
	function TestAutomation () {
		this.technology = "Java";
	}
	TestAutomation.prototype.writeTest = function () {
		return "Tests on " + this.technology + " are implemented.";
	}
	return TestAutomation;
})();
var dotNetAdapter = (function () {
	function dotNetAdapter (context) {
		this.technology = ".Net";
		this.context = context;
	}
	dotNetAdapter.prototype.writeOnDotNet = function () {
		console.log(this.context.writeTest.call(this));
	}
	return dotNetAdapter;
})();

var automator = new TestAutomation();
var dotNetAutomator = new dotNetAdapter(automator);
dotNetAutomator.writeOnDotNet();

// 9) Bridge
console.log("\n/* Bridge */");
var ApplicationTesting = (function () {
	function ApplicationTesting () {}
	ApplicationTesting.prototype.ExploratoryTesting = function () {
		console.log("Exploratory Testing is done.");
	}
	ApplicationTesting.prototype.FunctionalTesting = function () {
		console.log("Functional Testing is done.");
	}
	ApplicationTesting.prototype.RegressionTesting = function () {
		console.log("Regression Testing is done.");
	}
	ApplicationTesting.prototype.AcceptanceTesting = function () {
		console.log("Acceptance Testing is done.");
	}
	return ApplicationTesting;
})();
var QC = (function () {
	function QC (_applicationTesting) {
		this.testing = _applicationTesting;
	}
	QC.prototype.clickRandomlyToEveryWhere = function () {
		this.testing.ExploratoryTesting();
	}
	QC.prototype.goThroughTestCases = function () {
		this.testing.FunctionalTesting();
	}
	QC.prototype.testAllFunctional = function () {
		this.testing.RegressionTesting();
	}
	QC.prototype.talkToBA = function () {
		this.testing.AcceptanceTesting();
	}
	return QC;
})();
var vasyaQC = new QC (new ApplicationTesting ());
vasyaQC.clickRandomlyToEveryWhere();
vasyaQC.goThroughTestCases();
vasyaQC.testAllFunctional();
vasyaQC.talkToBA();

// 10) Proxy
console.log("\n/* Proxy */");
var juniorQC = (function () {
	function juniorQC () {}
	juniorQC.prototype.writeTestCase = function () {
		console.log("Test cases are written.");
	}
	juniorQC.prototype.test = function () {
		console.log("Implementation is tested.");
	}
	juniorQC.prototype.clarifyRequirements = function () {
		console.log("Requirements are clarified.");
	}
	return juniorQC;
})();
var seniorQC = (function () {
	function seniorQC () {
		this.pupil = new juniorQC();
	}
	seniorQC.prototype.writeTestCase = function () {
		if (this.pupil) {
			this.pupil.writeTestCase();
		}
	}
	seniorQC.prototype.test = function () {
		this.pupil.test();
	}
	seniorQC.prototype.clarifyRequirements = function () {
		console.log("Talk to BA.");
		this.pupil.clarifyRequirements();
	}
	return seniorQC;
})();
var mentor = new seniorQC();
mentor.clarifyRequirements();
mentor.writeTestCase();
mentor.test();

// 11) Composite
console.log("\n/* Composite */");
var Fellow = (function () {
	function Fellow (_name) {
		this.name = _name;
	}
	Fellow.prototype.getFellowship = function () {}
	Fellow.prototype.add = function (child) {
		var tmp;
		if (tmp = this.getFellowship()) {
			tmp.children.push(child);
		}
		return this;
	}
	Fellow.prototype.remove = function (child) {
		if (tmp = this.getFellowship()) {
	        for (var i = 0; i < tmp.children.length; i++) {
	            if (tmp.children[i] === child) {
	                tmp.children.splice(i, 1);
	            }
	        }
			
		}
		return this;
	}
	return Fellow;
})();
var Fellowship = (function (_super) {
	__extends(Fellowship, _super);
	function Fellowship () {
		_super.apply(this, arguments);
		this.children = [];
	}
	Fellowship.prototype.getFellowship = function () {
		return this;
	}
	return Fellowship;
})(Fellow);
var dev = new Fellow ("Developer"),
	qc = new Fellow ("QC"),
	sbuManager = new Fellow ("SBU Manager"),
	vPresident = new Fellow ("Vice-President"),
	president = new Fellow ("President"),

	team = new Fellowship ("Team"),
	sbu = new Fellowship ("SBU"),
	solutionGroup = new Fellowship ("Solution group"),
	ss = new Fellowship ("SoftServe");

ss.add(president).add(
	solutionGroup.add(vPresident).add(
		sbu.add(sbuManager).add(
			team.add(dev).add(qc)
		)
	)
);
console.log(ss);

// 12) Flyweight
console.log("\n/* Flyweight */");
// FlyweightFactory
var SDO = (function () {
	function SDO () {
		this.candidates = {};
	}
	SDO.prototype.getDeveloper = function (tech) {
		if (!(tech in this.candidates)) {
			switch (tech) {
				case 'Java': this.candidates[tech] = new ConcreteDeveloperJuniorJava1(); break;
				case '.Net': this.candidates[tech] = new ConcreteDeveloperSeniorDotNet5(); break;
				case 'UI': this.candidates[tech] = new ConcreteDeveloperIntermediateUI2(); break;
			}
		}
		return this.candidates[tech];
	}
	return SDO;
})();
// Flyweight
var AbstractlDeveloper = (function () {
	function AbstractlDeveloper () {
		this.technology;
		this.position;
		this.experience;
	}
	AbstractlDeveloper.prototype.interview = function () {
		console.log("Developing on " + this.technology + " for " + this.experience + " years. Has " + this.position + " position.");
	}
	return AbstractlDeveloper;
})();
// ConcreteFlyweight
var ConcreteDeveloperJuniorJava1 = (function (_super) {
	__extends(ConcreteDeveloperJuniorJava1, _super);
	function ConcreteDeveloperJuniorJava1 () {
		_super.apply(this, arguments);
		this.technology = "Java";
		this.position = "Junior";
		this.experience = 1;
	}
	return ConcreteDeveloperJuniorJava1;
})(AbstractlDeveloper);
// ConcreteFlyweight
var ConcreteDeveloperSeniorDotNet5 = (function (_super) {
	__extends(ConcreteDeveloperSeniorDotNet5, _super);
	function ConcreteDeveloperSeniorDotNet5 () {
		_super.apply(this, arguments);
		this.technology = ".Net";
		this.position = "Senior";
		this.experience = 5;
	}
	return ConcreteDeveloperSeniorDotNet5;
})(AbstractlDeveloper);
// ConcreteFlyweight
var ConcreteDeveloperIntermediateUI2 = (function (_super) {
	__extends(ConcreteDeveloperIntermediateUI2, _super);
	function ConcreteDeveloperIntermediateUI2 () {
		_super.apply(this, arguments);
		this.technology = "UI";
		this.position = "Intermediate";
		this.experience = 2;
	}
	return ConcreteDeveloperIntermediateUI2;
})(AbstractlDeveloper);

var hr = new SDO(),
	interview,
	project_needs = ["UI", "Java"];
for (var i = 0; i < project_needs.length; i++) {
	interview = hr.getDeveloper(project_needs[i]);
	interview.interview();
}

/*
	Behavioral
*/
console.log("\n\n>>>>>>> BEHAVIORAL PATTERNS");
// 13) Strategy
console.log("\n/* Strategy */");
// Strategy
var Trainee = (function () {
	function Trainee () {}
	Trainee.prototype.work = function () {}
	return Trainee;
})();
// ConcreteStrategy
var DeveloperTrainee = (function (_super) {
	__extends(DeveloperTrainee, _super);
	function DeveloperTrainee () {
		_super.apply(this, arguments);
	}
	DeveloperTrainee.prototype.work = function () {
		console.log("Starting developing");
	}
	return DeveloperTrainee;
})(Trainee);
var QCTrainee = (function (_super) {
	__extends(QCTrainee, _super);
	function QCTrainee () {
		_super.apply(this, arguments);
	}
	QCTrainee.prototype.work = function () {
		console.log("Starting testing");
	}
	return QCTrainee;
})(Trainee);
// Context
var ITAcademy = (function () {
	function ITAcademy (_trainee) {
		this.strategy = _trainee;
	}
	ITAcademy.prototype.graduate = function () {
		this.strategy.work();
	}
	return ITAcademy;
})();
var someTrainee = new ITAcademy(new QCTrainee());
someTrainee.graduate();

// 14) Chain of responsibility
console.log("\n/* Chain of responsibility */");
var ResponsiblePerson = (function () {
	function ResponsiblePerson (_seniority) {
		this.seniority = _seniority;
		this.next;
	}
	ResponsiblePerson.prototype.approve = function (_subject, _priority) {
		if (_priority >= this.seniority) {
			this.announceResult(_subject);
		} 
		if (typeof this.next !== 'undefined') {
			this.next.approve(_subject, _priority);
		}
	}
	ResponsiblePerson.prototype.announceResult = function () {}
	ResponsiblePerson.prototype.setNext = function (_responsiblePerson) {
		this.next = _responsiblePerson;
		return _responsiblePerson;
	}
	return ResponsiblePerson;
})();
var TeamLead = (function (_super) {
	__extends(TeamLead, _super);
	function TeamLead () {
		_super.apply(this, arguments);
	}
	TeamLead.prototype.announceResult = function (_subject) {
		console.log(_subject + " is approved by Team Lead.");
	}
	return TeamLead;
})(ResponsiblePerson);
var PM = (function (_super) {
	__extends(PM, _super);
	function PM () {
		_super.apply(this, arguments);
	}
	PM.prototype.announceResult = function (_subject) {
		console.log(_subject + " is approved by Project Manager.");
	}
	return PM;
})(ResponsiblePerson);
var SBU = (function (_super) {
	__extends(SBU, _super);
	function SBU () {
		_super.apply(this, arguments);
	}
	SBU.prototype.announceResult = function (_subject) {
		console.log(_subject + " is approved by SBU Project Manager.");
	}
	return SBU;
})(ResponsiblePerson);
var appropriatePerson = new TeamLead(1);
var appropriatePerson1 = appropriatePerson.setNext(new PM(2));
var appropriatePerson2 = appropriatePerson1.setNext(new SBU(3));

appropriatePerson.approve("Task", 1);
appropriatePerson.approve("Day off", 2);
appropriatePerson.approve("Vacation", 3);

// 15) State
console.log("\n/* State */");
var Developer = (function () {
	function Developer () {}
	Developer.prototype.implementScope = function () {}
	Developer.prototype.fixBugs = function () {}
	Developer.prototype.reviewCode = function () {}
	return Developer;
})();
var JuniorDeveloper = (function (_super) {
	__extends(JuniorDeveloper, _super);
	function JuniorDeveloper () {}
	JuniorDeveloper.prototype.implementScope = function () {
		console.log("50% of scope has been implemented properly.");
	}
	JuniorDeveloper.prototype.fixBugs = function () {
		console.log("5 bugs have been resolved.");
	}
	JuniorDeveloper.prototype.reviewCode = function () {
		console.log ("5 bugs have been missed.");
	}
	return JuniorDeveloper;
})(Developer);
var IntermediateDeveloper = (function (_super) {
	__extends(IntermediateDeveloper, _super);
	function IntermediateDeveloper () {}
	IntermediateDeveloper.prototype.implementScope = function () {
		console.log("75% of scope has been implemented properly.");
	}
	IntermediateDeveloper.prototype.fixBugs = function () {
		console.log("7 bugs have been resolved");
	}
	IntermediateDeveloper.prototype.reviewCode = function () {
		console.log ("3 bugs have been missed.");
	}
	return IntermediateDeveloper;
})(Developer);
var SeniorDeveloper = (function (_super) {
	__extends(SeniorDeveloper, _super);
	function SeniorDeveloper () {}
	SeniorDeveloper.prototype.implementScope = function () {
		console.log("100% of scope has been implemented properly.");
	}
	SeniorDeveloper.prototype.fixBugs = function () {
		console.log("10 bugs have been resolved");
	}
	SeniorDeveloper.prototype.reviewCode = function () {
		console.log ("1 bugs have been missed.");
	}
	return SeniorDeveloper;
})(Developer);

var Developing = (function () {
	function Developing () {
		this.developer = new JuniorDeveloper();
	}
	Developing.prototype.implementScope = function () {
		this.developer.implementScope();
	}
	Developing.prototype.fixBugs = function () {
		this.developer.fixBugs();
	}
	Developing.prototype.reviewCode = function () {
		this.developer.reviewCode();
	}
	Developing.prototype.promote = function () {
		if (this.developer instanceof JuniorDeveloper) {
			this.developer = new IntermediateDeveloper();
		} else if (this.developer instanceof IntermediateDeveloper) {
			this.developer = new SeniorDeveloper();
		}
	}
	return Developing;
})();
var work = new Developing();
work.implementScope();
work.fixBugs();
work.reviewCode();
work.promote();
work.implementScope();
work.fixBugs();
work.reviewCode();
work.promote();
work.implementScope();
work.fixBugs();
work.reviewCode();

// 16) Iterator
console.log("\n/* Iterator */");
// Agregator
var PM = (function () {
	function PM () {}
	PM.prototype.createTeam = function () {}
	return PM;
})();
// Iterator
var TeamIterator = (function () {
	function TeamIterator () {}
	TeamIterator.prototype.hasNext = function () {}
	TeamIterator.prototype.next = function () {}
	TeamIterator.prototype.remove = function () {}
	return TeamIterator;
})();
// ConcreteAggregate
var TeamPM = (function (_super) {
	__extends(TeamPM, _super);
	function TeamPM () {
		this.teammates = [];
	}
	TeamPM.prototype.setTeamMates = function (_teammates) {
		this.teammates = _teammates;
	}
	TeamPM.prototype.createTeam = function () {
		return new ConcreteTeam(this.teammates);
	}
	return TeamPM;
})(PM);
// ConcreteIterator
var ConcreteTeam = (function (_super) {
	__extends(ConcreteTeam, _super);
	function ConcreteTeam (_teammates) {
		this.teammates = _teammates;
		this.position = 0;
	}
	TeamIterator.prototype.hasNext = function () {
		 return !(this.position >= this.teammates.length || this.teammates.length === 0);
	}
	TeamIterator.prototype.next = function () {
		return this.teammates[this.position++];
	}
	TeamIterator.prototype.remove = function () {}
	return ConcreteTeam;
})(TeamIterator);
var Project = (function () {
	function Project (_teamPM1, _teamPM2) {
		this.teamPM1 = _teamPM1;
		this.teamPM2 = _teamPM2;
	}
	Project.prototype.reviewTeams = function () {
		this.team1 = this.teamPM1.createTeam();
		this.team2 = this.teamPM2.createTeam();
		console.log(">>First team:");
		this.reviewTeamMates(this.team1);
		console.log(">>Second team:");
		this.reviewTeamMates(this.team2);
	}
	Project.prototype.reviewTeamMates = function (team) {
		while (team.hasNext()) {
			console.log(team.next());
		}
	}
	return Project;
})();
var people1 = ["Valera", "Anton"],
	people2 = ["Vasya", "Kolya", "Artem"],
	team1 = new TeamPM(),
	team2 = new TeamPM();
team1.setTeamMates(people1);
team2.setTeamMates(people2);
project = new Project(
	team1,
	team2
);
project.reviewTeams();

// 17) Command
console.log("\n/* Command */");
// Command
var Team = (function () {
	function Team (_action) {
		this.action = _action;
	}
	Team.prototype.execute = function () {}
	return Team;
})();
// ConcreteCommand
var DevTeam = (function (_super) {
	__extends(DevTeam, _super);
	function DevTeam () {
		_super.apply(this, arguments);
	}
	DevTeam.prototype.execute = function () {
		this.action.develop();
	}
	return DevTeam;
})(Team);
var UXTeam = (function (_super) {
	__extends(UXTeam, _super);
	function UXTeam () {
		_super.apply(this, arguments);
	}
	UXTeam.prototype.execute = function () {
		this.action.design();
	}
	return UXTeam;
})(Team);
// Invoker
var BA = (function () {
	function BA (_dev, _ux) {
		this.dev = _dev;
		this.ux = _ux;
	}
	BA.prototype.getDesign = function () {
		this.ux.execute();
	}
	BA.prototype.getProgramm = function () {
		this.dev.execute();
	}
	return BA;
})();
// Receiver
var Work = (function () {
	function Work () {}
	Work.prototype.design = function () {
		console.log("Application is under design.");
	}
	Work.prototype.develop = function () {
		console.log("Application is under development.");
	}
	return Work;
})();
var workProcess = new Work(),
	drawing = new UXTeam(workProcess),
	developing = new DevTeam(workProcess),
	ba = new BA(developing, drawing);
ba.getDesign();
ba.getProgramm();
	
// 18) Interpreter
console.log("\n/* Interpreter */");
// Expression
var Task = (function () {
	function Task () {}
	Task.prototype.interpret = function (_scope) {}
	return Task;
})();
var AnalysisTask = (function (_super) {
	__extends(AnalysisTask, _super);
	function AnalysisTask () {}
	AnalysisTask.prototype.interpret = function (_scope) {
		return "Added task for analysing '" + _scope + "'";
	}
	return AnalysisTask;
})(Task);
var ImplementTask = (function (_super) {
	__extends(ImplementTask, _super);
	function ImplementTask () {}
	ImplementTask.prototype.interpret = function (_scope) {
		return "Added task for implementing of '" + _scope + "'";
	}
	return ImplementTask;
})(Task);
var UnitTestTask = (function (_super) {
	__extends(UnitTestTask, _super);
	function UnitTestTask () {}
	UnitTestTask.prototype.interpret = function (_scope) {
		return "Added task for creating Unit Tests for task '" + _scope + "'";
	}
	return UnitTestTask;
})(Task);
var ReviewTask = (function (_super) {
	__extends(ReviewTask, _super);
	function ReviewTask () {}
	ReviewTask.prototype.interpret = function (_scope) {
		return "Added task for Code Review for task '" + _scope + "'";
	}
	return ReviewTask;
})(Task);
var TestTask = (function (_super) {
	__extends(TestTask, _super);
	function TestTask () {}
	TestTask.prototype.interpret = function (_scope) {
		return "Added task for testing '" + _scope + "'";
	}
	return TestTask;
})(Task);
var Estimation = (function (_super) {
	__extends(Estimation, _super);
	function Estimation (_scope) {
		this.action = _scope.split(" ")[0];
		this.task = _scope.split(" ").slice(1).join(" ");
		this.result;
		switch (this.action) {
			case "implement":
				this.result = (new ImplementTask()).interpret(this.task); break;
			case "analyse":
				this.result = (new AnalysisTask()).interpret(this.task); break;
			case "review":
				this.result = (new ReviewTask()).interpret(this.task); break;
			case "test":
				this.result = (new TestTask()).interpret(this.task); break;
			case "unittests":
				this.result = (new UnitTestTask()).interpret(this.task); break;
			default:
				this.result = "Please check your syntax";
		}
	}
	Estimation.prototype.interpret = function () {
		console.log(this.result);
	}
	return Estimation;
})(Task);

var scope = "implement login form";
var implementation = new Estimation(scope);
implementation.interpret();

// 19) Mediator
console.log("\n/* Mediator */");
// Mediator
var PM = (function () {
	function PM (_mediator) {}
	PM.prototype.send = function (_message, _colleague) {}
	return PM;
})();
// ConcreteMediator
var TeamPM = (function (_super) {
	__extends(TeamPM, _super);
	function TeamPM () {
		_super.apply(this, arguments);
		this.colleagues = {};
	}
	TeamPM.prototype.setBA = function (_BA) {
		this.colleagues.ba = _BA;
	}
	TeamPM.prototype.setQC = function (_QC) {
		this.colleagues.qc = _QC;
	}
	TeamPM.prototype.setUX = function (_UX) {
		this.colleagues.ux = _UX;
	}
	TeamPM.prototype.setDev = function (_Dev) {
		this.colleagues.dev = _Dev;
	}
	TeamPM.prototype.send = function (_message) {
		console.log(this.name + " says: " + _message);
		for (key in this.mediator.colleagues) {
			if (this.mediator.colleagues[key].name !== this.name) {
				this.mediator.colleagues[key].notify(_message, this.name);
			}
		}
	}
	return TeamPM;
})(PM);
// Colleagues
var Colleague = (function () {
	function Colleague (_mediator) {
		this.mediator = _mediator;
	}
	Colleague.prototype.send = function (_msg) {
		this.mediator.send.call(this, _msg);
	}
	Colleague.prototype.notify = function (_msg, _colleague) {
		console.log(this.name + " gets message: '" + _msg + "' from " + _colleague);
	}
	return Colleague;
})();
var BA = (function (_super) {
	__extends(BA, _super);
	function BA () {
		_super.apply(this, arguments);
		this.name = "BA";
	}
	return BA;
})(Colleague);
var QC = (function (_super) {
	__extends(QC, _super);
	function QC () {
		_super.apply(this, arguments);
		this.name = "QC";
	}
	return QC;
})(Colleague);
var UX = (function (_super) {
	__extends(UX, _super);
	function UX () {
		_super.apply(this, arguments);
		this.name = "UX";
	}
	return UX;
})(Colleague);
var Dev = (function (_super) {
	__extends(Dev, _super);
	function Dev () {
		_super.apply(this, arguments);
		this.name = "Dev";
	}
	return Dev;
})(Colleague);

var teamPM = new TeamPM(),
	ba = new BA(teamPM),
	qc = new QC(teamPM),
	ux = new UX(teamPM),
	dev = new Dev(teamPM);
teamPM.setBA(ba);
teamPM.setQC(qc);
teamPM.setUX(ux);
teamPM.setDev(dev);
ba.send("Morning Team!");

// 20) Observer
console.log("\n/* Observer */");
var KnowledgeEvaluationCriteria = (function () {
	var self;
	function constructor () {
		this.wards = [];
	}
	function KnowledgeEvaluationCriteria () {
		if (!self) {
			constructor.call(this);
			self = this;
		}
		return self;
	}
	KnowledgeEvaluationCriteria.prototype.AttachToKnowledgeEvaluationCriteria = function (_dev) {
		this.wards.push(_dev);
	}
	KnowledgeEvaluationCriteria.prototype.getKnowledgeEvaluationCriteria = function () {
		return this.criteria;
	}
	KnowledgeEvaluationCriteria.prototype.setKnowledgeEvaluationCriteria = function (_criteria) {
		this.criteria = _criteria;
		this.notifyWards();
	}
	KnowledgeEvaluationCriteria.prototype.notifyWards = function () {
		for (key in this.wards) {
			this.wards[key].notify(this);
		}
	}
	return KnowledgeEvaluationCriteria;
})();
var Developer = (function () {
	function Developer (_name) {
		this.name = _name;
		(new KnowledgeEvaluationCriteria() ).AttachToKnowledgeEvaluationCriteria(this);
	}
	Developer.prototype.notify = function (_criteria) {
		if(_criteria instanceof KnowledgeEvaluationCriteria) {
			console.log("Career Plan for " + this.name + " has been updated.");
		}
	}
	return Developer;
})();

var criteria = new KnowledgeEvaluationCriteria(),
	dev1 = new Developer("Vasya"),
	dev2 = new Developer("Petya");
criteria.setKnowledgeEvaluationCriteria("something has been changed.");

// 21) Memento
console.log("\n/* Memento */");
// Memento
var SSE = (function () {
	function SSE (_info) {
		this.info = _info;
	}
	SSE.prototype.getState = function () {
		return this.info;
	}
	return SSE;
})();
// Caretaker
var ERMSpecialist = (function () {
	function ERMSpecialist () {
		this.sse
	}
	ERMSpecialist.prototype.getSSE = function () {
		return this.sse
	}
	ERMSpecialist.prototype.setSSE = function (_sse) {
		this.sse = _sse;
	}
	return ERMSpecialist;
})();
// Originator
var Employee = (function () {
	function Employee (_info) {
		this.info = _info;
	}
	Employee.prototype.getInfo = function () {
		return this.info;
	}
	Employee.prototype.setInfo = function (_info) {
		this.info = _info;
	}
	Employee.prototype.saveInfo = function () {
		return new SSE(this.info);
	}
	Employee.prototype.restoreInfo = function (_sse) {
		this.info = _sse.getState();
	}
	return Employee;
})();

var employee = new Employee(),
	erm = new ERMSpecialist();
employee.setInfo("developer");
console.log("That's " + employee.getInfo());
erm.setSSE(employee.saveInfo());
employee.setInfo("PM");
console.log("And now that's " + employee.getInfo());
employee.restoreInfo(erm.getSSE());
console.log("And now that's " + employee.getInfo() + " again");

// 22) Visitor
console.log("\n/* Visitor */");
var TeamVisitor = (function () {
	function TeamVisitor () {}
	TeamVisitor.prototype.visit = function (_teammate) {}
	return TeamVisitor;
})();
var TeamMate = (function () {
	function TeamMate(name) {
		this.name = name;
	};
	TeamMate.prototype.getName = function () {
		return this.name;
	}
	TeamMate.prototype.accept = function (_visitor) {
		_visitor.visit(this);
	}
	return TeamMate;
})();
var Dev = (function (_super) {
	__extends(Dev, _super);
	function Dev () {
		_super.apply(this, arguments);
	}
	return Dev;
})(TeamMate);
var QC = (function (_super) {
	__extends(QC, _super);
	function QC () {
		_super.apply(this, arguments);
	}
	return QC;
})(TeamMate);
var Team = (function (_super) {
	__extends(Team, _super);
	function Team () {
		_super.apply(this, arguments);
		this.teammates = new Array (
			new Dev ("Vasya"),
			new Dev ("Petya"),
			new Dev ("Kolya"),
			new Dev ("Valera"),
			new Dev ("Anton"),
			new QC ("Masha"),
			new QC ("Natasha")
		);
	}
	Team.prototype.accept = function (_visitor) {
		for (key in this.teammates) {
			this.teammates[key].accept(_visitor);
		}
		_visitor.visit(this);
	}
	return Team;
})(TeamMate);
var TeamPlanningVisitor = (function (_super) {
	__extends(TeamPlanningVisitor, _super);
	function TeamPlanningVisitor () {
		_super.apply(this, arguments);
	}
	TeamPlanningVisitor.prototype.visit = function (_teammate) {
		console.log(_teammate.name + " visits Planning meeting");
	}
	return TeamPlanningVisitor;
})(TeamVisitor);
var TeamDemoVisitor = (function (_super) {
	__extends(TeamDemoVisitor, _super);
	function TeamDemoVisitor () {
		_super.apply(this, arguments);
	}
	TeamDemoVisitor.prototype.visit = function (_teammate) {
		console.log(_teammate.name + " visits Demo meeting");
	}
	return TeamDemoVisitor;
})(TeamVisitor);

var team = new Team("Team");
team.accept(new TeamPlanningVisitor());
team.accept(new TeamDemoVisitor());

// 23) Template method
console.log("\n/* Template method */");
var SDLC = {
	SCRUM: "scrum", 
	KANBAN: "kanban"
}
var TeamAbstract = (function () {
	function TeamAbstract () {
		this.teamsize;
	}
	TeamAbstract.prototype.planIteration = function () {}
	TeamAbstract.prototype.startIteration = function () {}
	TeamAbstract.prototype.endIteration = function () {}
	TeamAbstract.prototype.setTeamSize = function () {}
	TeamAbstract.prototype.work = function (_teamsize) {
		this.setTeamSize(_teamsize);
		this.planIteration();
		this.startIteration();
		this.endIteration();
	}
	return TeamAbstract;
})();
var ScrumTeam = (function (_super) {
	__extends(ScrumTeam, _super);
	function ScrumTeam () {
		_super.apply(this, arguments);
	}
	ScrumTeam.prototype.planIteration = function () {
		console.log("Commiting on some scope at Planning meeting")
	}
	ScrumTeam.prototype.startIteration = function () {
		console.log("Start iteration");
	}
	ScrumTeam.prototype.endIteration = function () {
		console.log("Iteration went well");
	}
	return ScrumTeam;
})(TeamAbstract);
var KanbanTeam = (function (_super) {
	__extends(KanbanTeam, _super);
	function KanbanTeam () {
		_super.apply(this, arguments);
	}
	KanbanTeam.prototype.planIteration = function () {
		
	}
	KanbanTeam.prototype.startIteration = function () {
		console.log("Keep working");
	}
	KanbanTeam.prototype.endIteration = function () {
		console.log("Keep working");
	}
	return KanbanTeam;
})(TeamAbstract);
var team;
switch (SDLC.SCRUM) {
    case 'scrum' : 
        team = new ScrumTeam();  
        break;
    case 'kanban' : 
    	team = new KanbanTeam();  
        break;
}
team.work(7);