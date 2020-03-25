function generateJson (){
    let inputString = document.getElementById("txtareaInput").value;
    let stringsArray = inputString.split(',');
    let and = {} 
    for (let i=0; i< stringsArray.length; i++) { 
        let keyValue = stringsArray[i].split(':')
        if(keyValue.length !== 2) {
            setOutputVal("undefined")
            return;
        }
         if(getObjectValue(keyValue[1])){
            let key = keyValue[0].replace("_", ".")
            and[key] = getObjectValue(keyValue[1])
         }
        else{
            setOutputVal("undefined")
            return
        }
    }
    let finalJson = {"and":and}
    setOutputVal(JSON.stringify(finalJson,undefined, 2))
}

function getObjectValue(objVal){
    if(objVal.includes('|')){
        return {
            "inq" : objVal.split('|')
        }
    }
    else if(objVal.includes("--to--")){
        let dates = objVal.split('--to--')
        dates[0] = new Date(dates[0].toString())
        dates[1] = new Date(dates[1].toString())
        if(!isNaN(dates[0].getTime()) && !isNaN(dates[1].getTime())){
            dates[1].setUTCHours(23)
            dates[1].setUTCMinutes(59)
            dates[1].setUTCSeconds(59)

            return {
                "between" : getFormattedDates(dates)
            }
        }
        else
            return undefined
    }
    else {
        return {
            "eq" : objVal
        }
    }
}

function getFormattedDates(dates) {
    var dateStrings = []
    dateStrings.push(dates[0].toJSON().substr(0,19))
    dateStrings.push(dates[1].toJSON().substr(0,19))
    return dateStrings
}
function setOutputVal (val) {
    document.getElementById("txtareaOutput").value = val
}