
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

    function clock() {

        $.ajax({
            url: '/api/v1/myauth/weight',
            type: 'GET',
            success: function (data) {      
                console.log(data);
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
            url: '/api/v1/myauth/windSpeed',//风速趋势图
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                'process' : "cleanwind",
                'date': "20190416"    
                }),
            success: function(data) {
                console.log(data);
                var obj = JSON.parse(data);
                console.log(obj)
                }    
        });
 /*       
        $.ajax({
            url: '/api/v1/myauth/differentialPressure',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                'process' : "clean",
                'startTime' : "201904110000",
                'endTime' :   "201904111440",
                'cartons' : "BS11_1"
                }),
            success: function(data) {
                console.log(data);
                var obj = JSON.parse(data);  
                for (var key in obj)
                {   
                    console.log(obj);
//                    setTime(obj[key].BS11_1);
                }
            }
        });
*/
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
   
   /*

        $.ajax({
            url: '/api/v1/myauth/proportion',//小修数
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                'date': "2019-04-09 "    
                }),
            success: function(data) {
                console.log(data);
                var obj = JSON.parse(data);
                console.log(obj)
                }    
        });
    

        $.ajax({
            url: '/api/v1/myauth/differentialPressure',//压差
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                'process' : "clean",
                'startTime' : "201904110000",
                'endTime' :   "201904111440",
                'cartons' : "BS11_1"
                }),
            success: function(data) {
                console.log(data);
                var obj = JSON.parse(data);  
        });
        
        $.ajax({
            url: '/api/v1/myauth/windSpeed',//风速趋势图
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                'process' : "cleanwind",
                'date': "20190416"    
                }),
            success: function(data) {
                console.log(data);
                var obj = JSON.parse(data);
                console.log(obj)
                }    
        });
        
    
    */