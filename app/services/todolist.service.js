angular
    .module('todolistApp')
    .service('todolistService', todolistService);

function todolistService(){
	var self = this;
	var projects = [];
	self.getProjects = getProjects;
	self.addProject = addProject;
	self.getMissions = getMissions;
    self.addMission = addMission;
    self.deleteMission = deleteMission;
    self.editMission = editMission;
    self.updateCount = updateCount;

    var todolists = {
    	Assignment: [ 
			{text: 'Algorithm Problems', done: false},
			{text: 'Englist Test', done: false},
	    	{text: 'Resume', done: false}],
    	Shopping: [ 
			{text: 'Milk', done: false},
			{text: 'Eggs', done: false},
	    	{text: 'Soft Drink', done: false}],
    	Vacation: [ 
			{text: 'Singapore', done: false},
			{text: 'Tokyo', done: false},
			{text: 'Paris', done: false}]
    };

    for(var project in todolists){ 
		projects.push({ project: project, count: todolists[project].length}); 
	}

    function getMissions(project){ 
    	return todolists[project]; 
    };
    
    function getProjects(){ 
    	return projects; 
    };

    function addProject(project){  	
    	todolists[project] = [];
		projects.push({ project: project, count: 0});
    };
	
	function addMission(project, item){ 
		todolists[project].push(item); 
		self.updateCount(project);
	};
	
	function deleteMission(project, index){ 
		todolists[project].splice(index, 1); 
		self.updateCount(project);
	};
	
	function editMission(project, index, text){
    	todolists[project][index].text = text;
    };
	
	function updateCount(project){
		for(var i in projects){
			if(projects[i].project == project) projects[i].count = todolists[project].length;
		}
	};
};