export function mergeSchedules(schedules:Array<Array<string>>):Array<string>{

    
    function returnArray(){
      let matOfFalse = new Array<Boolean>();
      for(let i = 0;i<=60;++i)matOfFalse.push(false);
      return matOfFalse;
    }
    let matrice:any = new Object();
    for(let hour = 0;hour<24;++hour){
      matrice[hour] = returnArray();
    }
 
    let minim = 25;
    let maxim = 0;

    const reducer = (accumulator:Array<string>, actualValue:Array<string>) => {


      for(let interval of accumulator){
          let start = +interval.split('^')[0];
          let final = +interval.split('^')[1];
          let startMinutes = transformTimeToMinutes(start);
          let finalMinutes = transformTimeToMinutes(final);
          
          for(let startMinute = startMinutes;startMinute < finalMinutes;startMinute++){
            let hour = Math.floor(startMinute/60);
          
            let minutes = startMinute - (60 * Math.floor(startMinute/60));
            matrice[hour][minutes] = true;
            

            if(hour > maxim)maxim = hour;
            if(hour < minim)minim = hour;

          }
      }


      for(let interval of actualValue){
        let start = +interval.split('^')[0];
        let final = +interval.split('^')[1];
        let startMinutes = transformTimeToMinutes(start);
        let finalMinutes = transformTimeToMinutes(final);

        for(let startMinute = startMinutes;startMinute < finalMinutes;startMinute++){

          let hour = Math.floor(startMinute/60);
          let minutes = startMinute - (60 * Math.floor(startMinute/60));

          matrice[hour][minutes] = true;

          if(hour > maxim)maxim = hour;
          if(hour < minim)minim = hour;

        }
      }


      let arrayToBeReturned:Array<string> = new Array<string>();

      let contor:number = 0;
      let startSlot:string = '0';
     // console.log(minim, maxim);
      let finalSlot:string;
      let startHour, minute;
      for(startHour = minim; startHour <= maxim;startHour++){

        
        for(minute =  0; minute<60;++minute){
         //console.log(startHour + ' ' + minute + ' ' + matrice[startHour][minute]);
          if(matrice[startHour][minute] && (contor == 0 || contor == 3))contor = 1;
          else if(matrice[startHour][minute])contor = 2;
              else if(matrice[startHour][minute] == false && (contor == 1 || contor == 2))contor = 3;
                  else contor = 0;
  
          if(contor == 1){
            // start of a new slot
            startSlot = startHour + '.' + minute;
          }
          else if(contor == 3){
            
            if(minute < 10)finalSlot = startHour + '.' + '0' + minute;
            else finalSlot = startHour + '.' + minute;
            arrayToBeReturned.push(startSlot + '^' + finalSlot);
          }
          //console.log(matrice[startHour][minute] + ' ' +  contor);

      }

      }
      if(contor == 2 && !matrice[startHour][0]){
          finalSlot = startHour + '.' + '00';
          arrayToBeReturned.push(startSlot + '^' + finalSlot);
      }
      return arrayToBeReturned;

    }

    return schedules.reduce(reducer);

}

function transformTimeToMinutes(time:number){
  return Math.floor(time) * 60 + Math.round((time - Math.floor(time))*100);
 }
