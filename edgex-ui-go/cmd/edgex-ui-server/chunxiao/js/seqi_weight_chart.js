
seqi();
function seqi(){
    $.ajax({
        url: '/api/v1/myauth/weight',
        type: 'GET',
        success: function (data){
            console.log(data);
            var obj = JSON.parse(data);
//                console.log(obj.BS1_1);
            var myChart = echarts.init(document.getElementById('chartmain1'));
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
                        data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21'],
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
                        yAxisIndex: 1,
                        data:[obj.BS1_1, obj.BS1_2, obj.BS1_3, obj.BS1_4, obj.BS3_1, obj.BS3_2, obj.BS3_3, obj.BS3_4, obj.BS5_1, obj.BS5_2, obj.BS5_3, obj.BS5_4, obj.BS7_1, obj.BS7_2, obj.BS7_3, obj.BS7_4, obj.BS9_1, obj.BS9_2, obj.BS9_3, obj.BS9_4, obj.BS9_4]                 
                    },
                    {
                        name:'右侧重量',                                                                                                                                                              
                        type:'bar',
                        yAxisIndex: 1,
                        data:[obj.BS2_1, obj.BS2_2, obj.BS2_3, obj.BS2_4, obj.BS4_1, obj.BS4_2, obj.BS4_3, obj.BS4_4,obj.BS6_1, obj.BS6_2, obj.BS6_3, obj.BS6_4, obj.BS8_1, obj.BS8_2, obj.BS8_3, obj.BS8_4, obj.BS10_1, obj.BS10_2, obj.BS10_3, obj.BS10_4, obj.BS10_4]                                                                                        
                    }
                ]
            };
            myChart.setOption(option);
        }
    });
}
























