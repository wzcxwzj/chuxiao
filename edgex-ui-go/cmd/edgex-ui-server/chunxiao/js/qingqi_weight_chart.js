
qingqi();
function qingqi(){
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
                            data:['左侧重量','右侧重量']
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
                                name: '重量',
                                min: 220,
                                max: 320,
                                interval: 10,
                                axisLabel: {
                                    formatter: '{value} Kg'
                                }
                            },
                            {
                                type: 'value',
                                name: '重量',
                                min: 220,
                                max: 320,
                                interval: 10,
                                axisLabel: {
                                    formatter: '{value} Kg'
                                }
                            }
                        ],
                        series: [
                            {
                                name:'左侧重量',
                                type:'bar',
                                data:[obj.BS11_1, obj.BS11_2, obj.BS11_3, obj.BS11_4, obj.BS11_5, obj.BS13_1, obj.BS13_2, obj.BS13_3, obj.BS13_4, obj.BS13_5, obj.BS15_1, obj.BS15_2, obj.BS15_3, obj.BS15_4]

                            },
                            {
                                name:'右侧重量',
                                type:'bar',
                                data:[obj.BS12_1, obj.BS12_2, obj.BS12_3, obj.BS12_4, obj.BS12_5, obj.BS14_1, obj.BS14_2, obj.BS14_3, obj.BS14_4, obj.BS14_5, obj.BS16_1, obj.BS16_2, obj.BS16_3, obj.BS16_4]                                                     
                            }

                        ]
                    };
                 myChart.setOption(option);
            }
        });  

}
        







        