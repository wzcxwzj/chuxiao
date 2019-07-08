
var time = 1000;
self.setInterval("clock()", time); 

function clock(){
    $.ajax({
            url: '/api/v1/myauth/weight',
            type: 'GET',
            success: function (data){
                console.log(data);
                 var obj = JSON.parse(data);
//                console.log(obj.BS1_1);
                var myChart = echarts.init(document.getElementById('chartmain'));
                var  option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                crossStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        toolbox: {
                            feature: {
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        legend: {
                            data:['左侧过车','右侧过车','左侧重量','右侧重量']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14'],
                                axisPointer: {
                                    type: 'shadow'
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '水量',
                                min: 0,
                                max: 4500,
                                interval: 500,
                                axisLabel: {
                                    formatter: '{value} 辆'
                                }
                            },
                            {
                                type: 'value',
                                name: '温度',
                                min: 220,
                                max: 300,
                                interval: 10,
                                axisLabel: {
                                    formatter: '{value} Kg'
                                }
                            }
                        ],
                        series: [
                            {
                                name:'左侧过车',
                                type:'bar',
                                data:[obj.BS1_1, 3568, 3568,3568, 3568, 3568, 3568, 3568, 3568, 2893, 2893, 4223,4223, 2893]
                            },
                            {
                                name:'右侧过车',
                                type:'bar',
                                data:[3231, 3863, 3863, 3863, 3863, 3863, 3568, 3231,2893,3863,3863, 3863,3863,3863]
                            },
                            {
                                name:'左侧重量',
                                type:'line',
                                yAxisIndex: 1,
                                data:[253, 251, 262, 264, 251, 265, 263, 275, 279, 282, 263, 258,252,248]
                            },
                            {
                                name:'右侧重量',
                                type:'line',
                                yAxisIndex: 1,
                                data:[250, 253, 269, 272, 297, 272, 266, 275, 278, 276, 279, 259,254,250]
                            }
                        ]
                    };
                 myChart.setOption(option);
            }
        });  
}
  
        








        