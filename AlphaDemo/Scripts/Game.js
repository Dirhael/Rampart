#pragma strict

static var fase1 : boolean = false;
static var fase2 : boolean = false;
static var fase3 : boolean = false;
private var phaseone : Fase1 = null;
private var phasetwo : Fase2 = null;

function Start () {
	
}

function Update () {

	if(!fase1){	
		phaseone = GetComponentInChildren(Fase1);
		if(phaseone == null)	
			phaseone = gameObject.AddComponent(Fase1);
		phaseone.enabled = true;
	}else if(!fase2){
		phaseone.enabled = false;
		phasetwo = GetComponentInChildren(Fase2);
		if(phasetwo == null)	
			phasetwo = gameObject.AddComponent(Fase2);
		phasetwo.enabled = true;
	}
	
}