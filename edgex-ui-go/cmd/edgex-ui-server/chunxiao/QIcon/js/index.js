
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
    }
    /*
        var ddd = "2019-04-09 ";
        console.log(ddd);

        $.ajax({
            url: '/api/v1/myauth/proportion',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                'date': ddd    
                }),
            success: function(data) {
                console.log(data);
                var obj = JSON.parse(data);
                console.log(obj)
                }    
        });
    }

        
    } */