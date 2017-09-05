angular
	.module('todolistApp')
	.controller('MainController', ['todolistService', todolistController]);

function todolistController(todolistService){
	var self = this;	
	self.selectedProject = {};
	self.selectedMission = {};
	self.missionTemplate = 'views/_missions.template.html';
	self.getProjects = getProjects;
	self.getProject = getProject;
	self.addProject = addProject;
	self.clickProject = clickProject;
	self.getMissions = getMissions;
	self.addMission = addMission;
	self.deleteMission = deleteMission;
	self.editMission = editMission;
	self.cancelMission = cancelMission;
	self.saveMission = saveMission;
	self.getTemplate = getTemplate;
	self.showMissionInput =showMissionInput;

	function getProjects(){ 
		return todolistService.getProjects(); 
	};

	function getProject(){
		if(Object.keys(self.selectedProject).length !== 0){
			return Object.keys(self.selectedProject)[0];
		}
	};

	function addProject($event){
		if($event.keyCode == 13 && self.newProject.text !== ''){
			todolistService.addProject( self.newProject.text );
			self.newProject.text = "";
		}
	};

	function clickProject(project){
		self.selectedProject = {};
		self.selectedProject[project] = todolistService.getMissions(project);
	};

	function getMissions(){
		if(Object.keys(self.selectedProject).length !== 0){
			var name = Object.keys(self.selectedProject)[0];
			return self.selectedProject[name];
		}
		return false;
	};
	
	function addMission($event){
    	if($event.keyCode == 13 && self.newMission.text !== ''){
    		todolistService.addMission( 
	    		self.getProject(), 
	    		{ text: self.newMission.text, done: false}
			);
			self.newMission.text = "";
		}
    };
		
    function deleteMission(index){
    	todolistService.deleteMission( self.getProject(), index );
    };

    function editMission(item){
    	self.selectedMission = angular.copy(item);
    	self.editMission.text = item.text;
    };

	function cancelMission(){
    	self.selectedMission = {};
    };

    function saveMission(index){
    	todolistService.editMission(self.getProject(), index, self.editMission.text);
    	self.selectedMission = {};
    };

    function getTemplate(item) {
	    if (item.text === self.selectedMission.text) return 'edit';
    	else return 'display';
	};

    function showMissionInput(){
		return (self.getProject()) ? true : false;
	};
};