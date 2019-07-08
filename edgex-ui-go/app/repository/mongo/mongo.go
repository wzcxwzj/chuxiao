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

package mongo

import (
	"fmt"
	"log"
	"time"

	"github.com/edgexfoundry/edgex-ui-go/app/configs"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)


var(
	database      = configs.DBConf.Name
	dbHost        = configs.DBConf.Host
	dbPort	      = configs.DBConf.Port
	dbUserName    = configs.DBConf.Username
	dbPassword    = configs.DBConf.Password
	gatewayScheme = configs.DBConf.Scheme.Gateway
	userScheme    = configs.DBConf.Scheme.User
)



type DataStore struct {
	S *mgo.Session
}

var DS DataStore

func (ds DataStore) DataStore() *DataStore {
	return &DataStore{ds.S.Copy()}
}

func DBConnect() bool {
	log.Println("configs.DBConf.Name: :",configs.DBConf.Name)
	log.Printf("configs.DBConf.Host  :%s",configs.DBConf.Username)
	log.Printf("configs.DBConf.Port :%s",configs.DBConf.Password);
    
	mongoAddress := fmt.Sprintf("%s:%d", configs.DBConf.Host, configs.DBConf.Port)
	mongoDBDialInfo := &mgo.DialInfo{
		Addrs:    []string{mongoAddress},
		Timeout:  time.Duration(5000) * time.Millisecond,
		Database: database,
		Username: dbUserName,
		Password: dbPassword,
	}
	s, err := mgo.DialWithInfo(mongoDBDialInfo)
	if err != nil {
		log.Println("Connect to mongoDB failed !")
		return false
	}
	s.SetSocketTimeout(time.Duration(5000) * time.Millisecond)
	DS.S = s
	log.Println("Success connect to mongoDB !")

	return true
}
 
func MYDBConnect() bool {
    mongoAddr := fmt.Sprintf("%s:%d", configs.DBConf.Host, configs.DBConf.Port)
	session, err := mgo.Dial(mongoAddr) 
	if err != nil {
		log.Println("connect to mongodb failed!!")
		return false
	}  
    
	log.Println("Success connect to mongoDB !")  
//	log.Println(session)

	DS.S = session 
        return true

}

func Test() []map[string]interface{} {
	c := DS.S.DB("test").C("car")
	var result []map[string]interface{}
	c.Find(nil).All(&result) 

	return  result
}

func FindWeightDB(dbname string ,collections string )[]map[string]interface{} {
    c := DS.S.DB(dbname).C(collections)
          var result []map[string]interface{}
          
 // c.Find(nil).Select(bson.M{"dateStr":0,"_id":0}).Sort("-_id").Limit(1).All(&result) 
    c.Find(nil).Sort("-_id").Limit(1).All(&result)       
          return  result
}

func FindWeightDBOne(dbname string ,collections string )map[string]interface{} {
    c := DS.S.DB(dbname).C(collections)
          var result map[string]interface{}
          
    c.Find(nil).Sort("-_id").Limit(1).One(&result)       
          return  result
}


func FindTableSelectOne(dbname,collections,data string )map[string]interface{} {
    c := DS.S.DB(dbname).C(collections)
          var result map[string]interface{}
          
 // fmt.Println(result)
 //c.Find(nil).Select(bson.M{"dateStr":0,"_id":0}).Sort("-_id").Limit(1).All(&result) 
    c.Find(bson.M{"dateStr":data}).One(&result)       
          return  result
}

func FindAListCartonsDifferentPressure(dbname,collections,startTime,endTime, cartons string)[]map[string]interface{}{
 	c := DS.S.DB(dbname).C(collections)
	var result []map[string]interface{}
	c.Find(bson.M{"dateStr":bson.M{"$gte": startTime,"$lte": endTime}}).Select(bson.M{cartons : 1,"dateStr":1}).All(&result)

//	c.Find(nil).All(&result)
//	fmt.Println(result)
	return result
}
