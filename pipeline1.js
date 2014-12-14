
var markup="";
var userid=2;
var prospects=[];


function fillProspects(requestedData)
{

	markup ="<tr>"+
			"<td>"+
			"</td><td class='DIRweekCalendarHeaderCell'/>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>M</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>T</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>W</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>TH</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>F</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>S</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>S</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>M</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>T</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>W</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>TH</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>F</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>S</td>"+
			"<td class='DIRweekCalendarHeaderCellPipeline'>S</td>"+"</tr>";

			prospects=[];
			for(var i= 0; i< requestedData.length ;++i)
			{
				prospects[i]="";
			}
			for(var i= 0; i< requestedData.length ;++i)
			{
				prospects[i] = requestedData[i].num_prospect;
				markup +="<tr class='pipelineRow'>"+
						"<td class='editRow'><input type='button' class ='editButton' value='Edit' id='prospect"+requestedData[i].num_prospect+"'></input></td>"+
						"<td  id='DIRWeekCellPipelineTitle>"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellPipelineTitle'>"+requestedData[i].titre+"</td>"+

						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty1"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty2"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty3"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty4"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty5"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty6"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty7"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty8"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty9"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty10"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty11"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty12"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty13"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</div></td>"+
						"<td id='DIRweekCalendarCellPipeline>"+requestedData[i].num_prospect +"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellProspectCertainty14"+requestedData[i].num_prospect+"' class='DIRweekCalendarCellCertaintyBar'"+
							"</div>"+
						"</tr>";
				
			}
		document.getElementById("pipelineTable").innerHTML =markup;
		getPhasesForProspectById(userid,fillPhases,getError);
		showProspects();
}

function fillPhases(requestedData)
{	
	var fmond= getTheFirstMondayDate();
	var smond = getMondayDate();
	var sund = getSundayDate();
	var i =0;
	for(i=0; i<prospects.length;++i)
	{

		var j =1;
		var date1,date2;
		if(date1 =eval("requestedData.prospect"+prospects[i]+".phase1"))
			j=1;
		else 
			if(date1 =eval("requestedData.prospect"+prospects[i]+".phase2"))
				j=2;
			else
				if(date1 =eval("requestedData.prospect"+prospects[i]+".phase3"))
					j=3;
				else
					if (date1 =eval("requestedData.prospect"+prospects[i]+".phase4"))
						j=4;
					else
						j=5;
		while (j<=5)
		{
			if(date1 =eval("requestedData.prospect"+prospects[i]+".phase"+j)) {
				date1 = new Date(date1);
				var d = date1.getDay();
				var couleur = DIRphaseoColor(j);

				if( (date1.getTime() >= fmond.getTime()) && (date1.getTime()<smond.getTime()))
				{
					if(d==0) d=7;
					$("#DIRweekCalendarCellProspectCertainty"+d+prospects[i]).css({"background-color":couleur});

				}
				else
					if((date1.getTime() >=smond.getTime()) && (date1.getTime() <=sund.getTime()))
					{
						if(d==0) d=14;
						$("#DIRweekCalendarCellProspectCertainty"+(d+7-1)+prospects[i]).css({"background-color":couleur});
					}

				if(date2= eval("requestedData.prospect"+prospects[i]+".phase"+(j+1)))
				{
					date1 = new Date(date1.setDate(date1.getDate()+1 ));
					date2 = new Date(date2);
					date1.setHours(0);
					date1.setSeconds(0);
					date1.setMinutes(0);
					date1.setMilliseconds(0);
					date2.setHours(0);
					date2.setSeconds(0);
					date2.setMinutes(0);
					date2.setMilliseconds(0);

					if (date1.getTime() >= fmond.getTime() && date1.getTime() <=sund.getTime())
					{
						while(date1.getTime() < date2.getTime())
						{
							d = date1.getDay();
							
							if(date1.getTime() >=fmond.getTime() && date1.getTime() < smond.getTime())
							{
								if(d==0) d=7;
								$("#DIRweekCalendarCellProspectCertainty"+d+prospects[i]).css({"background-color":couleur});

							}
							
							else if(date1.getTime() >= smond.getTime() && date1.getTime() <=sund.getTime())
							{
								if(d==0) d=7;
								
								$("#DIRweekCalendarCellProspectCertainty"+(d+7-1)+prospects[i]).css({"background-color":couleur});

							}
							date1 = new Date(date1.setDate(date1.getDate()+1));
							date1.setHours(0);
							date1.setMinutes(0);
							date1.setSeconds(0);
							date1.setMilliseconds(0);
						}

					}
				}
			}
			j++;
		}

		var datedebut=eval("requestedData.prospect"+prospects[i]+".date_debut");
		datedebut = new Date(datedebut);
		var datefin=eval("requestedData.prospect"+prospects[i]+".date_fin");
		datefin = new Date(datefin);
		datedebut.setHours(0);
		datedebut.setMinutes(0);
		datedebut.setSeconds(0);
		datedebut.setMilliseconds(0);

		datefin.setHours(0);
		datefin.setMinutes(0);
		datefin.setSeconds(0);
		datefin.setMilliseconds(0);

		if(datedebut.getTime() >= fmond.getTime() && datedebut.getTime() <=sund.getTime())
		{
					var d = datedebut.getDay();

					if(datedebut.getTime() >=fmond.getTime() && datedebut.getTime() <smond.getTime()){
						if (d==0) d=7;
						$("#DIRweekCalendarCellProspectCertainty"+d+prospects[i]).css({"background-color":"blue"});}

					else
						if(datedebut.getTime() >=smond.getTime() && datedebut.getTime() <=sund.getTime()){
							if (d==0) d=7;
							$("#DIRweekCalendarCellProspectCertainty"+(d+7)+prospects[i]).css({"background-color":"blue"});}

					datedebut = new Date(datedebut.setDate(datedebut.getDate()+1 ));
					datedebut.setHours(0);
					datedebut.setMinutes(0);
					datedebut.setSeconds(0);
					datedebut.setMilliseconds(0);
					if(datedebut.getTime() >=fmond.getTime() && datedebut.getTime() <=sund.getTime())
					{
						while(datedebut.getTime()<=datefin.getTime())
						{
							
							d = datedebut.getDay();
							if(datedebut.getTime() >=fmond.getTime() && datedebut.getTime() <smond.getTime()){
								if (d==0) d =7;
								$("#DIRweekCalendarCellProspectCertainty"+d+prospects[i]).css({"background-color":"blue"});}
							else
							if(datedebut.getTime() >=smond.getTime() && datedebut.getTime() <=sund.getTime()){
								if(d==0) d=7;
								$("#DIRweekCalendarCellProspectCertainty"+(d+7)+prospects[i]).css({"background-color":"blue"});}

							datedebut = new Date(datedebut.setDate(datedebut.getDate()+1 ));
							datedebut.setHours(0);
							datedebut.setMinutes(0);
							datedebut.setSeconds(0);
							datedebut.setMilliseconds(0);
						}
					}
		}
			
	}
}

function DIRphaseoColor(numphase){
	if (numphase<0 || numphase>5) {
		alert("Database Corruption Found with phase "+numphase);
		return "black";
	}
	if (numphase ==1) return "red";//red color
	if (numphase==2) return "orange";//orange color
	if (numphase ==3) return "yellow";//yellow color
	if (numphase ==4) return "greenyellow";//greenyellow color
	if (numphase ==5) return "green";//green color
}
function showProspects()
{
	$("#pipelineTableContainer").show();
}

function getError(requestedData)
{
	alert(requestedData.error);
}