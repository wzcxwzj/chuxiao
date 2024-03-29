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
 *******************************************************************************/

package main

import (
	"log"
	"net/http"
	_ "net/http/pprof"
	"strconv"
	"time"
//	"fmt"

	"github.com/edgexfoundry/edgex-ui-go/app"
	"github.com/edgexfoundry/edgex-ui-go/app/common"
	"github.com/edgexfoundry/edgex-ui-go/app/configs"
	"github.com/edgexfoundry/edgex-ui-go/app/repository/mm"
	"github.com/edgexfoundry/edgex-ui-go/app/repository/mongo"
)

func main() {

	err := configs.LoadConfig("")
	if err != nil {
		log.Printf("Load config failed. Error:%v\n", err)
		return
	}

	ok := mongo.MYDBConnect()
	if !ok {
		mm.DBConnect()
	}

//	 mylog := mongo.Test()
//	fmt.Println(mylog)

	r := app.InitRestRoutes()

	server := &http.Server{
		Handler:      common.GeneralFilter(r),
		Addr:         ":" + strconv.FormatInt(configs.ServerConf.Port, 10),
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Println("EdgeX UI Server Listen At " + server.Addr)

	log.Fatal(server.ListenAndServe())
}
