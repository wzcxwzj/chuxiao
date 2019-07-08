
var time =0;
function fun()
{
    time += 1000;
    console.log(time);

    var int = self.setInterval("clock()", time);

    if(time==10000){
        time=0;
    }
}
var op = [];  //存放key值            ---------------->从后端接收的key值
var tt = []; //存放value            ---------------->后端的value值

 var array = []; //存放value值          ---------------->存储后端的value值

function clock() {

    $.ajax({
        url: '/api/v1/myauth/weight',
        type: 'GET',
        success: function (data) {
           // console.log(data);
            var obj = JSON.parse(data);
            for(var key in obj)
            {
                var idNameStyle = document.getElementById(key);
                if(idNameStyle)
                {
                    if(obj[key]< 235)
                    {
                        idNameStyle.style.backgroundColor = "green";
                    }else if(obj[key] <= 255)
                    {
                        idNameStyle.style.backgroundColor = "blue";
                    }else if(obj[key] <= 275)
                    {
                        idNameStyle.style.backgroundColor = "yellow";
                        idNameStyle.style.color = "black";
                    }else if (obj[key]  <= 280)
                    {
                        idNameStyle.style.backgroundColor = "orange";
                    }else if(obj[key]  <= 300)
                    {
                        idNameStyle.style.backgroundColor = "red";
                    }
                }

            }


        }
    });

    $.ajax({
        url: '/api/v1/myauth/differentialPressure',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            'process' : "clean",
            'startTime' : "201904110000",
            'endTime' :   "201904112352",
            'cartons' : "BS11_1"
        }),
        success: function(data) {
           // console.log(data);
            var obj = JSON.parse(data);
            var i=0;
            for (var key in obj)
            {
                op[i]= obj[key].dateStr;
                i++;
                //                    setTime(obj[key].BS11_1);
            }

            var q=0;
            for (var key in obj)                                                                         //3.取后端的value值
            {
                tt[q] = obj[key].BS11_1;
                q++;
                //console.log(tt[q]);
            }
		
	
		var y=0;
	    for (var o=0;o<op.length;o++)
            {
		
                //var data = parseInt(op[o] / 10000);
                //var hour = parseInt((op[o]- 10000 * data) / 60);
                //var min = op[o] - 10000 * data - 60 * hour;
		var data = parseInt(op[o] / 10000);
                var hour = parseInt((op[o]- 10000 * data) / 99);
                var min = parseInt((op[o] - 10000 * data - 99 * hour)/99*60);

                if(min%10==0)
                {
                   
 		   array [y]= tt[o];
                   console.log(array[y]);
			y++;
                }
            }
	console.log("************************************************************************************");

	/*
            var y=0;
            for (var o=0;o<op.length;o++)
            {

                var data = parseInt(op[o] / 10000);
                var hour = parseInt((op[o]- 10000 * data) / 99);
                var min = parseInt((op[o] - 10000 * data - 99 * hour)/99*60);

             
                if(min%10==0)
                {
                    // console.log(op[o]);

                   array [y]= tt[o];
                   console.log(array[y]);
                   y++;
                }
            }
          
	*/
            
        }
    });
}

function setTime(dateStr)
{
    data = parseInt(dateStr/10000);
    hour = parseInt((dateStr - 10000*data)/60);
    min  = dateStr-10000*data-60*hour;
    console.log(data);
    console.log(hour);
    console.log(min);
}


