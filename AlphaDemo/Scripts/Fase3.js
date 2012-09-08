
var enemy : Rigidbody;
private var wave : Transform;
var numberenemies : int;
var spawnPoint : Transform[];
var countDownSeconds : int;
private var nextSpawn : float = 0.0f;
private var spawnSec : float = 2f;

private var restSeconds : int = 1;
private var displaySeconds : int;
private var displayMinutes : int;
private var roundedRestSeconds : int;
private var remainingSeconds : int;	
private var battle : boolean = false;
private var ready : boolean =false;
private var spawned : int = 0;
var customskin : GUISkin;

function Start () {
	
	wave = GameObject.Find("BotWave").transform;	
	remainingSeconds = countDownSeconds;
		
}

function Update () {
	if(spawned <= numberenemies && Time.timeSinceLevelLoad >= nextSpawn && restSeconds > 0){
		var pos : Transform = spawnPoint[Random.Range(0, spawnPoint.length)];
		var bot : Rigidbody = Instantiate(enemy,pos.position,transform.rotation);
		bot.transform.parent = wave;
		spawned++;
		spawnTime();
	}
	if(restSeconds == 0){
		Application.LoadLevel("Fase 1");
	}
	
}
function spawnTime(){
	nextSpawn =  spawnSec + Time.timeSinceLevelLoad;
}

function OnGUI () {
    //make sure that your time is based on when this script was first called
    //instead of when your game started
    //es resta el temps (ni idea) del temps inicial
    
   	restSeconds = remainingSeconds - (Time.timeSinceLevelLoad);
   	//quan el comptador arriba a 0, seguira calculant valors negatius
   	//la funcio max selecciona el maxim entre 0 i el valor del temps
   	//per mantenir el comptador a 0 quan baixi a -1,-2,-3...
   	restSeconds = Mathf.Max(0,restSeconds);

	//display the timer
	roundedRestSeconds = Mathf.CeilToInt(restSeconds);
	//s'extreuen els segons i minuts del temps calculat
    displaySeconds = roundedRestSeconds % 60;
    displayMinutes = roundedRestSeconds / 60; 
	var text : String;
	//format del comptador
    text = String.Format ("Battle : {0:00}:{1:00}", displayMinutes, displaySeconds);
    //display messages or whatever here -->do stuff based on your timer
    //if (restSeconds == 10) {
    	//diferents missatges segons el temps que queda
        //GUI.Label (Rect (100, 10, 300, 40), "Ten Seconds Left!!");
    //}else 
    GUI.skin = customskin;
    GUI.Label (Rect (0,0,150,40), text);
    if(GUI.Button(new Rect(30, 30, 70, 70), "Quit")){
		GameObject.Destroy(GameObject.Find("TileArray"));
		GameObject.Destroy(GameObject.Find("Fortress"));
		GameObject.Destroy(GameObject.Find("CubesList"));
		GameObject.Destroy(GameObject.Find("TowersList"));
		GameObject.Destroy(GameObject.Find("BotWave"));			
		Application.LoadLevel("Menu");	    
    }
}