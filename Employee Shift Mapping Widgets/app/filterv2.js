async function FilterSPFunc(carerData,clientData,carefacilitatorData){
    console.log("FilterSPFunc called");
    // get new response from emp shift report
    var emplist=[];
    try{
      const cust_response = await ZOHO.CREATOR.API.getAllRecords({reportName : "Shift_Report", page : 1});
      const recordArr = await cust_response.data;
      for(var index in recordArr){
        var rec_id = recordArr[index].ID;
        var start_date = recordArr[index].Start_Date;
        var end_date = recordArr[index].End_Date;
        var carer =recordArr[index].Carers.display_value.trim();
        var care_facilitators = recordArr[index]["Carers.Care_Facilitier"].trim();
        var subformrec=recordArr[index].Shift_Assign;
        if (subformrec.length > maximumcount)
        {
          maximumcount=subformrec.length;
        }
        for(var subindex in subformrec)
        {
          var Subform_ID = subformrec[subindex].ID;
          var linerec=subformrec[subindex].display_value;
          var splitdata=linerec.split(",");
          var temparr=[];
          temparr["EmpName"]=carer;
          temparr["end_date"]=end_date;
          temparr["start_date"]=start_date;
          temparr["shift"]=splitdata[1].trim();
          temparr["client"]=splitdata[0].trim();
          temparr["sub_ID"]= Subform_ID;
          temparr["rec_id"] = rec_id;
          temparr["care_facilitators"] = care_facilitators;
          emplist.push(temparr);
        }
      }
    } catch (error){
      console.log("error found on getting shift record",error);
    }
    Employee_Shift_List= emplist;
    console.log("Employee_Shift_List:",Employee_Shift_List);
    if (carerData != 0 || clientData != 0 || carefacilitatorData !=0)
    {
      $(".EMP_tr").remove();
      $(".EMP_tr1").remove();
      // $(".empty").remove();
      if (Employee_Shift_List.length>0)
      {
        if (carefacilitatorData !=0 && clientData != 0)
        {
          console.log("*******");
        }
        else if (carefacilitatorData !=0 && carerData != 0)
        {
          CarerFilterFunc(carerData,clientData).then(filterdata =>{
            var keyProperties = ['carerName', 'care_facilitator'];
            var uniqueArray = removeDuplicates(filterdata, keyProperties);
            const uniqueDataFaci = uniqueArray.filter(item => item.carerName === carerData && item.care_facilitator === carefacilitatorData);
            const Carer_Faci_uniqueData = CarerDataList.filter(item => item.care_faci === carefacilitatorData && item.carerName === carerData);
            const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
            if (uniqueDataFaci.length > 0)
            {
              if (newCarerArr.length>0)
              {
                newCarerArr.forEach(carerelement => {
                  const empName = carerelement.carerName;
                  const tr2 = document.createElement('tr');
                  tr2.className = "EMP_tr";
                  tr2.innerText =empName;
                  const td = document.createElement('td');
                  $("#emp_tr").prepend(tr2);
                });
              }
              uniqueDataFaci.forEach(Empelement => {
                const empName = Empelement.carerName;
                const tr2 = document.createElement('tr');
                tr2.className = "EMP_tr";
                tr2.innerText =empName;
                const td = document.createElement('td');
                $("#emp_tr").prepend(tr2);
              });
              uniqueDataFaci.reverse().forEach(Empelement => {
                const empName = Empelement.carerName;
                const clientName = Empelement.clientName;
                const carefaciName = Empelement.care_facilitator;
                PostShiftFun(Employee_Shift_List,empName,clientName,carefaciName,carerData,clientData,carefacilitatorData);
              });
              if (newCarerArr.length>0)
              {
                newCarerArr.reverse().forEach(carerelement => {
                  const empName = carerelement.carerName;
                  PostEmptyShiftFunc(empName);
                });
              }
            }
            else
            {
              console.log("newCarerArrInside:",newCarerArr);
              console.log("****** no record found ******");
              if (newCarerArr.length>0)
              {
                newCarerArr.forEach(carerelement => {
                  const empName = carerelement.carerName;
                  const tr2 = document.createElement('tr');
                  tr2.className = "EMP_tr";
                  tr2.innerText =empName;
                  const td = document.createElement('td');
                  $("#emp_tr").prepend(tr2);
                });
                newCarerArr.reverse().forEach(carerelement => {
                  const empName = carerelement.carerName;
                  PostEmptyShiftFunc(empName);
                });
              }
              else
              {
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "No Records Found",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            }
            var tr1 = document.createElement('div');
            tr1.className = "empty";
            tr1.innerHTML = "Thoughtlogik";
            $("#emp_tr").prepend(tr1);
  
          });
        }
        else if (carerData != 0 && clientData != 0)
        {
          CarerFilterFunc(carerData,clientData).then(filterdata =>{
            var keyProperties = ['carerName', 'clientName'];
            var uniqueArray = removeDuplicates(filterdata, keyProperties);
            function filterArrayByName(carerName, clientName) {
              return uniqueArray.filter(function(item) {
                return item.carerName === carerName && item.clientName === clientName;
              });
            }
            const uniqueDataFaci = filterArrayByName(carerData,clientData);
            const Carer_Faci_uniqueData = CarerDataList.filter(item =>item.carerName === carerData);
            const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
            if (uniqueDataFaci.length > 0)
            {
              if (newCarerArr.length>0)
              {
                newCarerArr.forEach(carerelement => {
                  const empName = carerelement.carerName;
                  const tr2 = document.createElement('tr');
                  tr2.className = "EMP_tr";
                  tr2.innerText =empName;
                  const td = document.createElement('td');
                  $("#emp_tr").prepend(tr2);
                });
              }
              uniqueDataFaci.forEach(Empelement => {
                const empName = Empelement.carerName;
                const tr2 = document.createElement('tr');
                tr2.className = "EMP_tr";
                tr2.innerText =empName;
                const td = document.createElement('td');
                $("#emp_tr").prepend(tr2);
              });
              uniqueDataFaci.reverse().forEach(Empelement => {
                const empName = Empelement.carerName;
                const clientName = Empelement.clientName;
                const carefaciName = Empelement.care_facilitator;
                PostShiftFun(Employee_Shift_List,empName,clientName,carefaciName,carerData,clientData,carefacilitatorData);
              });
              if (newCarerArr.length>0)
              {
                newCarerArr.reverse().forEach(carerelement => {
                  const empName = carerelement.carerName;
                  PostEmptyShiftFunc(empName);
                });
              }
            }
            else
            {
              console.log("newCarerArrInside:",newCarerArr);
              console.log("****** no record found ******");
              if (newCarerArr.length>0)
              {
                newCarerArr.forEach(carerelement => {
                  const empName = carerelement.carerName;
                  const tr2 = document.createElement('tr');
                  tr2.className = "EMP_tr";
                  tr2.innerText =empName;
                  const td = document.createElement('td');
                  $("#emp_tr").prepend(tr2);
                });
                newCarerArr.reverse().forEach(carerelement => {
                  const empName = carerelement.carerName;
                  PostEmptyShiftFunc(empName);
                });
              }
              else
              {
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "No Records Found",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            }
            var tr1 = document.createElement('div');
            tr1.className = "empty";
            tr1.innerHTML = "Thoughtlogik";
            $("#emp_tr").prepend(tr1);
          });
        }
        else if(carefacilitatorData !=0)
        {
          CarerFilterFunc(carerData,clientData).then(filterdata =>{
            var keyProperties = ['carerName', 'care_facilitator'];
            var uniqueArray = removeDuplicates(filterdata, keyProperties);
            uniqueDataFaci = uniqueArray.filter(item => item.care_facilitator === carefacilitatorData);
            const Carer_Faci_uniqueData = CarerDataList.filter(item => item.care_faci === carefacilitatorData);
            newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
            if (uniqueDataFaci.length > 0)
            {
              if (newCarerArr.length>0)
              {
                newCarerArr.forEach(carerelement => {
                  const empName = carerelement.carerName;
                  const tr2 = document.createElement('tr');
                  tr2.className = "EMP_tr";
                  tr2.innerText =empName;
                  const td = document.createElement('td');
                  $("#emp_tr").prepend(tr2);
                });
              }
              uniqueDataFaci.forEach(Empelement => {
                const empName = Empelement.carerName;
                const tr2 = document.createElement('tr');
                tr2.className = "EMP_tr";
                tr2.innerText =empName;
                const td = document.createElement('td');
                $("#emp_tr").prepend(tr2);
              });
              uniqueDataFaci.reverse().forEach(Empelement => {
                const empName = Empelement.carerName;
                const clientName = Empelement.clientName;
                const carefaciName = Empelement.care_facilitator;
                PostShiftFun(Employee_Shift_List,empName,clientName,carefaciName,carerData,clientData,carefacilitatorData);
              });
              if (newCarerArr.length>0)
              {
                newCarerArr.reverse().forEach(carerelement => {
                  const empName = carerelement.carerName;
                  PostEmptyShiftFunc(empName);
                });
              }
            }
            else
            {
              console.log("newCarerArrInside:",newCarerArr);
              console.log("****** no record found ******");
              if (newCarerArr.length>0)
              {
                newCarerArr.forEach(carerelement => {
                  const empName = carerelement.carerName;
                  const tr2 = document.createElement('tr');
                  tr2.className = "EMP_tr";
                  tr2.innerText =empName;
                  const td = document.createElement('td');
                  $("#emp_tr").prepend(tr2);
                });
                newCarerArr.reverse().forEach(carerelement => {
                  const empName = carerelement.carerName;
                  PostEmptyShiftFunc(empName);
                });
              }
              else
              {
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "No Records Found",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            }
            var tr1 = document.createElement('div');
            tr1.className = "empty";
            tr1.innerHTML = "Thoughtlogik";
            $("#emp_tr").prepend(tr1);
          });
        }
        else if (carerData != 0)
        {
          CarerFilterFunc(carerData,clientData).then(filterdata =>{
            const uniqueDataTemp = removeDuplicatesByKey(filterdata, 'carerName');
            const uniqueDataFaci = uniqueDataTemp.filter(item => item.carerName === carerData);
            const Carer_Faci_uniqueData = CarerDataList.filter(item =>item.carerName === carerData);
            const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
            if (uniqueDataFaci.length > 0)
            {
              if (newCarerArr.length>0)
              {
                newCarerArr.forEach(carerelement => {
                  const empName = carerelement.carerName;
                  const tr2 = document.createElement('tr');
                  tr2.className = "EMP_tr";
                  tr2.innerText =empName;
                  const td = document.createElement('td');
                  $("#emp_tr").prepend(tr2);
                });
              }
              uniqueDataFaci.forEach(Empelement => {
                const empName = Empelement.carerName;
                const tr2 = document.createElement('tr');
                tr2.className = "EMP_tr";
                tr2.innerText =empName;
                const td = document.createElement('td');
                $("#emp_tr").prepend(tr2);
              });
              uniqueDataFaci.reverse().forEach(Empelement => {
                const empName = Empelement.carerName;
                const clientName = Empelement.clientName;
                const carefaciName = Empelement.care_facilitator;
                PostShiftFun(Employee_Shift_List,empName,clientName,carefaciName,carerData,clientData,carefacilitatorData);
              });
              if (newCarerArr.length>0)
              {
                newCarerArr.reverse().forEach(carerelement => {
                  const empName = carerelement.carerName;
                  PostEmptyShiftFunc(empName);
                });
              }
            }
            else
            {
              console.log("newCarerArrInside:",newCarerArr);
              console.log("****** no record found ******");
              if (newCarerArr.length>0)
              {
                newCarerArr.forEach(carerelement => {
                  const empName = carerelement.carerName;
                  const tr2 = document.createElement('tr');
                  tr2.className = "EMP_tr";
                  tr2.innerText =empName;
                  const td = document.createElement('td');
                  $("#emp_tr").prepend(tr2);
                });
                newCarerArr.reverse().forEach(carerelement => {
                  const empName = carerelement.carerName;
                  PostEmptyShiftFunc(empName);
                });
              }
              else
              {
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "No Records Found",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            }
            var tr1 = document.createElement('div');
            tr1.className = "empty";
            tr1.innerHTML = "Thoughtlogik";
            $("#emp_tr").prepend(tr1);
          });
        }
        else if (clientData != 0)
        {
          CarerFilterFunc(carerData,clientData).then(filterdata =>{
            var keyProperties = ['carerName', 'clientName'];
            var uniqueDataTemp = removeDuplicates(filterdata, keyProperties);
            const uniqueDataFaci = uniqueDataTemp.filter(item => item.clientName === clientData);
            var clientcareruniqueData=removeDuplicates(ClientCarerReportList, keyProperties);
            const Carer_Faci_uniqueData = clientcareruniqueData.filter(item => item.clientName ==clientData);
            const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
            if (uniqueDataFaci.length > 0)
            {
              if (newCarerArr.length>0)
              {
                newCarerArr.forEach(carerelement => {
                  const empName = carerelement.carerName;
                  const tr2 = document.createElement('tr');
                  tr2.className = "EMP_tr";
                  tr2.innerText =empName;
                  const td = document.createElement('td');
                  $("#emp_tr").prepend(tr2);
                });
              }
              uniqueDataFaci.forEach(Empelement => {
                const empName = Empelement.carerName;
                const tr2 = document.createElement('tr');
                tr2.className = "EMP_tr";
                tr2.innerText =empName;
                const td = document.createElement('td');
                $("#emp_tr").prepend(tr2);
              });
              uniqueDataFaci.reverse().forEach(Empelement => {
                const empName = Empelement.carerName;
                const clientName = Empelement.clientName;
                const carefaciName = Empelement.care_facilitator;
                PostShiftFun(Employee_Shift_List,empName,clientName,carefaciName,carerData,clientData,carefacilitatorData);
              });
              if (newCarerArr.length>0)
              {
                newCarerArr.reverse().forEach(carerelement => {
                  const empName = carerelement.carerName;
                  PostEmptyShiftFunc(empName);
                });
              }
            }
            else
            {
              console.log("newCarerArrInside:",newCarerArr);
              console.log("****** no record found ******");
              if (newCarerArr.length>0)
              {
                newCarerArr.forEach(carerelement => {
                  const empName = carerelement.carerName;
                  const tr2 = document.createElement('tr');
                  tr2.className = "EMP_tr";
                  tr2.innerText =empName;
                  const td = document.createElement('td');
                  $("#emp_tr").prepend(tr2);
                });
                newCarerArr.reverse().forEach(carerelement => {
                  const empName = carerelement.carerName;
                  PostEmptyShiftFunc(empName);
                });
              }
              else
              {
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "No Records Found",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            }
            var tr1 = document.createElement('div');
            tr1.className = "empty";
            tr1.innerHTML = "Thoughtlogik";
            $("#emp_tr").prepend(tr1);
          });
        }
      }
    }
    else
    {
      getEmpFunc().then(dataval => {
        var comparedEmpList=[];
        Employee_Shift_List= dataval;
        var EMPArr=[];
        dataval.forEach(element => {
          const empName = element.EmpName.trim();
          const clientName = element.client.trim();
          var tempemp={
            "carerName":empName,
            "clientName":clientName
          };
          EMPArr.push(tempemp);
        });
        var carerdata=CarerDataList;
        var newArray = filterObjectsByCarerName(EMPArr, carerdata);
        const uniqueData = removeDuplicatesByKey(EMPArr, 'carerName');
        newArray.forEach(carerelement => {
          const empName = carerelement.carerName;
          const tr2 = document.createElement('tr');
          tr2.className = "EMP_tr";
          tr2.innerText =empName;
          const td = document.createElement('td');
          $("#emp_tr").prepend(tr2);
        });
        uniqueData.forEach(Empelement => {
          const empName = Empelement.carerName;
          const tr2 = document.createElement('tr');
          tr2.className = "EMP_tr";
          tr2.innerText =empName;
          const td = document.createElement('td');
          $("#emp_tr").prepend(tr2);
        });
        uniqueData.reverse().forEach(Empelement => {
          const empName = Empelement.carerName;
          const clientName = Empelement.clientName;
          const carefaciName = Empelement.care_facilitator;
          PostShiftFun(dataval,empName,clientName,carefaciName,0,0,0);
        });
        newArray.reverse().forEach(carerelement => {
          const empName = carerelement.carerName;
          PostEmptyShiftFunc(empName);
        });
        var tr1 = document.createElement('div');
        tr1.className = "empty";
        tr1.innerHTML = "Thoughtlogik";
        $("#emp_tr").prepend(tr1);
      });
    }
  }
  
  
  async function FilterFuncSP(carernameValues,clientnameValues,carefaciValues){
    
    var emplist=[];
    try{
      const cust_response = await ZOHO.CREATOR.API.getAllRecords({reportName : "Shift_Report", page : 1});
      const recordArr = await cust_response.data;
      for(var index in recordArr){
        var rec_id = recordArr[index].ID;
        var start_date = recordArr[index].Start_Date;
        var end_date = recordArr[index].End_Date;
        var carer =recordArr[index].Carers.display_value.trim();
        var care_facilitators = recordArr[index]["Carers.Care_Facilitier"].trim();
        var subformrec=recordArr[index].Shift_Assign;
        if (subformrec.length > maximumcount)
        {
          maximumcount=subformrec.length;
        }
        for(var subindex in subformrec)
        {
          var Subform_ID = subformrec[subindex].ID;
          var linerec=subformrec[subindex].display_value;
          var splitdata=linerec.split(",");
          var temparr=[];
          temparr["EmpName"]=carer;
          temparr["end_date"]=end_date;
          temparr["start_date"]=start_date;
          temparr["shift"]=splitdata[1].trim();
          temparr["client"]=splitdata[0].trim();
          temparr["sub_ID"]= Subform_ID;
          temparr["rec_id"] = rec_id;
          temparr["care_facilitators"] = care_facilitators;
          emplist.push(temparr);
        }
      }
    } catch (error){
      console.log("error found on getting shift record",error);
    }
    Employee_Shift_List= emplist;
    var resultData = generateCombinations(carernameValues, clientnameValues, carefaciValues);
    resultData = resultData.filter(function(item) {
      return item.trim() !== '{}';
    });
    if (resultData.length>0)
    {
      var EMPArr=[];
      Employee_Shift_List.forEach(elementval =>{
        const empName = elementval.EmpName.trim();
        const clientName = elementval.client.trim();
        var care_facilitators=elementval.care_facilitators.trim();
        var tempemp=[];
        tempemp["carerName"]=empName;
        tempemp["clientName"]=clientName;
        tempemp["care_facilitator"]=care_facilitators;
        EMPArr.push(tempemp);
      });
      var uniqueDataArr = [];
      var newCarerArray =[];
      var uniqueDataArrsp=[];
      resultData.forEach(element=>{
        var jsonObject = JSON.parse(element);
        var propertiesToCheckcarefaci = ['carername', 'carefaciname'];
        var propertiesToCheck = ['carername', 'clientname'];
        // **** Carer Data and Care Facilitator data script part ****
        if (checkProperties(jsonObject, propertiesToCheckcarefaci))
        {
          var carerName = jsonObject.carername;
          var carefaciName = jsonObject.carefaciname;
          var keyProperties = ['carerName','clientName','care_facilitator'];
          var uniqueArray = removeDuplicates(EMPArr, keyProperties);
          const uniqueDataFaci = uniqueArray.filter(item => item.carerName === carerName && item.care_facilitator === carefaciName);
          if (uniqueDataFaci.length>0)
          {
            uniqueDataFaci.forEach(element => {
              console.log("uniqueDataFaci element:",element);
              var newspvalue=element.carerData=0;
              var newspvalue=element.clientData=clientName;
              var newspvalue=element.carefaciData=0;
              uniqueDataArr.push(element); 
              uniqueDataArrsp.push(element); 
            });  
          }
          const Carer_Faci_uniqueData = CarerDataList.filter(item => item.care_faci === carefaciName && item.carerName === carerName);
          const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
          if (newCarerArr.length>0)
          {
            newCarerArr.forEach(clientarr=>{
              console.log("clientarr:",clientarr);
              newCarerArray.push(clientarr);
            }); 
          }
        }
        // Carer Data and Care Facilitator data script part ends
  
        // Carer Name and Client Name script part
        else if (checkProperties(jsonObject, propertiesToCheck))
        {
          var carerName = jsonObject.carername;
          var clientName = jsonObject.clientname;
          var keyProperties = ['carerName', 'clientName'];
          var uniqueArray = removeDuplicates(EMPArr, keyProperties);
          var uniqueDataFaci = uniqueArray.filter(item=> item.carerName === carerName && item.clientName === clientName);
          if (uniqueDataFaci.length>0)
          {
            uniqueDataFaci.forEach(element => {
              console.log("uniqueDataFaci element:",element);
              var newspvalue=element.carerData=carerName;
              var newspvalue=element.clientData=clientName;
              var newspvalue=element.carefaciData=0;
              uniqueDataArr.push(element); 
              uniqueDataArrsp.push(element); 
            });   
          }
          var clientcareruniqueData=removeDuplicates(ClientCarerReportList, keyProperties);
          const Carer_Faci_uniqueData = clientcareruniqueData.filter(item => item.clientName ==clientName && item.carerName === carerName);
          const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
          if (newCarerArr.length>0)
          {
            newCarerArr.forEach(clientarr=>{
              console.log("clientarr:",clientarr);
              newCarerArray.push(clientarr);
            });  
          }
        }
        // Carer Name and Client Name script part ends
        // Carer Name script part
        else if (jsonObject.hasOwnProperty('carername'))
        {
          var carername = jsonObject.carername;
          console.log("carername found:",carername);
          const uniqueDataTemp = removeDuplicatesByKey(EMPArr, 'carerName');
          // console.log("uniqueDataTemp:",uniqueDataTemp);
          var uniqueDataFaci = uniqueDataTemp.filter(item => item.carerName === carername);
          // console.log("uniqueDataFaci:",uniqueDataFaci);
          if (uniqueDataFaci.length>0)
          {
            uniqueDataFaci.forEach(element => {
              console.log("uniqueDataFaci element:",element);
              var newspvalue=element.carerData=carername;
              var newspvalue=element.clientData=0;
              var newspvalue=element.carefaciData=0;
              uniqueDataArr.push(element); 
              uniqueDataArrsp.push(element);
              return false; 
            });  
          }
          const Carer_Faci_uniqueData = CarerDataList.filter(item =>item.carerName === carername);
          const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
          if (newCarerArr.length>0)
          {
            newCarerArr.forEach(clientarr=>{
              console.log("clientarr:",clientarr);
              newCarerArray.push(clientarr);
            }); 
          }
        }
        // Carer Name script part ends
  
        // Client Name script part
        else if (jsonObject.hasOwnProperty('clientname'))
        {
          var clientName = jsonObject.clientname;
          console.log("clientName:",clientName);
          var keyProperties = ['carerName', 'clientName'];
          var uniqueDataTemp = removeDuplicates(EMPArr, keyProperties);
          const uniqueDataFaci = uniqueDataTemp.filter(item => item.clientName === clientName);
          console.log("uniqueDataFaci:",uniqueDataFaci);
          if (uniqueDataFaci.length>0)
          {
            uniqueDataFaci.forEach(element => {
              console.log("uniqueDataFaci element:",element);
              var newspvalue=element.carerData=0;
              var newspvalue=element.clientData=clientName;
              var newspvalue=element.carefaciData=0;
              uniqueDataArr.push(element); 
              uniqueDataArrsp.push(element); 
            }); 
          }
          // console.log("ClientCarerReportList:",ClientCarerReportList);
          var clientcareruniqueData=removeDuplicates(ClientCarerReportList, keyProperties);
          const Carer_Faci_uniqueData = clientcareruniqueData.filter(item => item.clientName ==clientName);
          const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
          console.log("newCarerArr:",newCarerArr);
          if (newCarerArr.length>0)
          {
            // newCarerArray.length = 0;
            newCarerArr.forEach(clientarr=>{
              console.log("clientarr:",clientarr);
              newCarerArray.push(clientarr);
            });  
          }
        }
        // Client Name script part ends
  
        // Care facilitator script part
        else if (jsonObject.hasOwnProperty('carefaciname'))
        {
          console.log("care faci data found");
          var carefaciName = jsonObject.carefaciname;
          var keyProperties = ['carerName','clientName','care_facilitator'];
          var uniqueDataTemp = removeDuplicates(EMPArr, keyProperties);
          const uniqueDataFaci = uniqueDataTemp.filter(item => item.care_facilitator === carefaciName);
          if (uniqueDataFaci.length>0)
          {
            uniqueDataFaci.forEach(element => {
              var newspvalue=element.carerData=0;
              var newspvalue=element.clientData=0;
              var newspvalue=element.carefaciData=carefaciName;
              uniqueDataArr.push(element); 
              uniqueDataArrsp.push(element); 
            }); 
          }
          // // console.log("ClientCarerReportList:",ClientCarerReportList);
          var clientcareruniqueData=removeDuplicates(ClientCarerReportList, keyProperties);
          const Carer_Faci_uniqueData = CarerDataList.filter(item => item.care_faci === carefaciName);
          const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
          if (newCarerArr.length>0)
          {
            // newCarerArray.length = 0;
            newCarerArr.forEach(clientarr=>{
              newCarerArray.push(clientarr);
            });  
          }
        }
        // Care facilitator script part ends
        else
        {
          console.log("carername not found");
        }
      });
      const newCarerArrVal=filterObjectsByCarerName(uniqueDataArrsp, newCarerArray);
      if (uniqueDataArr.length > 0)
      {
        // Call the function to group items by carerName
        var result = groupByCarerName(uniqueDataArrsp);
        // Display the result
        uniqueDataArr = Object.keys(result);
        if (newCarerArrVal.length>0)
        {
          newCarerArrVal.forEach(carerelement => {
            const empName = carerelement.carerName;
            const tr2 = document.createElement('tr');
            tr2.className = "EMP_tr";
            tr2.innerText =empName;
            const td = document.createElement('td');
            $("#emp_tr").prepend(tr2);
          });
        }
        uniqueDataArr.forEach(Empelement => {
          const empName = Empelement;
          const tr2 = document.createElement('tr');
          tr2.className = "EMP_tr";
          tr2.innerText =empName;
          const td = document.createElement('td');
          $("#emp_tr").prepend(tr2);
        });
        uniqueDataArr.reverse().forEach(Empelement => {
          PostShiftFunsp(Employee_Shift_List,Empelement,result);
        });
        if (newCarerArrVal.length>0)
        {
          newCarerArrVal.reverse().forEach(carerelement => {
            const empName = carerelement.carerName;
            PostEmptyShiftFunc(empName);
          });
        }
      }
      else
      {
        console.log("****** no record found ******");
        if (newCarerArrVal.length>0)
        {
          newCarerArrVal.forEach(carerelement => {
            const empName = carerelement.carerName;
            const tr2 = document.createElement('tr');
            tr2.className = "EMP_tr";
            tr2.innerText =empName;
            const td = document.createElement('td');
            $("#emp_tr").prepend(tr2);
          });
          newCarerArray.reverse().forEach(carerelement => {
            const empName = carerelement.carerName;
            PostEmptyShiftFunc(empName);
          });
        }
        else
        {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "No Records Found",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    }
    else
    {
      getEmpFunc().then(dataval => {
        var comparedEmpList=[];
        Employee_Shift_List= dataval;
        var EMPArr=[];
        dataval.forEach(element => {
          const empName = element.EmpName.trim();
          const clientName = element.client.trim();
          var tempemp={
            "carerName":empName,
            "clientName":clientName
          };
          EMPArr.push(tempemp);
        });
        var carerdata=CarerDataList;
        var newArray = filterObjectsByCarerName(EMPArr, carerdata);
        const uniqueData = removeDuplicatesByKey(EMPArr, 'carerName');
        newArray.forEach(carerelement => {
          const empName = carerelement.carerName;
          const tr2 = document.createElement('tr');
          tr2.className = "EMP_tr";
          tr2.innerText =empName;
          const td = document.createElement('td');
          $("#emp_tr").prepend(tr2);
        });
        uniqueData.forEach(Empelement => {
          const empName = Empelement.carerName;
          const tr2 = document.createElement('tr');
          tr2.className = "EMP_tr";
          tr2.innerText =empName;
          const td = document.createElement('td');
          $("#emp_tr").prepend(tr2);
        });
        uniqueData.reverse().forEach(Empelement => {
          const empName = Empelement.carerName;
          const clientName = Empelement.clientName;
          const carefaciName = Empelement.care_facilitator;
          PostShiftFun(dataval,empName,clientName,carefaciName,0,0,0);
        });
        newArray.reverse().forEach(carerelement => {
          const empName = carerelement.carerName;
          PostEmptyShiftFunc(empName);
        });
        var tr1 = document.createElement('div');
        tr1.className = "empty";
        tr1.innerHTML = "Thoughtlogik";
        $("#emp_tr").prepend(tr1);
      });
    }
    var tr1 = document.createElement('div');
    tr1.className = "empty";
    tr1.innerHTML = "Thoughtlogik";
    $("#emp_tr").prepend(tr1);
  }