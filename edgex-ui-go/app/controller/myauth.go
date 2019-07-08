/*******************************************************************************
 * Copyright © 2017-2018 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 *
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/

package controller

import (
	"encoding/json"
    	"fmt"
	"log"
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/app/repository/mongo"
)

const (
	dbName  = "train"
	cleanWeight = "cleanweight"
	colorWeight = "colorweight"
	car        = "car"
	date  = "date"
	clean   = "clean"
	startTime = "startTime"
	endTime = "endTime"
	cartons = "cartons"	
	process = "process"
)

func Debug(w http.ResponseWriter, r *http.Request){
    
    log.Println("Dbug  !!!!!!!!!!!!!!!!!!")
    var	cleanweightResult []map[string]interface{}
    cleanweightResult = mongo.FindWeightDB("test","cleanweight")
   // fmt.Println(cleanweightResult)

    var	colorweightResult []map[string]interface{}
    colorweightResult = mongo.FindWeightDB("test","colorweight")
 //   fmt.Println(colorweightResult)
 
 
    cleanResult := make(map[string]interface{})
    cleanResult = cleanweightResult[0]
 
    mapString := make(map[string]string)
    for key,value := range cleanResult{
	strkey := fmt.Sprintf("%v",key)
	strvalue := fmt.Sprintf("%v",value)
	mapString[strkey]= strvalue
    }

     colorResult := make(map[string]interface{})
     colorResult = colorweightResult[0]
     
     for key2,value2 := range colorResult{
          strkey2 := fmt.Sprintf("%v",key2)
          strvalue2 := fmt.Sprintf("%v",value2)
          mapString[strkey2]= strvalue2
      }

//    fmt.Println(mapString)


    result, _ := json.Marshal(&mapString)
    w.Write(result)

}



func Weight( w http.ResponseWriter, r *http.Request){
//	log.Println("weight !!!")
	resultString := make(map[string]string)
 
	var cleanweightResult map[string]interface{}
	cleanweightResult = mongo.FindWeightDBOne(dbName,cleanWeight)
	
	for key, value := range cleanweightResult{
		strkey := fmt.Sprintf("%v",key)
		strvalue := fmt.Sprintf("%v",value) 
		resultString[strkey] = strvalue
	}

	var colorweightResult map[string]interface{}
	colorweightResult = mongo.FindWeightDBOne(dbName,colorWeight)
	
	for key, value := range colorweightResult{
		strkey := fmt.Sprintf("%v",key)
		strvalue := fmt.Sprintf("%v",value) 
		resultString[strkey] = strvalue
	}
	result, _ := json.Marshal(&resultString)
	w.Write(result)
}

func Proportion(w http.ResponseWriter, r *http.Request){
	defer r.Body.Close()
	log.Println("Proportion!!")
	m := make (map[string]string)
	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	date := m[date]
//	fmt.Println(data)

        var proportionResult map[string]interface{}
        proportionResult = mongo.FindTableSelectOne(dbName,car,date)
//	fmt.Println(proportionResult)

	result, _ := json.Marshal(&proportionResult)
        w.Write(result)
}

	
func  DifferentialPressure(w http.ResponseWriter, r *http.Request){
	defer r.Body.Close()
        log.Println("DifferentialPressure!!!")
	m := make (map[string]string)
        err := json.NewDecoder(r.Body).Decode(&m)
        if err != nil {
                http.Error(w, err.Error(), http.StatusServiceUnavailable)
                return
        }

	process   := m[process]
	startTime := m[startTime]
	endTime   := m[endTime]
	cartons   := m[cartons]
	var findClean []map[string]interface{}
	findClean = mongo.FindAListCartonsDifferentPressure(dbName,process,startTime,endTime,cartons)
	cleanResult := make(map[string]string)
	result := make(map[int](map[string]string))
	for i := range findClean{
		for key, value := range findClean[i]{
			strkey := fmt.Sprintf("%v",key)
               		strvalue := fmt.Sprintf("%v",value) 
                       	cleanResult[strkey] = strvalue
		}
		result[i] =  cleanResult
		cleanResult = make(map[string]string)

	}
//	fmt.Println(result)
//	fmt.Println("************************")
	sendResult,_ := json.Marshal(&result)
	w.Write(sendResult)
}


func WindSpeed(w http.ResponseWriter, r *http.Request){
	defer r.Body.Close()
	log.Println("WindSpeed!!!")
	m := make(map[string]string)
	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
		http.Error(w,err.Error(),http.StatusServiceUnavailable)
		return 
	}
	process := m[process]
	date    := m[date]
	var wind map[string]interface{}
	wind = mongo.FindTableSelectOne(dbName,process,date)	
	
	result , _ := json.Marshal(&wind)
	w.Write(result)		

}
